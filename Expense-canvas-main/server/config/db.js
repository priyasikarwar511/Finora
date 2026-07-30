const mongoose = require("mongoose");

const connectDB = async () => {
    try {
        const conn = await mongoose.connect(process.env.MONGO_URL, {
            // useNewUrlParser: true,
            // useUnifiedTopology: true,
        });
        console.log(`MongoDB Connected: ${conn.connection.host}` .cyan.underline);
    } catch (error) {
        console.error(`Error: ${error.message}` .red.bold);
        process.exit(1); // Use process.exit(1) to indicate an error
    }
};

module.exports = connectDB;
