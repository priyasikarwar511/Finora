// import react from 'react'
// import styled from 'styled-components'
// import moment from 'moment'
// import {Chart as ChartJs,
//     CategoryScale,
//     LinearScale,
//     PointElement,
//     LineElement,
//     Title,
//     Tooltip,
//     Legend,
//     ArcElement

// } from 'chart.js'

// import {Line} from 'react-chartjs-2'
// import { useGlobalContext } from '../../context/globalContext'
// import { dateFormat } from '../../utils/dateFormat'

// ChartJs.register(
//     CategoryScale,
//     LinearScale,
//     PointElement,
//     LineElement,
//     Title,
//     Tooltip,
//     Legend,
//     ArcElement
// )

// function Chart(){
//     //destructuring
//     const {incomes,expenses}=useGlobalContext();
//     const sortedPura = [...incomes,...expenses];
// sortedPura
// .sort((a, b) => moment(a.date, 'DD-MM-YYYY').isBefore(moment(b.date, 'DD-MM-YYYY')) ? -1 : 1);

//     const data={
//         // using X axis of the graph
//         labels:([...sortedPura]).map((income)=>{
//             const {date}=income;
//             return dateFormat(date);
//         }),
//         datasets:[
//             {
//                 label:'Income',
//                 //holding the numerical value that has been to be plotted on chart
//                 data:[
//                     ...incomes.map((income)=>{
//                         //extarcting amount from the income
//                         const {amount}=income
//                         return amount
//                     })
//                 ],
//                 backgroundColor:'green',
//                 tension:0.2
//             },
//             {
//                 label:'Expenses',
//                 //holding the numerical value that has been to be plotted on chart
//                 data:[
//                     ...expenses.map((expense)=>{
//                         //extarcting amount from the expense
//                         const {amount}=expense
//                         return amount
//                     })
//                 ],
//                 backgroundColor:'red',
//                 tension:0.2
//             },
//         ]
//     }
//     return (
//         <ChartStyle>
//             <Line data={data}/>
//         </ChartStyle>
//     )
// }

// const ChartStyle=styled.div`
//     background:#FCF6F9;
//     border:2px  solid #FFFFFF;
//     box-shadow:0px 1px 15px rgba(0,0,0,0.06);
//     padding:1rem;
//     border-radius:20px;
//     height:100%;
    
// `
// export default Chart









// ---->>Thoda sahi
// import React from 'react';
// import styled from 'styled-components';
// import moment from 'moment';
// import { Chart as ChartJs, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend, ArcElement } from 'chart.js';
// import { Line } from 'react-chartjs-2';
// import { useGlobalContext } from '../../context/globalContext';
// import { dateFormat } from '../../utils/dateFormat';

// ChartJs.register(
//     CategoryScale,
//     LinearScale,
//     PointElement,
//     LineElement,
//     Title,
//     Tooltip,
//     Legend,
//     ArcElement
// );

// function Chart() {
//     // Destructuring
//     const { incomes, expenses } = useGlobalContext();
//     const sortedData = [...incomes, ...expenses];
//     sortedData.sort((a, b) => moment(a.date, 'DD-MM-YYYY').isBefore(moment(b.date, 'DD-MM-YYYY')) ? -1 : 1);

//     // Create an array to store both income and expense amounts simultaneously
    
//     const amounts = sortedData.map((item) => {
//         let answer=0;
//         if (incomes.find((income) => income === item)) {
//             // If the item is in the incomes array, it's income.
//             answer+= item.amount;
//         } 
//         if(expenses.find((expense)=>expense===item)){
//             answer-=item.amount;
//         }
        
//         return answer;
        
//         // else {
//         //     // Otherwise, it's an expense.
//         //     return -item.amount; // Use a negative sign to distinguish expenses.
//         // }
//     });

//     const data = {
//         // Using X axis of the graph
//         labels: sortedData.map((item) => {
//             const { date } = item;
//             return dateFormat(date);
//         }),
//         datasets: [
//             {
//                 label: 'Combined',
//                 // Amounts array stores both income and expense amounts
//                 data: amounts,
//                 backgroundColor: amounts.map(amount => (amount > 0 ? 'green' : 'red')), // You can use a single color
//                 tension: 0.2,
//             },
//         ],
//     };

//     return (
//         <ChartStyle>
//             <Line data={data} />
//         </ChartStyle>
//     );
// }

// const ChartStyle = styled.div`
//     background: #FCF6F9;
//     border: 2px solid #FFFFFF;
//     box-shadow: 0px 1px 15px rgba(0, 0, 0, 0.06);
//     padding: 1rem;
//     border-radius: 20px;
//     height: 100%;
// `;

// export default Chart;

// import React from 'react';
// import styled from 'styled-components';
// import moment from 'moment';
// import { Chart as ChartJs, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend, ArcElement } from 'chart.js';
// import { Line } from 'react-chartjs-2';
// import { useGlobalContext } from '../../context/globalContext';
// import { dateFormat } from '../../utils/dateFormat';

// ChartJs.register(
//     CategoryScale,
//     LinearScale,
//     PointElement,
//     LineElement,
//     Title,
//     Tooltip,
//     Legend,
//     ArcElement
// );

// function Chart() {
//     // Destructuring
//     const { incomes, expenses } = useGlobalContext();

//     // Create an array of dates from incomes and expenses
//     const dates = [...incomes, ...expenses].map(item => moment(item.date, 'DD-MM-YYYY').format('DD-MM-YYYY'));

//     // Get unique dates and sort them chronologically
//     const uniqueDates = Array.from(new Set(dates)).sort();

//     // Create an array to store income and expense values for each day
//     const amounts = uniqueDates.map(date => {
//         const incomeAmount = incomes
//             .filter(item => moment(item.date, 'DD-MM-YYYY').format('DD-MM-YYYY') === date)
//             .reduce((total, item) => total + item.amount, 0);

//         const expenseAmount = expenses
//             .filter(item => moment(item.date, 'DD-MM-YYYY').format('DD-MM-YYYY') === date)
//             .reduce((total, item) => total + item.amount, 0);

//         return incomeAmount - expenseAmount;
//     });

//     const data = {
//         // Using X axis of the graph
//         labels: uniqueDates.map(date => dateFormat(date)),
//         datasets: [
//             {
//                 label: 'Combined',
//                 // Amounts array stores income and expense values for each day
//                 data: amounts,
//                 backgroundColor: 'green', // You can use a single color
//                 tension: 0.2,
//             },
//         ],
//     };

//     return (
//         <ChartStyle>
//             <Line data={data} />
//         </ChartStyle>
//     );
// }

// const ChartStyle = styled.div`
//     background: #FCF6F9;
//     border: 2px solid #FFFFFF;
//     box-shadow: 0px 1px 15px rgba(0, 0, 0, 0.06);
//     padding: 1rem;
//     border-radius: 20px;
//     height: 100%;
// };

// export default Chart;


//--->>final 1
















// import React from 'react';
// import styled from 'styled-components';
// import moment from 'moment';
// import { Chart as ChartJs, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend, ArcElement } from 'chart.js';
// import { Line } from 'react-chartjs-2';
// import { useGlobalContext } from '../../context/globalContext';
// import { dateFormat } from '../../utils/dateFormat';

// ChartJs.register(
//     CategoryScale,
//     LinearScale,
//     PointElement,
//     LineElement,
//     Title,
//     Tooltip,
//     Legend,
//     ArcElement
// );

// function Chart() {
//     // Destructuring
//     const { incomes, expenses } = useGlobalContext();
    
//     // Combine income and expense items for the same date
//     const combinedData = {};
//     [...incomes, ...expenses].forEach(item => {
//         const key = item.date;
//         if (!combinedData[key]) {
//             combinedData[key] = 0;
//         }
//         if (item.type === 'income') {
//             combinedData[key] += item.amount;
//         }  if (item.type === 'expense') {
//             combinedData[key] -= item.amount;
//         }
//     });
//     const sortedDates = Object.keys(combinedData)
//         .sort((a, b) => moment(a).isBefore(b) ? -1 : 1);
//     const data = {
//         labels: Object.keys(sortedDates).map(date => dateFormat(date)),
//         datasets: [
//             {
//                 label: 'Combined',
//                 data: Object.values(combinedData),
//                 backgroundColor: Object.values(combinedData).map(amount => (amount > 0 ? 'green' : 'red')),
//                 tension: 0.2,
//             },
//         ],
//     };

//     return (
//         <ChartStyle>
//             <Line data={data} />
//         </ChartStyle>
//     );
// }

// const ChartStyle = styled.div`
//     background: #FCF6F9;
//     border: 2px solid #FFFFFF;
//     box-shadow: 0px 1px 15px rgba(0, 0, 0, 0.06);
//     padding: 1rem;
//     border-radius: 20px;
//     height: 100%;
// `

// export default Chart;



// import React from 'react';
// import styled from 'styled-components';
// import moment from 'moment';
// import { Chart as ChartJs, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend, ArcElement } from 'chart.js';
// import { Line } from 'react-chartjs-2';
// import { useGlobalContext } from '../../context/globalContext';

// ChartJs.register(
//     CategoryScale,
//     LinearScale,
//     PointElement,
//     LineElement,
//     Title,
//     Tooltip,
//     Legend,
//     ArcElement
// );

// function Chart() {
//     // Destructuring
//     const { incomes, expenses } = useGlobalContext();

//     // Combine income and expense items for the same date
//     const combinedData = {};
//     [...incomes, ...expenses].forEach(item => {
//         const key = item.date;
//         if (!combinedData[key]) {
//             combinedData[key] = 0;
//         }
//         if (item.type === 'income') {
//             combinedData[key] += item.amount;
//         } else if (item.type === 'expense') {
//             combinedData[key] -= item.amount;
//         }
//     });

//     // Sort the dates in ascending order with the "DD-MM-YYYY" format
//     const sortedDates = Object.keys(combinedData).sort((a, b) => moment(a, 'DD-MM-YYYY').isBefore(moment(b, 'DD-MM-YYYY')) ? -1 : 1);
//     const formattedDates = sortedDates.map(date => moment(date, 'DD-MM-YYYY').format('DD-MM-YYYY'));
//     const data = {
//         labels: formattedDates,
//         datasets: [
//             {
//                 label: 'Combined',
//                 data: sortedDates.map(date => combinedData[date]),
//                 backgroundColor: sortedDates.map(date => combinedData[date] > 0 ? 'green' : 'red'),
//                 tension: 0.2,
//             },
//         ],
//     };

//     return (
//         <ChartStyle>
//             <Line data={data} />
//         </ChartStyle>
//     );
// }

// const ChartStyle = styled.div`
//     background: #FCF6F9;
//     border: 2px solid #FFFFFF;
//     box-shadow: 0px 1px 15px rgba(0, 0, 0, 0.06);
//     padding: 1rem;
//     border-radius: 20px;
//     height: 100%;
// `

// export default Chart;



// import React from 'react';
// import styled from 'styled-components';
// import moment from 'moment';
// import { Chart as ChartJs, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend, ArcElement } from 'chart.js';
// import { Line } from 'react-chartjs-2';
// import { useGlobalContext } from '../../context/globalContext';
// import { dateFormat } from '../../utils/dateFormat';

// ChartJs.register(
//     CategoryScale,
//     LinearScale,
//     PointElement,
//     LineElement,
//     Title,
//     Tooltip,
//     Legend,
//     ArcElement
// );

// function Chart() {
//     // Destructuring
//     const { incomes, expenses } = useGlobalContext();

//     // Combine income and expense items for the same date
//     const combinedData = {};
//     [...incomes, ...expenses].forEach(item => {
//         const key = item.date;
//         if (!combinedData[key]) {
//             combinedData[key] = 0;
//         }
//         if (item.type === 'income') {
//             combinedData[key] += item.amount;
//         } else if (item.type === 'expense') {
//             combinedData[key] -= item.amount;
//         }
//     });

//     // Sort the dates in ascending order
//     const sortedDates = Object.keys(combinedData).sort();

//     const data = {
//         labels: sortedDates.map(date => dateFormat(date)),
//         datasets: [
//             {
//                 label: 'Combined',
//                 data: sortedDates.map(date => combinedData[date]),
//                 backgroundColor: sortedDates.map(date => combinedData[date] > 0 ? 'green' : 'red'),
//                 tension: 0.2,
//             },
//         ],
//     };

//     return (
//         <ChartStyle>
//             <Line data={data} />
//         </ChartStyle>
//     );
// }

// const ChartStyle = styled.div`
//     background: #FCF6F9;
//     border: 2px solid #FFFFFF;
//     box-shadow: 0px 1px 15px rgba(0, 0, 0, 0.06);
//     padding: 1rem;
//     border-radius: 20px;
//     height: 100%;
// `
// export default Chart;



import React from 'react';
import styled from 'styled-components';
import moment from 'moment';
import { Chart as ChartJs, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend, ArcElement } from 'chart.js';
import { Line } from 'react-chartjs-2';
import { useGlobalContext } from '../../context/globalContext';
import { dateFormat } from '../../utils/dateFormat';

ChartJs.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
    ArcElement
);

function Chart() {
    // Destructuring
    const { incomes, expenses } = useGlobalContext();

    // Combine income and expense items for the same date
    const combinedData = {};
    [...incomes, ...expenses].forEach(item => {
        const key = item.date;
        if (!combinedData[key]) {
            combinedData[key] = {
                income: 0,
                expense: 0,
            };
        }
        if (item.type === 'income') {
            combinedData[key].income += item.amount;
        } else if (item.type === 'expense') {
            combinedData[key].expense += item.amount;
        }
    });

    // Sort the dates in ascending order
    const sortedDates = Object.keys(combinedData).sort();

    const data = {
        labels: sortedDates.map(date => dateFormat(date)),
        datasets: [
            {
                label: 'Combined',
                data: sortedDates.map(date => combinedData[date].income - combinedData[date].expense),
                backgroundColor: sortedDates.map(date => (combinedData[date].income - combinedData[date].expense) > 0 ? 'green' : 'red'),
                tension: 0.2,
            },
        ],
    };

    const options = {
        plugins: {
            tooltip: {
                callbacks: {
                    label: (context) => {
                        const date = sortedDates[context.dataIndex];
                        const income = combinedData[date].income;
                        const expense = combinedData[date].expense;
                        return `Date: ${dateFormat(date)}  Income: ${income}\n Expense: ${expense}`;
                    },
                },
            },
        },
    };

    return (
        <ChartStyle>
            <Line data={data} options={options} />
        </ChartStyle>
    );
}

const ChartStyle = styled.div`
    background: #FCF6F9;
    border: 2px solid #FFFFFF;
    box-shadow: 0px 1px 15px rgba(0, 0, 0, 0.06);
    padding: 1rem;
    border-radius: 20px;
    height: 100%;
`

export default Chart;





