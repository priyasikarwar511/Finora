const mongoose=require('mongoose');
const billSchema=new mongoose.Schema({
    title:{
        type:String,
        required:true,
        trim:true,
        maxLenght:50
    },
    amount:{
        type:Number,
        required:true,
        maxLength:20,
        trim:true
    },
    type:{
        type:String,
        default:"bill"
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
    }
},{timestamps:true})
const Bills = mongoose.model("Bills",billSchema)

module.exports = Bills;