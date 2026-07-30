const mongoose=require('mongoose');
const IncomeSchema=new mongoose.Schema({
    title:{
        type:String,
        required:true,
        trim:true,
        maxLength:50
    },
    amount:{
        type:Number,
        required:true,
        maxLength:20,
        trim:true
    },
    type:{
        type:String,
        default:"income"
    },
    date:{
        type:Date,
        required:true,
        trim:true
    },
    category:{
        type:String,
        required:true,
        trim:true
    },
    amount:{
        type:Number,
        required:true,
        maxLength:20,
        trim:true
    },
    category:{
        type:String,
        required:true,
        maxLength:20,
        trim:true
    },
    description:{
        type:String,
        required:true,
        trim:true
    }
},{timestamps:true})
const Income = mongoose.model("Income",IncomeSchema)

module.exports = Income;
// const mongoose = require('mongoose');

// const IncomeSchema = new mongoose.Schema({
//     title: {
//         type: String,
//         required: true,
//         trim: true,
//         maxlength: 50,
//     },
//     amount: {
//         type: Number,
//         required: true,
//         maxlength: 20,
//         trim: true,
//     },
//     type: {
//         type: String,
//         default: 'income',
//     },
//     date: {
//         type: Date,
//         required: true,
//         trim: true,
//     },
//     category: {
//         type: String,
//         required: true,
//         maxlength: 20,
//         trim: true,
//     },
//     description: {
//         type: String,
//         required: true,
//         trim: true,
//     },
//     user_id: {
//         type: mongoose.Schema.Types.ObjectId,
//         ref: 'User', // Reference to the User model
//         required: true,
//     },
// }, { timestamps: true });

// module.exports = mongoose.model('Income', IncomeSchema);
