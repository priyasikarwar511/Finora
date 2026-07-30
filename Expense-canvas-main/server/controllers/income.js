const Income=require('../models/incomeModel')
const User = require("../models/userModels")

exports.addIncome=async (req,res)=>{
    //destructuring the data which coming through the body of request
    const {title,amount,category,description,date,userId}=req.body;

    console.log(userId)
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
        const income=await Income.create({
            title,
            amount,
            category,
            description,
            date,
        })
        await income.save()
        await user.incomeHistory.push(income._id)
        await user.save()
        console.log("User updated",user) 
        res.status(200).json({message:'Income successfully Added'})
    }catch(error){
        console.log(error.message)
        res.status(500).json({message:'server side error'})
    }
}

exports.getIncomes=async(req,res)=>{
    const {userId} = req.query;
    try{
        const user = await User.findOne({_id:userId}).populate("incomeHistory")
        console.log(user)
        const incomes = user.incomeHistory;
        console.log("Income Histpry", incomes)
        res.status(200).json(incomes)
    }catch(error){
        console.log(error.message)
        res.status(500).json({message:'server side error'})
    }
}

exports.deleteIncome=async(req,res)=>{
    //get corresponding id to delete
    const {id}=req.params;
    await Income.findByIdAndDelete(id)

        .then((income)=>{
            res.status(200).json({message:'Income Deleted'})
        })
        .catch((err)=>{
            res.status(500).json({message:'server side error'})
        })
}
// const IncomeSchema = require('../models/incomeModel');

// exports.addIncome = async (req, res) => {
//     try {
//         const { title, amount, category, description, date } = req.body;
//         const userId = req.user._id;

//         const income = new IncomeSchema({
//             title,
//             amount,
//             category,
//             description,
//             date,
//             user_id: userId,
//         });

//         // conditions
//         if (!title || !category || !description || !date) {
//             return res.status(400).json({ message: 'All fields are required' });
//         }

//         if (amount <= 0 || isNaN(amount)) {
//             return res.status(400).json({ message: 'Amount must be a number and positive' });
//         }

//         await income.save();
//         res.status(200).json({ message: 'Income successfully added' });
//     } catch (error) {
//         console.error(error);
//         res.status(500).json({ message: 'Server side error' });
//     }
// };
// exports.getIncomes = async (req, res) => {
//     try {
//       const incomes = await IncomeSchema.find().sort({ createdAt: -1 });
  
//       if (!incomes) {
//         return res.status(404).json({ message: 'No incomes found' });
//       }
  
//       res.status(200).json(incomes);
//     } catch (error) {
//       console.error(error);
//       res.status(500).json({ message: 'Server-side error' });
//     }
//   };

// exports.deleteIncome = async (req, res) => {
//     try {
//         const userId = req.user._id;
//         const { id } = req.params;

//         // Ensure that the income to be deleted belongs to the authenticated user
//         const income = await IncomeSchema.findOne({ _id: id, user_id: userId });

//         if (!income) {
//             return res.status(404).json({ message: 'Income not found' });
//         }

//         await IncomeSchema.findByIdAndDelete(id);
//         res.status(200).json({ message: 'Income deleted' });
//     } catch (error) {
//         console.error(error);
//         res.status(500).json({ message: 'Server side error' });
//     }
// };
