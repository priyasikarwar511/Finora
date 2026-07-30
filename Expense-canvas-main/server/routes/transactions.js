const router=require('express').Router()
const {addIncome,getIncomes, deleteIncome} =require('../controllers/income')
const {addExpense,getExpenses ,deleteExpense} =require('../controllers/expense')
const { addBill, getBill, deleteBill } = require('../controllers/Bills')
router
.post('/addIncome',addIncome)
.get('/getIncomes',getIncomes)

.delete('/deleteincome/:id',deleteIncome)
.post('/addExpenses',addExpense)
.get('/getExpenses',getExpenses)
.delete('/deleteExpense/:id',deleteExpense)
.post('/addBill',addBill)
.get('/getBills',getBill)
.delete('/deleteBill/:id',deleteBill)
module.exports=router