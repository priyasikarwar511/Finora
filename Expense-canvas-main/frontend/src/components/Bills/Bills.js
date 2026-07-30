import React, { useEffect } from "react";
import styled from "styled-components";
import { InnerLayout } from "../../styles/Layout";

import BillsForm from "./BillsForm";

import IncomeItem from "../IncomeItem/IncomeItem";
import BillItem from "./BillItem";
import { useGlobalContext } from "../../context/globalContext";
function Bills(){
    const {bill,addBill,deleteBill,getBill}=useGlobalContext();
    useEffect(()=>{
        getBill();
    },[])
    return(
        <BillStyle>
            <InnerLayout>
                <div className="header">
                    <h1>BILLS</h1>
                </div>

                <div className="inner-content">
                    <div className="bill-form">
                        <BillsForm/>
                    </div>
                    <div className="content">
                        {bill

                            .filter((bills) => {
                            const currentDate = new Date();
                            const billDate = new Date(bills.date);
                            return billDate > currentDate;
                            })

                            .map((bills) => {
                            const { _id, title, amount, date, category } = bills;
                            return (
                                <BillItem
                                id={_id}
                                key={_id}
                                title={title}
                                amount={amount}
                                date={date}
                                category={category}
                                type="bill"
                                deleteItem={deleteBill}
                                />
                            );
                            })}
                        </div>

                </div>
                
            </InnerLayout>
        </BillStyle>
    )
}
const BillStyle=styled.div`
display:flex;
overflow:auto;
flex-direction:row;
width:100%;

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
    box-shadow:0px 1px 15px rgba(0,0,0,0.06);
    border-radius:20px;
    padding:1rem;
    margin:1rem 0;
    width:100%;
    font-size:2rem;
    gap:0.5rem;
    span{
        font-size:2.5rem;
        font-weight:2rem;
        color:var(--color-green);
    }
}
.inner-content{
    display: flex;
    flex-direction :column;
     
    gap: 2rem;
    .content{
        flex: 1;
    }
}
@media (min-width: 1069px) {
    
    .inner-content {
      flex-direction: row;
    }
  }


`


export default Bills;