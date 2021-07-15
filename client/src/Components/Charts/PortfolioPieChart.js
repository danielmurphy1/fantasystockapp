import React from 'react';
import { Chart } from 'react-google-charts';

function PortfolioPieChart(props){

    return(
        <div>
            <Chart
                width={'800px'}
                height={'400px'}
                chartType="PieChart"
                loader={<div>Loading Chart</div>}
                data={[
                    ['Symbol', 'Price'],
                    ...props.holdings.map(holding => [holding.symbol, parseFloat(holding.shares_value)])
                    ]}
                options={{
                    title: "Your Portfolio Shares Value Distribution",
                    titleTextStyle: { fontSize: 18 },
                    chartArea: {
                        width: "100%",
                        height: "75%"
                    }
                    
                }}
                rootProps={{ 'data-testid': '1' }}
            />
        </div>
    );
};

export default PortfolioPieChart;