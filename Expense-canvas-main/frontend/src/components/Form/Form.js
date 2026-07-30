import React, { useState } from "react";
import styled from "styled-components";
import DatePicker from 'react-datepicker'
import "react-datepicker/dist/react-datepicker.css"
import { useGlobalContext } from "../../context/globalContext";
import { plus } from "../../utils/icons";
function Form(){
    // acessing the add income function using useGlobalContext() hook
    const {addIncome,getIncome,error,setError}=useGlobalContext()
    const [inputState,setInputState]=useState({
        title:'',
        amount:'',
        date:'',
        category:'',
        description:'',
    })
    const {title,amount,date,category,description}=inputState;
    //updating the Input Fields
    //Taking the name of fields that has to be updated
    const handleInput=(name)=>e=>{
        setError('')
        setInputState({...inputState,[name]:e.target.value})
        getIncome()
    }

    const handleSubmit=e=>{
        e.preventDefault();
        const user=JSON.parse(localStorage.getItem('userInfo'))
        const userId=user._id;
        addIncome({...inputState,userId})
        setInputState({
            title:'',
            amount:'',
            date:'',
            category:'',
            description:'',
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
                    placeholder="Salary Title"
                    onChange={handleInput('title')}
                />
            </div>
            <div className="input">
                <input 
                    type="text"
                    value={amount}
                    name={'amount'}
                    placeholder="Salary Amount"
                    onChange={handleInput('amount')}
                />
            </div>
            <div className="input">
                 <DatePicker 
                    id='date'
                    placeholderText='Enter a Date'
                    selected={date}
                    dateFormat="dd/MM/yyyy"
                    onChange={(date)=>{
                        const currentDate=new Date();
                        if(date>currentDate){
                            setError('Please select a date in the past or today');
                        }else{
                            console.log('date'+date)
                            setInputState({...inputState,date:date})
                        }
                       
                    }}
                />
               
            </div>
            <div className="selects input-control">
                <select required value={category} name="category" id="category" onChange={handleInput('category')}>
                    <option value=""  disabled >Select Option</option>
                    <option value="salary">Salary</option>
                    <option value="freelancing">Freelancing</option>
                    <option value="investments">Investments</option>
                    <option value="stocks">Stocks</option>
                    <option value="bitcoin">Bitcoin</option>
                    <option value="bank">Bank Transfer</option>  
                    <option value="youtube">Youtube</option>  
                    <option value="other">Other</option>  
                </select>
            </div> 
            <div className="input-control">
                <textarea 
                    name="description" 
                    value={description} 
                    placeholder="Add some reference" 
                    id="description" 
                    cols="30" 
                    rows="4" 
                    onChange={handleInput('description')}
                ></textarea>
            </div>
            <div className="submit-btn">
                <button><span>{plus}</span> Add Income</button>
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
export default Form