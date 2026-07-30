import {useState,React,useEffect}  from "react";
import styled from "styled-components";
import { useGlobalContext } from "../../context/globalContext";
import { dateFormat } from "../../utils/dateFormat";
import { Education_Bill, Internet_bill, Loan_Bill, Medical_Bill, Phone_Bill, calender, car_bill, circle, dollar, electricity_bill, medical, trash } from "../../utils/icons";
import { toast } from 'react-toastify';

function BillItem({id,key,title,amount,date,category,type,deleteItem}){
    
    const [buttonText,setButtonText]=useState("Pending")
    const [color,setColor]=useState("red");
    
    
    
    const timeRemaining = () => {
        const currentTime = new Date();
        const actualTime=dateFormat(currentTime);
        const dueTime = date
        console.log('date:'+date);
        const date1=new Date(currentTime);
        const date2=new Date(dueTime)
        console.log(date1)
        console.log(date2)
        const timeDifference = date2 - date1;
      
        // Convert the time difference to days, hours and minutes
        const days = Math.floor(timeDifference / (1000 * 60 * 60 * 24));
        const hours = Math.floor((timeDifference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((timeDifference % (1000 * 60 * 60)) / (1000 * 60));
        
       
      
        // Format the result
        return `${days}d ${hours}h ${minutes}m `;
      };
      useEffect(()=>{
        const currTime = new Date();
        const dueTime = date
        const date1=new Date(currTime);
        const date2=new Date(dueTime)
        const timeDifference = date2 - date1;
      
        // Convert the time difference to days, hours, minutes, and seconds
        const days = Math.floor(timeDifference / (1000 * 60 * 60 * 24));
        const hours = Math.floor((timeDifference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((timeDifference % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((timeDifference % (1000 * 60)) / 1000);

      
        //Giving the warning message to remind the due date
        if(days<3 && days>=0){
            toast.warning("Your bill is due in less than 3 days");
           }
           else if(days<0){
            toast.warning("Your bill is OverDue");
           }
      },[date,title])
    
    const billIcon=()=>{
        switch(category){
            case 'electricity_bill':
                return electricity_bill
            case 'car_bill':
                return car_bill
            case 'Internet_bill':
                return Internet_bill
            case 'Phone_bill':
                return Phone_Bill
            case 'Loan_bill':
                return Loan_Bill
            case 'Education_bill':
                return Education_Bill
            case 'Medical_bill':
                return Medical_Bill   
            default:
                return circle    
        }
    }

    
    return(
       
        <ContentStyle color={color}>
             <div className="icon">
                {type==='bill' ?billIcon() :''}
            </div>
            <div className="content">
                
                <h1>{title}</h1>
                <div className="inner-content">
                    <div className="text">
                        <p>{dollar}{amount}</p>
                        <p>{calender}{dateFormat(date)}</p>
                        <p className="t">
                            {buttonText === 'Pending' ? `Time Remaining: ${timeRemaining()}` : 'Paid✅'}
                        </p>

                        <div className="extra">
                        <button onClick={() => {
                            setButtonText("Done");
                            setColor("green");
                            toast.success('Bill marked as paid.');
                            }}>
                            {buttonText}
                            </button>
                        </div>
                        
                    </div>
                    <div className='btn-con'>
                       
                           <button onClick={() => {
                            if (buttonText === 'Done') {
                              deleteItem(id);
                            } if (buttonText === 'Pending') {
                                console.log("enterrrrrrr");
                              toast.warning('Your bill is still pending.');
                            }
                          }}>{trash}
                        </button>
                    </div>
                </div>
                
                
            </div>
            
        </ContentStyle>
    )
}
const ContentStyle=styled.div`
background: #FCF6F9;
border: 2px solid #FFFFFF;
box-shadow: 0px 1px 15px rgba(0, 0, 0, 0.06);
border-radius: 20px;
padding: 1rem;
margin-bottom: 1rem;
display: flex;
align-items: center;
gap: 1rem;
width: 100%;
color: #222260;
.icon{
    width: 60px;
    height: 60px;
    border-radius: 20px;
    background: #F5F5F5;
    display: flex;
    align-items: center;
    justify-content: center;
    border: 2px solid #FFFFFF;
    i{
        font-size: 2.6rem;
    }
}

.content{
    flex: 1;
    display: flex;
    flex-direction: column;
    justify-content:space-between;
    gap: .2rem;
    h5{
        font-size: 1.3rem;
        padding-left: 2rem;
        position: relative;
        &::before{
            content: '';
            position: absolute;
            left: 0;
            top: 50%;
            transform: translateY(-50%);
            width: .8rem;
            height: .8rem;
            border-radius: 50%;
            background: ${props => props.indicator};
        }
    }

    .inner-content{
        display: flex;
        justify-content: space-between;
        align-items: center;
        .text{
            display: flex;
            
            align-items: center;
            gap: 1.5rem;
            p{
                display: flex;
                align-items: center;
                gap: 0.5rem;
                color: var(--primary-color);
                opacity: 0.8;
            }
            .extra{
                background-color:#FFE3BB;
                border-radius:10%;
                padding:4px;
                color:${(props) => props.color};
                font-weight:bold;
                transition: background-color 0.3s;
                &:hover {
                    background-color: #FFC984; /* Change background color on hover */
                    cursor: pointer; 
                }
            }
            .t{
                color:Green;
                font-weight:bold;
            }
        }
    }
    
}

`
export default BillItem
