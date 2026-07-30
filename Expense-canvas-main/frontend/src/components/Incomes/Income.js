import React, { useEffect } from 'react'
import styled from 'styled-components'
import { InnerLayout } from '../../styles/Layout';
import { useGlobalContext } from '../../context/globalContext';
import Form from '../Form/Form';
import IncomeItem from '../IncomeItem/IncomeItem'
import { dollar } from '../../utils/icons';
function Income(){
    const {addIncome,getIncome,incomes,deleteIncome,flag,totalIncome}=useGlobalContext()
    useEffect(()=>{
        getIncome()
    },[])
    
    return(
        <IncomeStyle>
            <InnerLayout>
                
                <h1 className='header'>Incomes</h1>
                
                
                <h2 className='totalIncome'>Total Income: <span>{dollar}{totalIncome()}</span></h2>
                <div className='income-content'>
                    <div className='income-form'>
                        <Form/>
                    </div>
                    <div className='incomes'>
                        {incomes.map((income)=>{
                            const {_id,title,amount,date,category,description,type}=income;
                            return <IncomeItem
                                key={_id}
                                id={_id}
                                title={title}
                                description={description}
                                amount={amount}
                                date={date}
                                category={category}
                                indicatorColor="var(--color-green)"
                                deleteItem={deleteIncome}
                                type={type}
                            />
                        })}
                    </div>
                </div>
            </InnerLayout>
        </IncomeStyle>
    )
}

const IncomeStyle=styled.div`

    display:flex;
    overflow:auto;
    flex-direction:row;
    width:105%;
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
            color:var(--color-green);
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
    
      @media (min-width: 1300px) {
        .income-content {
          flex-direction: row;
        }
      }

`;
export default Income
