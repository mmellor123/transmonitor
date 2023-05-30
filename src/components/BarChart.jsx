import {useTheme, Box} from "@mui/material";
import { ResponsiveBar } from "@nivo/bar";
import { tokens } from "../theme";
import React, {Component} from "react";
import {fetchData, BASE_URL} from "../common/functions.jsx";


function withMyHook(Component){
    return function WrappedComponent(props){
        const theme = useTheme();
        const colors = tokens(theme.palette.mode);
        return <Component {...props} theme={theme} colors={colors}/>
    }
}

class BarChart extends Component {

    state = {
        numberMonthsAgo: 0,
        datas : [
        
        ],
        url: BASE_URL + "/bar-data?"
    }

    componentDidMount(){
        if(!this.props.isDashboard){
            this.getRuleData(this.props.numberOfMonthsAgo);
        }
    }
    

    componentDidUpdate(previousProps){
        if(!this.props.isDashboard &&(previousProps.startDate !== this.props.startDate || previousProps.endDate !== this.props.endDate)){
            this.getRuleData(this.props.numberOfMonthsAgo);     
        }
    }

    getRuleData = (numberMonthsAgo) =>{
        const startDate = this.props.startDate;
        const endDate = this.props.endDate;
        fetchData(this.state.url + "start="+startDate+"&end="+endDate).then((results) => {
            let data = []
            for(var i = 0 ; i < results.length ; i++){
                const result = results[i]
                data[i] = result.rules;
                data[i]['date'] = result.date;
            }
            this.setState({datas: data});
        });
    }

    render(){
        // const theme = this.props.theme;
        const colors = this.props.colors;    
        const isDashboard = this.props.isDashboard;
        let data = this.state.datas;
        if(isDashboard){
            data = this.props.data;
        }
        return(
            <Box height="100%">
                {/* {!isDashboard &&
                    <Typography variant="h3" fontWeight="bold">{startDate} - {endDate}</Typography>
                } */}
                {/* {!isDashboard &&
                    <ChangeMonth handleNextMonthClick={this.handleNextMonthClick} handlePreviousMonthClick={this.handlePreviousMonthClick}/>
                } */}

                <ResponsiveBar
                    data={data}
                    theme={{
                        axis: {
                            domain: {
                                line: {
                                    stroke: colors.grey[100]
                                }
                            },
                            legend: {
                                text:{
                                    fill: colors.grey[100]
                                }
                            },
                            ticks: {
                                line: {
                                    stroke: colors.grey[100],
                                    strokeWidth: 1
                                },
                                text: {
                                    fill: colors.grey[100]
                                }
                            }
                        },
                        legends: {
                            text: {
                                fill: colors.grey[100]
                            }
                        }
                    }}
                    keys={[
                        'rule1',
                        'rule2',
                        'rule3',
                        'rule4',
                        'rule5',
                        'rule6'
                    ]}
                    indexBy="date"
                    margin={{ top: 50, right: 80, bottom: 50, left: 30 }}
                    padding={0.3}
                    valueScale={{ type: 'linear' }}
                    indexScale={{ type: 'band', round: true }}
                    colors={{ scheme: 'nivo' }}
                    defs={[
                        {
                            id: 'dots',
                            type: 'patternDots',
                            background: 'inherit',
                            color: '#38bcb2',
                            size: 4,
                            padding: 1,
                            stagger: true
                        },
                        {
                            id: 'lines',
                            type: 'patternLines',
                            background: 'inherit',
                            color: '#eed312',
                            rotation: -45,
                            lineWidth: 6,
                            spacing: 10
                        }
                    ]}
                    fill={[
                        {
                            match: {
                                id: 'fries'
                            },
                            id: 'dots'
                        },
                        {
                            match: {
                                id: 'sandwich'
                            },
                            id: 'lines'
                        }
                    ]}
                    borderColor={{
                        from: 'color',
                        modifiers: [
                            [
                                'darker',
                                1.6
                            ]
                        ]
                    }}
                    axisTop={null}
                    axisRight={null}
                    axisBottom={{
                        tickSize: 5,
                        tickPadding: 5,
                        tickRotation: 0,
                        legend: isDashboard ? undefined : 'date',
                        legendPosition: 'middle',
                        legendOffset: 32
                    }}
                    axisLeft={{
                        tickSize: 5,
                        tickPadding: 5,
                        tickRotation: 0,
                        legend: isDashboard ? undefined :'food',
                        legendPosition: 'middle',
                        legendOffset: -40
                    }}
                    labelSkipWidth={12}
                    labelSkipHeight={12}
                    labelTextColor={{
                        from: 'color',
                        modifiers: [
                            [
                                'darker',
                                1.6
                            ]
                        ]
                    }}
                    legends={[
                        {
                            dataFrom: 'keys',
                            anchor: 'bottom-right',
                            direction: 'column',
                            justify: false,
                            translateX: 120,
                            translateY: 0,
                            itemsSpacing: 2,
                            itemWidth: 100,
                            itemHeight: 20,
                            itemDirection: 'left-to-right',
                            itemOpacity: 0.85,
                            symbolSize: 20,
                            effects: [
                                {
                                    on: 'hover',
                                    style: {
                                        itemOpacity: 1
                                    }
                                }
                            ]
                        }
                    ]}
                    role="application"
                    ariaLabel="Nivo bar chart demo"
                    barAriaLabel={function(e){return e.id+": "+e.formattedValue+" in date: "+e.indexValue}}
                />
        </Box>
        )
    }
}

export default withMyHook(BarChart);