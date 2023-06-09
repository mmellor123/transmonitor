import { Box, IconButton, Typography, useTheme } from "@mui/material";
import { tokens } from "../../theme";
import Header from "../../components/Header";
import DownloadOutlinedIcon from "@mui/icons-material/DownloadOutlined"
// import EmailIcon from "@mui/icons-material/Email"
// import PointOfSaleIcon from "@mui/icons-material/PointOfSale"
// import PersonAddIcon from "@mui/icons-material/PersonAdd"
// import TrafficIcon from "@mui/icons-material/Traffic"
import BarChart from "../../components/BarChart";
import LineChart from "../../components/LineChart";
// import StatBox from "../../components/StatBox";
// import ProgressCircle from "../../components/ProgressCircle";
import Transactions from "../../components/Transactions";
import React, {Component} from "react";
import {fetchData,  getDates, monthIndexToString, BASE_URL} from "../../common/functions.jsx";

import SetMonth from "../../components/SetMonth";




function withMyHook(Component){
    return function WrappedComponent(props){
        const theme = useTheme();
        const colors = tokens(theme.palette.mode);
        return <Component {...props} theme={theme} colors={colors}/>
    }
}

class Dashboard extends Component {
    
    state = {
        numberOfMonthsAgo: 0,
        selectedYear: 2023,
        selectedMonth: 1,
        url: BASE_URL + "/graph-data?",
        datas: {'bar': [], 'line': []},

    }

    componentDidMount(){
        const d = new Date();
        let [startDate, endDate] = getDates(d.getFullYear(), d.getMonth());
        this.setState({startDate: startDate, endDate: endDate, selectedMonth: d.getMonth(), selectedYear: d.getFullYear()});
        this.getRuleData(startDate, endDate);
    }

    handlePreviousMonthClick = () => {
        this.getRuleData(this.state.numberOfMonthsAgo + 1);
    };

    handleNextMonthClick = () => {
        let no = this.state.numberOfMonthsAgo;
        this.getRuleData(no > 0 ? --no : no+=0);
    };

    getRuleData = (startDate, endDate) =>{
        fetchData(this.state.url + "start="+startDate+"&end="+endDate).then((results) => {
            this.setState({datas: results});
        });
    }

    handleSelectMonth = (month, monthStr) => {
        this.setState({selectedMonth: month, monthStr: monthStr});
    }

    handleSelectYear = (year) => {
        this.setState({selectedYear: year});
    }

    handleSearch = () => {
        let [sDate, eDate] = getDates(this.state.selectedYear, this.state.selectedMonth);
        fetchData(this.state.url + "start="+sDate+"&end="+eDate).then((results) => {
            this.setState({datas: results, startDate: sDate, endDate: eDate});
        });
    }

    render(){
        const width = window.innerWidth;
        // const height = window.innerHeight;
        const colors = this.props.colors;
        const startDate = this.state.startDate;
        const endDate = this.state.endDate;
        return (
            <Box m="20px">
                <Box display="flex" justifyContent="space-between" alignItems="center">
                    <Header title="DASHBOARD" subtitle="Welcome to your dashboard"/>
                    <Typography variant="h3" fontWeight="bold">{monthIndexToString(this.state.selectedMonth)} {this.state.selectedYear}</Typography>
                {/* <Box>
                    <Button
                        sx={{backgroundColor: colors.blueAccent[700], color: colors.grey[100], fontSize: "14px", fontWeight: "bold", padding: "10px 20px"}}
                    >
                        <DownloadOutlinedIcon sx={{mr: "10px"}}/>
                        Download Reports
                    </Button> 
                </Box> */}
                </Box>
                {/* GRID AND CHARTS */}
                <Box
                    display="grid"
                    gridTemplateColumns="repeat(12, 1fr)"
                    gridAutoRows="140px"
                    gap="20px"
                >
                    <Box
                        
                        gridColumn={width > 1000 ? 'span 6' : 'span 12'}
                        gridRow="span 2"
                        backgroundColor={colors.primary[400]}
                    >
                        <Box
                            mt="25px"
                            p="0 30px"
                            display="flex"
                            justifyContent="space-between"
                            alignItems="center"
                        >
                            <Box>
                                <Typography variant="h5" fontWeight="600" color={colors.grey[100]}>
                                    Rules Broken
                                </Typography>
                                {/* <Typography variant="h3" fontWeight="bold" color={colors.greenAccent[500]}>
                                    Total no
                                </Typography> */}
                            </Box>

                            <Box>
                                <IconButton>
                                    <DownloadOutlinedIcon
                                        sx={{fontSize: "26px", color: colors.greenAccent[500]}}
                                    />
                                </IconButton>
                            </Box>
                        </Box>
                        <Box height="250px" mt="-20px">
                            <LineChart isDashboard={true} numberOfMonthsAgo={this.state.numberOfMonthsAgo} data={this.state.datas['line']}/>
                        </Box>
                        </Box>

                        {/*TRANSACTIONS*/}
                        <Box gridColumn={width > 1000 ? 'span 6' : 'span 12'} gridRow="span 2" backgroundColor={colors.primary[400]} overflow="auto">
                                <Typography variant="h5" fontWeight="600" sx={{p: "30px 30px 0 30px"}}>
                                    Bar Chart
                                </Typography>
                                
                                <Box height="250px" mt="-20px">
                                    <BarChart isDashboard={true} numberOfMonthsAgo={this.state.numberOfMonthsAgo} data={this.state.datas['bar']}/>
                                </Box>
                        </Box>

                        {/* ROW 3 */}
                        <Box  gridColumn={width > 1000 ? 'span 8' : 'span 12'} gridRow="span 2" backgroundColor={colors.primary[400]} overflow="auto">
                            {/* <Typography variant="h5" fontWeight="600" sx={{p: "30px 30px 0 30px"}}>
                                Search Table
                            </Typography> */}
                            <Box  m="30px 30px 30px 30px">
                            {this.state.startDate ? <Transactions isDashboard={true} startDate={startDate} endDate={endDate} numberOfMonthsAgo={this.state.numberOfMonthsAgo}/> : null}
                            </Box>
                        </Box>
                        
                        <Box
                            gridColumn={width > 1000 ? 'span 4' : 'span 12'}
                            gridRow="span 1"
                            backgroundColor={colors.primary[400]}
                            padding="30px"
                        >
                            <SetMonth handleSearch={this.handleSearch} handleSelectYear={this.handleSelectYear} handleSelectMonth={this.handleSelectMonth} monthStr={monthIndexToString(this.state.selectedMonth)} selectedYear={this.state.selectedYear}/>
                        </Box>
                        {/* */}
                </Box>
            </Box>
        )
    }
}


export default withMyHook(Dashboard);