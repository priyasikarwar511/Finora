import React from "react";
import styled from "styled-components";
import { useGlobalContext } from "../context/globalContext";
import { dollar } from "../utils/icons";
const History=()=>{
    const {transactionHistory }=useGlobalContext()

    const [...history]=transactionHistory();
    return (
        <HistoryStyle>
            <h2 className="header">Recent History</h2>
            {history.map((item)=>{
                const {_id,title,amount,type}=item
                return(
                    <div key={_id} className="history-item">
                        <p style={{color:type==='expense' ?'red':'var(--color-green'}}>
                            {title}
                        </p>
                        <p style={{color:type==='expense' ?'red':'var(--color-green'}}>
                            {type==='expense'? `-${amount}`: `+${amount}`}
                        </p>

                    </div>
                )
            })}
        </HistoryStyle>
    )
}

const HistoryStyle=styled.div`
.header{
    font-size:24px;
}
    display:flex;
    flex-direction:column;
    gap:1rem;
    width:100%;
    .history-item{
        background:#FCF6F9;
        width:100%;
        border:2px solid #FFFFFF;
        box-shadow:0px 1px 15px rgba(0,0,0,0.06);
        padding:1rem;
        border-radius:20px;
        display:flex;
        justify-content:space-between;
        align-items:center;
    }

`

export default History;