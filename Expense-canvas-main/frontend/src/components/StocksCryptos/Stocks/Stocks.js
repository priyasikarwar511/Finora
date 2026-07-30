import { InnerLayout } from "../../../styles/Layout";
import { Content, Header, Heading } from "./Stocks.style";
<<<<<<< HEAD
import Plot from "react-plotly.js";
import GraphValues from "./StocksComponents/graphValues";
import Loading from "../Loading"; // Import the LoadingPage component

=======
import { useState, useEffect, useMemo } from "react";
//Use plotly.js to plot the graphs for the stocks
import Plot from "react-plotly.js"; 
import GraphValues from "./StocksComponents/graphValues";
//Use list of list to store the stock symbol and its name and then send it as a prop to the function
>>>>>>> 0f6a2885b12d156150733dbe14faf4d4761f9c9c
const symbols = [
  ["AMZN", "AMAZON STOCKS"],
  ["MSFT", "MICROSOFT STOCKS"],
  ["GOOGL", "GOOGLE STOCKS"],
  ["META", "META STOCKS"],
  ["IBM", "IBM STOCKS"],
  ["TSLA", "TESLA"],
];

function Stocks() {
  return (
    <InnerLayout>
      <Header>
        <Heading>Stocks</Heading>
      </Header>
      <Content>
        {symbols.map((symbol, i) => {
          const { loading, data } = GraphValues(symbol[0]);

          if (loading) {
            return <Loading key={i} />;
          }

          const { x, y } = data;

          return (
            <Plot
              key={i}
              data={[
                {
                  x,
                  y,
                  type: 'scatter',
                  mode: 'lines+markers',
                  marker: { color: 'green' }
                }
              ]}
              layout={{ width: 720, height: 440, title: symbol[1] }}
            />
          );
        })}
      </Content>
    </InnerLayout>
  );
}

export default Stocks;
