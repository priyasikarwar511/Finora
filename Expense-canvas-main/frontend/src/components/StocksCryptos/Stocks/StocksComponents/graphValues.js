import { useState, useEffect, useMemo } from "react";

function GraphValues(symbol) {
  const [loading, setLoading] = useState(true);
  const [stockXValues, setStockXValues] = useState([]);
  const [stockYValues, setStockYValues] = useState([]);
  const API_KEY = 'A4SE3ACM4LG72242';
//Fetching the stocks using alpha vantage API
  useEffect(() => {
    setLoading(true); // Set loading to true before making the request

    fetch(`https://www.alphavantage.co/query?function=TIME_SERIES_DAILY&symbol=${symbol}&outputsize=full&apikey=${API_KEY}`)
      .then((response) => response.json())
      .then((data) => {
        const stockXValuesFunction = [];
        const stockYValuesFunction = [];
//On X axis, add the dates and on Y axis, add the opening price of the particular stock.
        for (var key in data['Time Series (Daily)']) {
          stockXValuesFunction.push(key);
          stockYValuesFunction.push(data['Time Series (Daily)'][key]['1. open']);
        }

        setStockXValues(stockXValuesFunction);
        setStockYValues(stockYValuesFunction);
        setLoading(false); // Set loading to false once the data is loaded
      })
      .catch((error) => {
        console.error(error);
        setLoading(false); // Set loading to false in case of an error
      });
  }, [symbol, API_KEY]);
<<<<<<< HEAD

  // Return loading state and data inside an object
  return { loading, data: useMemo(() => ({ x: stockXValues, y: stockYValues }), [stockXValues, stockYValues]) };
=======
//useMemo will avoid recalculations until the dependencies change 
  return useMemo(() => ({
    x: stockXValues,
    y: stockYValues
  }), [stockXValues, stockYValues]);
>>>>>>> 0f6a2885b12d156150733dbe14faf4d4761f9c9c
}

export default GraphValues;
