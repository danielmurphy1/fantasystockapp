import React from 'react';
import { Chart } from 'react-google-charts';

function PortfolioBarChart(props){

    console.log(props.holdings)
    return(
        <div>
            <Chart
                width={'100%'}
                height={'400px'}
                chartType="BarChart"
                loader={<div>Loading Chart</div>}
                data={[
                    ['Symbol', 'Shares'],
                    ...props.holdings.map(holding => [holding.symbol, holding.shares_owned])
                    ]}
                options={{
                    title: "Your Portfolio Shares Owned Distribution",
                    titleTextStyle: { fontSize: 18 },
                    chartArea: {
                        width: "80%",
                        height: "75%"
                    }, 
                    hAxis: {
                        title: 'Number of Shares Owned'
                    },
                    vAxis: {
                        title: 'Symbol'
                    }
                    
                }}
                rootProps={{ 'data-testid': '1' }}
            />
        </div>
    )
};

export default PortfolioBarChart;