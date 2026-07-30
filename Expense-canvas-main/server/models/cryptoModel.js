const mongoose=require('mongoose');
const coinSchema=new mongoose.Schema({
    name:{
        type: String,
        required:true,
        unique: true,
    },
    // price:{
    //     type:Number,
    //     required:true,
    // },
    // rank:{
    //     type:Number,
    //     required:true,
    // },
    // link:{
    //     type:String,
    //     required:true,
    // }
})
module.exports=mongoose.model('Crypto',coinSchema)