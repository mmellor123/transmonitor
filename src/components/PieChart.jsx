import { ResponsivePie } from "@nivo/pie";
import { tokens } from "../theme";
import { useTheme, Box} from "@mui/material";
import React, {Component} from "react";
import {fetchData, BASE_URL} from "../common/functions.jsx";

function withMyHook(Component){
    return function WrappedComponent(props){
        const theme = useTheme();
        const colors = tokens(theme.palette.mode);
        return <Component {...props} theme={theme} colors={colors}/>
    }
}

class PieChart extends Component {

    state = {
        datas : [
        
        ],
        url: BASE_URL + "/pie-data?"
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
        fetchData(this.state.url + "start="+startDate+"&end="+endDate).then((results) => {
            let data = []
                    data[0] = {
                        id: "rule1",
                        label: "rule1",
                        value: results.rule1
                    };
                    data[1] = {
                        id: "rule2",
                        label: "rule2",
                        value: results.rule2
                    }
                    data[2] = {
                        id: "rule3",
                        label: "rule3",
                        value: results.rule3
                    }
                    data[3] = {
                        id: "rule4",
                        label: "rule4",
                        value: results.rule4
                    }
                    data[4] = {
                        id: "rule5",
                        label: "rule5",
                        value: results.rule5
                    }
                    data[5] = {
                        id: "rule6",
                        label: "rule6",
                        value: results.rule6
                    }
                    this.setState({datas: data});
        });
    }

    render(){
    const colors = this.props.colors;
    return (
        <Box height="100%">
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