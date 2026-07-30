import React, { useState } from "react";
import styled from "styled-components";
import DatePicker from 'react-datepicker'
import "react-datepicker/dist/react-datepicker.css"
import { useGlobalContext } from "../../context/globalContext";
import { plus } from "../../utils/icons";
function BillsForm(){
    // acessing the add income function using useGlobalContext() hook
    const {addBill,getBill,error,setError}=useGlobalContext()
    const currentDate=new Date();
    const [inputState,setInputState]=useState({
        title:'',
        amount:'',
        date:'',
        category:'',
    })
    const {title,amount,date,category}=inputState;
    //updating the Input Fields
    //Taking the name of fields that has to be updated
    const handleInput=(name)=>e=>{
        setError('')
        setInputState({...inputState,[name]:e.target.value})
        getBill()
    }

    const handleSubmit=e=>{
        e.preventDefault();
        const user=JSON.parse(localStorage.getItem('userInfo'))
        const userId=user._id;
        addBill({...inputState,userId})
        setInputState({
            title:'',
            amount:'',
            date:'',
            category:''
        })    
    }

    return(
        <FormStyle onSubmit={handleSubmit} >
            {error && <p className="error">
                    {error}
                </p>}
            <div className="input">
                <input 
                    type="text"
                    value={title}
                    name={'title'}
                    placeholder="Bill Title"
                    onChange={handleInput('title')}
                />
            </div>
            <div className="input">
                <input 
                    type="text"
                    value={amount}
                    name={'amount'}
                    placeholder="Bill Amount"
                    onChange={handleInput('amount')}
                />
            </div>
            <div className="input">
                 <DatePicker 
                    id='date'
                    placeholderText='Enter a Due Date'
                    selected={date}
                    dateFormat="dd/MM/yyyy"
                    onChange={(date)=>{
                        // console.log('date'+date)
                        if(date>currentDate){
                            setInputState({...inputState,date:date})
                        }
                        
                    }}
                />
               
            </div>
            <div className="selects input-control">
                <select required value={category} name="category" id="category" onChange={handleInput('category')}>
                    <option value=""  disabled >Select Option</option>
                    <option value="electricity_bill">Electricity Bill</option>
                    <option value="car_bill">Car Bill</option>
                    <option value="Internet_bill">Internet Bill</option>
                    <option value="Phone_bill">Phone Bill</option>
                    <option value="Loan_bill">Loan Bill</option>
                    <option value="Education_bill">Education Bill</option>  
                    <option value="Medical_bill">Medical Bill</option>  
                    <option value="other">Other</option>  
                </select>
            </div> 
            
            <div className="submit-btn">
                <button><span>{plus}</span> Add Bill</button>
            </div>
        </FormStyle>
    )
}

const FormStyle=styled.form`
    display:flex;
    flex-direction:column;
    gap:2rem;
    input,textarea,select{
        font-family:inherit;
        font-size:inherit;
        ouline:none;
        border:none;
        padding:0.5rem 1rem;
        border-radius:5px;
        border:2px solid #3333;
        background:transparent;
        resize:none;
    }
    .input{
        input{
            width:100%;

        }
    }
    


    .submit-btn{
        button{
            box-shadow: 0px 1px 15px rgba(0, 0, 0, 0.06);
            border:solid 3px;
            border-radius:10px;
            padding:5px;
            &:hover{
                background:#C2E0FF;
            }
        }
    }
   
    

`
export default BillsForm