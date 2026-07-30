const express = require('express');
const dotenv = require('dotenv');
const connectDB = require('./config/db');
const colors = require('colors');
const userRoutes = require('./routes/userRoutes');
const messageRoutes = require('./routes/messageRoutes')
const { notFound, errorHandler } = require('./middleware/errorMiddleware');
const cors = require('cors'); // Import the 'cors' middleware
const fs=require('fs')
const chatRoutes = require("./routes/chatRoutes");
const requestAuth=require("./routes/requestAuth")
const authRout=require('./routes/oauth')
dotenv.config();
connectDB();
const app = express();
app.use(express.json()); // to accept JSON data

// Define a list of allowed origins for CORS. You can configure this to match your requirements.
const allowedOrigins = [
  'http://localhost:3000', // Replace with the origin of your frontend application
];

const corsOptions = {
  origin: function (origin, callback) {
    if (allowedOrigins.indexOf(origin) !== -1 || !origin) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
};
// const corsOptions = {
//   origin: true,
// };
// app.use(cors(corsOptions));
//

app.use(cors(corsOptions)); // Use the 'cors' middleware with the configured options

const PORT = process.env.PORT;

// Use the userRoutes middleware
app.use('/api/user', userRoutes);
app.use('/api/chat', chatRoutes);
app.use('/api/message', messageRoutes);
app.use('/requestAuth',requestAuth)
app.use('/oauth',authRout);

app.use(notFound);
app.use(errorHandler);



const server = app.listen(
  PORT,
  console.log(`Server running on PORT ${PORT}...`.yellow.bold)
);

const io = require("socket.io")(server,{
  pingTimeout:60000,
  cors:{
    origin: "http://localhost:3000",
  },
});

io.on("connection", (socket) => {
  console.log("connected to socket.io");

  socket.on('setup', (userData) =>{
    socket.join(userData._id);
    console.log(userData._id);
    socket.emit("connected");
  } ) ;

    socket.on("join chat" , (room) => {
      socket.join (room);
      console.log("User Joined Room: " + room);
    });

    socket.on('typing', (room) => socket.in(room).emit("typing"));
    socket.on('stop typing', (room) => socket.in(room).emit("stop typing"));

    socket.on("new message", (newMessageRecived) => {
      var chat = newMessageRecived.chat;

      if (!chat.users) return console.log("chat.users not defined");

      chat.users.forEach(user => {
        if(user._id == newMessageRecived.sender._id) return;

        socket.in(user._id).emit("message recieved" , newMessageRecived);
        
      });
    });
  
});
