import React from 'react';
import { Chart } from 'react-google-charts';

function PortfolioPieChart(props){

    const formatter = new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD',
        minimumFractionDigits: 2
    });

    console.log(props.holdings)
    return(
        <div>
            <Chart
                width={'800px'}
                height={'500px'}
                chartType="PieChart"
                loader={<div>Loading Chart</div>}
                data={[
                    ['Symbol', 'Price'],
                    ...props.holdings.map(holding => [holding.symbol, parseFloat(holding.shares_value)])
                    ]}
                options={{
                    title: "Your Portfolio Distribution",
                    titleTextStyle: { fontSize: 18 },
                    chartArea: "100%",
                    width: "70%",
                    height: "80%"
                }}
                rootProps={{ 'data-testid': '1' }}
            />
        </div>
    )
};

export default PortfolioPieChart;