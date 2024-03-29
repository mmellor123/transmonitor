import { ResponsivePie } from "@nivo/pie";
import { tokens } from "../theme";
import { useTheme, Box} from "@mui/material";
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

const PIE_URL = BASE_URL + "/pie-data-new?"

class PieChart extends Component {

    state = {
        datas : [
        
        ],
        isLoading: false
    }

    componentDidMount(){
        this.getRuleData();
    }

    componentDidUpdate(previousProps){
        if(previousProps.startDate !== this.props.startDate || previousProps.endDate !== this.props.endDate){
            this.getRuleData();     
        }
    }

    getRuleData = () =>{
        const startDate = this.props.startDate;
        const endDate = this.props.endDate;
        this.setState({isLoading: true})
        fetchData(PIE_URL + "start="+startDate+"&end="+endDate).then((results) => {
            this.setState({datas: results, isLoading: false})
        });
    }

    render(){
    const colors = this.props.colors;
    return (
        <Box height="100%">
            {this.state.isLoading && <LoadingCircle/>}
            <ResponsivePie
                    data={this.state.datas}
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
                                line:{
                                    stroke: colors.grey[100],
                                    strokeWidth: 1
                                }
                            },
                            text: {
                                fill: colors.grey[100]
                            }
                        },
                        legends: {
                            text: {
                                fill: colors.grey[100]
                            }
                        }
                    }}
                    margin={{ top: 40, right: 80, bottom: 80, left: 80 }}
                    innerRadius={0.5}
                    padAngle={0.7}
                    cornerRadius={3}
                    activeOuterRadiusOffset={8}
                    borderWidth={1}
                    borderColor={{
                        from: 'color',
                        modifiers: [
                            [
                                'darker',
                                0.2
                            ]
                        ]
                    }}
                    arcLinkLabelsSkipAngle={10}
                    arcLinkLabelsTextColor={colors.grey[100]}
                    arcLinkLabelsThickness={2}
                    arcLinkLabelsColor={{ from: 'color' }}
                    arcLabelsSkipAngle={10}
                    arcLabelsTextColor={{
                        from: 'color',
                        modifiers: [
                            [
                                'darker',
                                2
                            ]
                        ]
                    }}
                    defs={[
                        {
                            id: 'dots',
                            type: 'patternDots',
                            background: 'inherit',
                            color: 'rgba(255, 255, 255, 0.3)',
                            size: 4,
                            padding: 1,
                            stagger: true
                        },
                        {
                            id: 'lines',
                            type: 'patternLines',
                            background: 'inherit',
                            color: 'rgba(255, 255, 255, 0.3)',
                            rotation: -45,
                            lineWidth: 6,
                            spacing: 10
                        }
                    ]}
                    legends={[
                        {
                            anchor: 'bottom',
                            direction: 'row',
                            justify: false,
                            translateX: 0,
                            translateY: 56,
                            itemsSpacing: 0,
                            itemWidth: 100,
                            itemHeight: 18,
                            itemTextColor: '#999',
                            itemDirection: 'left-to-right',
                            itemOpacity: 1,
                            symbolSize: 18,
                            symbolShape: 'circle',
                            effects: [
                                {
                                    on: 'hover',
                                    style: {
                                        itemTextColor: '#000'
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

export default withMyHook(PieChart);