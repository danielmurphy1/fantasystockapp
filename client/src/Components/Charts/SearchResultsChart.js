import React from 'react';
import { Chart } from 'react-google-charts';

function SearchResultsChart(props){
    return(
        <div>
            <Chart
                width={'100%'}
                height={'500px'}
                chartType="AreaChart"
                loader={<div>Loading Chart</div>}
                data={[
                    ['Date', 'Price'],
                    ...props.chartData.map(d => [d.date, d.close])
                    ]}
                options={{
                    title: `Closing Prices for ${props.companyName} the Last Week`,
                    pointSize: 10,
                    colors: ['#15A0C8'],
                    series: {
                        0: { 
                            pointShape: 'circle',
                            curveType: 'function'
                        }
                    },
                    chartArea: "100%",
                    hAxis: {title: "Date"},
                    vAxis: {title: "Price"}
                }}
                rootProps={{ 'data-testid': '1' }}
            />
        </div>
    )
};

export default SearchResultsChart;