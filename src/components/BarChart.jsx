import {useTheme, Box} from "@mui/material";
import { ResponsiveBar } from "@nivo/bar";
import { tokens } from "../theme";
import React, {Component} from "react";
import {fetchData, BASE_URL} from "../common/functions.jsx";
import LoadingCircle from "./LoadingCircle";


function withMyHook(Component){
    return function WrappedComponent(props){
        const theme = useTheme();
        const colors = tokens(theme.palette.mode);
        return <Component {...props} theme={theme} colors={colors}/>
    }
}

const BAR_URL = BASE_URL + "/bar-data-new?" 

class BarChart extends Component {

    state = {
        datas : [
        
        ],
        rules: [],
        isLoading: false
    }

    componentDidMount(){
        if(!this.props.isDashboard){
            this.getRuleData();
        }
    }
    

    componentDidUpdate(previousProps){
        if(!this.props.isDashboard &&(previousProps.startDate !== this.props.startDate || previousProps.endDate !== this.props.endDate)){
            this.getRuleData();     
        }
    }

    getRuleData = () =>{
        const startDate = this.props.startDate;
        const endDate = this.props.endDate;
        this.setState({isLoading: true})
        fetchData(BAR_URL + "start="+startDate+"T00:00:00&end="+endDate+"T00:00:00").then((results) => {
            this.setState({datas: results, isLoading: false});

        });
    }

    render(){
        const colors = this.props.colors;
        const isDashboard = this.props.isDashboard;
        let data = this.state.datas;
        if(isDashboard){
            data = this.props.data;
        }
        let {["date"]: _, ...rules} = data.length > 0 ? data[0]: []
        return(
            <Box height="100%">
                {this.state.isLoading && <LoadingCircle/>}
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
                    keys={Object.keys(rules)}
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