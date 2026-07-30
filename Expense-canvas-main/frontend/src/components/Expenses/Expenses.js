import React, { useEffect } from 'react'
import styled from 'styled-components'
import { InnerLayout } from '../../styles/Layout';
import { useGlobalContext } from '../../context/globalContext';
import Form from '../Form/Form';
import IncomeItem from '../IncomeItem/IncomeItem'
import { dollar } from '../../utils/icons';
import ExpenseForm from './ExpenseForm';
function Expenses(){
    const {addExpense,getExpense,expenses,deleteExpense,flag,totalExpense}=useGlobalContext()
    useEffect(()=>{
        getExpense()
    },[])
    // console.log('expense'+expenses);
    return(
        <ExpenseStyle>
            <InnerLayout>
                <h1 className='header'>Expenses</h1>
                <h2 className='totalIncome'>Total Expense: <span>{dollar}{totalExpense()}</span></h2>
                <div className='income-content'>
                    <div className='income-form'>
                        <ExpenseForm/>
                    </div>
                    <div className='incomes'>
                        {expenses.map((expense)=>{
                            const {_id,title,amount,date,category,description,type,file}=expense;
                            return <IncomeItem
                                key={_id}
                                id={_id}
                                title={title}
                                description={description}
                                amount={amount}
                                date={date}
                                category={category}
                                indicatorColor="var(--color-red)"
                                deleteItem={deleteExpense}
                                type={type}
                                file={file}
                            />
                        })}
                    </div>
                </div>
            </InnerLayout>
        </ExpenseStyle>
    )
}

const ExpenseStyle=styled.div`
    display:flex;
    overflow:auto;
    flex-direction:row;
    width:90%;
    .header{
        font-weight:bold;
        font-size:36px;
    }
    .totalIncome{
        //this is the top bar 
        display:flex;
        justify-content:center;
        align-items:center;
        background:#FCF6F9;
        border: 2px solid #FFFFFF;
        // border:solid;
        box-shadow:0px 1px 15px rgba(0,0,0,0.06);
        border-radius:20px;
        padding:1rem;
        margin:1rem 0;
        width:90%;
        font-size:2rem;
        gap:0.5rem;
        span{
            font-size:2.5rem;
            font-weight:2rem;
            color:var(--color-red);
        }
    }
    .income-content {
        display: flex;
        flex-direction: column;
        
        gap: 2rem;
        .income-form {
            margin-right: 70px; /* Adjust the margin to increase the distance */
          }
      }
    
      @media (min-width: 1249px) {
        .income-content {
          flex-direction: row;
        }
      }
    
   

`;
export default Expenses




