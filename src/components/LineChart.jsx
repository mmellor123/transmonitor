import { useTheme, Box} from "@mui/material";
import { tokens } from "../theme";
import { ResponsiveLine } from "@nivo/line";
import React, {Component} from "react";
import {fetchData, BASE_URL} from "../common/functions.jsx";


function withMyHook(Component){
    return function WrappedComponent(props){
        const theme = useTheme();
        const colors = tokens(theme.palette.mode);
        return <Component {...props} theme={theme} colors={colors}/>
    }
}

class LineChart extends Component {

    state = {
        numberMonthsAgo: 0,
        datas : [
        
        ],
        url: BASE_URL + "/line-data?"
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
            this.setState({datas: results});
        });
    }

    render(){
        const isDashboard = this.props.isDashboard;
        const colors = this.props.colors;
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

                <ResponsiveLine
                    data={data}
                    theme={{
                        axis: {
                            domain: {
                                line: {
                                    stroke: colors.grey[100]
                                }
                            },
                            legend: {
                                text: {
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
                        },
                        tooltip: {
                            container: {
                                color: colors.primary[500]
                            }
                        }
                    }}
                    // colors={isDashboard ? {datum: "color"} : {scheme: "nivo"}}
                    colors={{scheme: "nivo"}}
                    margin={{ top: 50, right: 80, bottom: 50, left: 30 }}
                    xScale={{ type: 'point' }}
                    yScale={{
                        type: 'linear',
                        min: 'auto',
                        max: 'auto',
                        stacked: false,
                        reverse: false
                    }}
                    yFormat=" >-.2f"
                    axisTop={null}
                    axisRight={null}
                    axisBottom={{
                        orient: 'bottom',
                        tickSize: 5,
                        tickPadding: 5,
                        tickRotation: 0,
                        legend: isDashboard ? undefined : 'transportation',
                        legendOffset: 36,
                        legendPosition: 'middle'
                    }}
                    axisLeft={{
                        orient: 'left',
                        tickValues: 5,
                        tickSize: 5,
                        tickPadding: 5,
                        tickRotation: 0,
                        legend: isDashboard ? undefined : 'count',
                        legendOffset: -40,
                        legendPosition: 'middle'
                    }}
                    pointSize={10}
                    pointColor={{ theme: 'background' }}
                    pointBorderWidth={2}
                    pointBorderColor={{ from: 'serieColor' }}
                    pointLabelYOffset={-12}
                    useMesh={true}
                    legends={[
                        {
                            anchor: 'bottom-right',
                            direction: 'column',
                            justify: false,
                            translateX: 100,
                            translateY: 0,
                            itemsSpacing: 0,
                            itemDirection: 'left-to-right',
                            itemWidth: 80,
                            itemHeight: 20,
                            itemOpacity: 0.75,
                            symbolSize: 12,
                            symbolShape: 'circle',
                            symbolBorderColor: 'rgba(0, 0, 0, .5)',
                            effects: [
                                {
                                    on: 'hover',
                                    style: {
                                        itemBackground: 'rgba(0, 0, 0, .03)',
                                        itemOpacity: 1
                                    }
                                }
                            ]
                        }
                    ]}
                />
            </Box>

        )
    }
}

export default withMyHook(LineChart);