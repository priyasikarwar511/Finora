import React from 'react'
import styled from 'styled-components'
import { InnerLayout } from '../../styles/Layout';
import Chart from '../Chart/Chart';
import { useGlobalContext } from '../../context/globalContext';
import { dollar } from '../../utils/icons';
import { useEffect } from 'react';
import History from '../../History/History';

function Dashboard(){
    const {totalExpense,totalIncome,user,totalBalance,getIncome,getExpense,incomes,expenses,setUser}=useGlobalContext();
    useEffect(()=>{
        // console.log("User dash dash",user)
        const user = JSON.parse(localStorage.getItem('userInfo'))
        setUser(user);
            getIncome()
            getExpense()
    },[])
    return(
        <DashboardStyle>
           <InnerLayout>
                <h1 className='header'>All transactions</h1>
                <div className='stats'>
                    <div className='chart-Container'>
                        <Chart/>
                        <div className='amountContainer'>
                            <div className='income'>
                                <h2>Total Income</h2>
                                <p>
                                     {dollar} {totalIncome()}
                                </p>
                            </div>
                            <div className='expense'>
                                <h2>Total Expense</h2>
                                <p>
                                     {dollar} {totalExpense()}
                                </p>
                            </div>
                            <div className='balance'>
                                <h2>Total Balance</h2>
                                <p style={{ color: totalBalance() < 0 ? 'red' : 'green', opacity: 0.6, fontSize: '4.5rem' }}>
                                    {dollar} {totalBalance()}
                                </p>
                            </div>
                        </div>


                    </div>
                    <div className='historyContainer'>
                        <History/>
                        <h2 className='SalaryTitle'>Min <span>Salary</span> Max</h2>
                        <div className='salaryItem'>
                            <p>
                                {Math.min(...incomes.map(item=>item.amount))}
                            </p>
                            <p>
                                {Math.max(...incomes.map(item=>item.amount))}
                            </p>
                        </div>
                        <h2 className='SalaryTitle'>Min <span>Expense</span> Max</h2>
                        <div className='salaryItem'>
                            <p>
                                {Math.min(...expenses.map(item=>item.amount))}
                            </p>
                            <p>
                                {Math.max(...expenses.map(item=>item.amount))}
                            </p>
                        </div>
                    </div>
                </div>
           </InnerLayout>
        </DashboardStyle>
    )
}

const DashboardStyle=styled.div`

.header{
    font-weight:bold;
    font-size:36px;
}
.stats{
    display: grid;
    grid-template-columns: repeat(5, 1fr);
    gap: 2rem;
    .chart-Container{
        grid-column: 1 / 4;
        height: 400px;
        .amountContainer{
            display: grid;
            grid-template-columns: repeat(4, 1fr);
            gap: 2rem;
            margin-top: 2rem;
            .income, .expense{
                grid-column: span 2;
            }
            .income, .balance{
                background: #FCF6F9;
                border: 2px solid #FFFFFF;
                box-shadow: 0px 1px 15px rgba(0, 0, 0, 0.06);
                border-radius: 20px;
                padding: 1rem;
                p{
                    color:green;
                    font-size: 3.0rem;
                    font-weight: 700;
                }
            }
            .expense{
                background: #FCF6F9;
                border: 2px solid #FFFFFF;
                box-shadow: 0px 1px 15px rgba(0, 0, 0, 0.06);
                border-radius: 20px;
                padding: 1rem;
                p{
                    color:red;
                    font-size: 3.0rem;
                    font-weight: 700;
                }
            }
            .balance{
                grid-column: 2 / 4;
                display: flex;
                flex-direction: column;
                justify-content: center;
                color:red;
                align-items: center;
                // p{
                //     color: var(--color-green);
                //     opacity: 0.6;
                //     font-size: 2.5rem;
                // }
            }
        }
    }

    .historyContainer{
        margin-left:60px;
        grid-column: 4 / -1;
        // width:800px;
        h2{
            margin: 1rem 0;
            display: flex;
            align-items: center;
            justify-content: space-between;
        }
        .salaryTitle{
            font-size: 1.2rem;
            span{
                font-size: 1.8rem;
            }
        }
        .salaryItem{
            background: #FCF6F9;
            border: 2px solid #FFFFFF;
            box-shadow: 0px 1px 15px rgba(0, 0, 0, 0.06);
            padding: 1rem;
            border-radius: 20px;
            display: flex;
            justify-content: space-between;
            align-items: center;
            p{
                font-weight: 600;
                font-size: 1.6rem;
            }
        }
    }
}

@media (max-width: 900px) {
    .stats {
      flex-direction: column;
    }
  }
`;
export default Dashboard