[[[]]]

const Expense=require('../models/expenseModel')
const User = require("../models/userModels")
const multer=require("multer")
exports.addExpense=async (req,res)=>{
    //destructuring the data which coming through the body of request
    const {title,amount,category,description,date,file,userId}=req.body;
    //  console.log(file)
   
    // conditions
    try{
        if(!title || !category || !description || !date){
            return res.status(400).json({message:'All fields are required'})
        }
        if(amount<=0 || !amount==='number'){
            return res.status(400).json({message:'Amount must be number and positive'})
        }
        const user=  await User.findOne({_id:userId})
        if(!user){
            return res.status(400).send({message:'User not found'})
        }
    //    if(file){

    //     const newfile=new ExpenseSchema({
    //         file:{
    //             data:req.file.filename,
    //             contentType:'image/png'
    //         }
    //     })
    //     await newfile.save()
    //     .then(()=>res.send("successfully uploaded"))
    //     .catch((err)=>console.log(err))
    //    }
    //     await expense.save()


        const expense=await Expense.create({
            title,
            amount,
            category,
            description,
            date,
        })
        await expense.save()
        
         user.expenseHistory = [...user.expenseHistory , expense._id]
        await user.save()
        
        res.status(200).json({message:'Expense successfully Added'})

    }catch(error){
        res.status(500).json({message:'server side error'})
    }
    
}
exports.getExpenses=async(req,res)=>{
    const {userId} = req.query;
    console.log(userId)
    try{
        const user = await User.findOne({_id:userId}).populate("expenseHistory")
        
        const expenses = user.expenseHistory;
        console.log('expensehistory is ' , expenses)
        res.status(200).json(expenses)
    }catch(error){
        console.log(error.message)
        res.status(500).json({message:'server side error'})
    }
    
}
exports.deleteExpense=async(req,res)=>{
    //get corresponding id to delete
    const {id}=req.params;
    Expense.findByIdAndDelete(id)    
        .then((expense)=>{
            res.status(200).json({message:'Expense Deleted'})
        })
        .catch((err)=>{
            res.status(500).json({message:'server side error'})
        })
}
//storage...disk storage is to store the files according to us on the disk
const storage=multer.diskStorage({
    destination:'uploads',
    //cb: callback
    filename:(req,file,cb)=>{
        cb(null,Date.now+file.originalname)
    }

});
exports.upload= multer(
    {
        storage:storage
    }
).single('testfile')

