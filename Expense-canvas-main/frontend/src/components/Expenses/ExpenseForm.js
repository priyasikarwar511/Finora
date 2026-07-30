import React, { useState } from "react";
import styled from "styled-components";
import DatePicker from 'react-datepicker'
import "react-datepicker/dist/react-datepicker.css"
import { useGlobalContext } from "../../context/globalContext";
import { plus } from "../../utils/icons";

function ExpenseForm() {
    //function to handle the file change
    // const [file, setFile] = useState(null);

    // acessing the add income function using useGlobalContext() hook
    const { addExpense, getExpense, error, setError } = useGlobalContext()
    const [inputState, setInputState] = useState({
        title: '',
        amount: '',
        date: '',
        category: '',
        description: '',
        file: ''
    })

    const { title, amount, date, category, description, file } = inputState;
    //updating the Input Fields
    //Taking the name of fields that has to be updated
    const handleInput = (name) => e => {
       
            setError('')
            setInputState({ ...inputState, [name]: e.target.value })
            
        
    }


    // const handleFileChange = (e) => {
    //     const selectedFile = e.target.files[0];
    //     setFile(selectedFile);
    // };
    const handleSubmit = async e => {
        e.preventDefault();


        // console.log(inputState);
        const user=JSON.parse(localStorage.getItem('userInfo'))
        const userId=user._id;
        await addExpense({...inputState,userId})
        
        getExpense()
        setInputState({
            title: '',
            amount: '',
            date: '',
            category: '',
            description: '',
            //  file:'',

        })

    }

    return (
        <ExpenseFormStyle onSubmit={handleSubmit} encType="multipart/form-data" >
            {error && <p className="error">
                {error}
            </p>}
            <div className="input">

                <input

                    type="text"
                    value={title}
                    name={'title'}
                    placeholder="Expense Title"
                    onChange={handleInput('title')}
                  />
            </div>
            <div className="input">

                <input
                    type="text"
                    value={amount}
                    name={'amount'}
                    placeholder="Expense Amount"
                    onChange={handleInput('amount')}
                />
            </div>
           <div className="input">
            <DatePicker
                id='date'
                placeholderText='Enter a Date'
                selected={date}
                dateFormat="dd/MM/yyyy"
                onChange={(selectedDate) => {
                    const currentDate = new Date();
                    if (selectedDate > currentDate) {
                    setError('Please select a date in the past or today.');
                    } else {
                    setInputState({ ...inputState, date: selectedDate });
                    setError('');
                    }
                }}/>
            </div>
            <div className="selects input-control">
                <select required value={category} name="category" id="category" onChange={handleInput('category')}>
                    <option value="" disabled >Select Option</option>
                    <option value="education">Education</option>
                    <option value="groceries">Groceries</option>
                    <option value="health">Health</option>
                    <option value="subscriptions">Subscriptions</option>
                    <option value="takeaways">Takeaways</option>
                    <option value="clothing">Clothing</option>
                    <option value="travelling">Travelling</option>
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
            <div class="input-control">
                <input type="file"
                    name={'file'}
                    id="file"
                    onChange={handleInput('file')}

                ></input>
                {/* <button className="upload-btn"><span>{plus}</span>Upload</button> */}
            </div>
            <div className="submit-btn">
                <button><span>{plus}</span> Add Expense</button>
            </div>
        </ExpenseFormStyle>
    )
}

const ExpenseFormStyle = styled.form`
display: flex;
flex-direction: column;
gap: 2rem;
input, textarea, select{
    font-family: inherit;
    font-size: inherit;
    outline: none;
    border: none;
    padding: .5rem 1rem;
    border-radius: 5px;
    border: 2px solid #fff;
    background: transparent;
    resize: none;
    box-shadow: 0px 1px 15px rgba(0, 0, 0, 0.06);
    color: rgba(34, 34, 96, 0.9);
    &::placeholder{
        color: rgba(34, 34, 96, 0.4);
    }
}
.input-control{
    input{
        width: 100%;
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
export default ExpenseForm

