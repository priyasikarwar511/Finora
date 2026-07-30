const Bills=require('../models/billModel')
const User = require("../models/userModels")

exports.addBill=async(req,res)=>{
    const {title,amount,date,category,userId}=req.body;
    console.log('bill'+userId);
    try{
        if(!title || !category || !amount || !date){
            return res.status(400).json({message:'All fields are required'})
        }
        if(amount<=0 || !amount==='number'){
            return res.status(400).json({message:'Amount must be number and positive'})
        }

        const user=  await User.findOne({_id:userId})
        if(!user){
            return res.status(400).send({message:'User not found'})
        }
        const bill=await Bills.create({
            title,
            amount,
            date,
            category,
        })
        await bill.save()
        await user.billHistory.push(bill._id)
        await user.save()
        console.log("User updated",user) 
        res.status(200).json({message:'Bill successfully Added'})
    }catch(error){
        console.log(error.message)
        res.status(500).json({message:'server side error'})
    }
}

       

exports.getBill=async(req,res)=>{
    const {userId} = req.query;
    try{
        const user = await User.findOne({_id:userId}).populate("billHistory")
        console.log(user)
        const bills = user.billHistory;
        console.log("Bill History", bills)
        res.status(200).json(bills)
    }catch(error){
        console.log(error.message)
        res.status(500).json({message:'server side error'})
    }
    
}

exports.deleteBill=async(req,res)=>{
    const {id}=req.params;
    Bills.findByIdAndDelete(id)
        .then(()=>{
            res.status(200).json({message:'Successfully Deleted the bill'})
        })
        .catch((err)=>{
            res.status(500).json({messsage:'Server Side error'})
        })
}