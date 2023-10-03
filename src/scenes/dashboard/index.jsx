import { Box, IconButton, Typography, useTheme} from "@mui/material";
import { tokens } from "../../theme";
import Header from "../../components/Header";
import DownloadOutlinedIcon from "@mui/icons-material/DownloadOutlined"
import BarChart from "../../components/BarChart";
import LineChart from "../../components/LineChart";
import LoadingCircle from "../../components/LoadingCircle"

import Transactions from "../../components/Transactions";
import React, {Component} from "react";
import {fetchData,  getDates, monthIndexToString, BASE_URL} from "../../common/functions.jsx";
import Dropdown from 'react-bootstrap/Dropdown';

import SetMonth from "../../components/SetMonth";

const TRANS_URL = BASE_URL + '/get-rule-data'
const RULES_URL = BASE_URL + '/get-rules'




function withMyHook(Component){
    return function WrappedComponent(props){
        const theme = useTheme();
        const colors = tokens(theme.palette.mode);
        return <Component {...props} theme={theme} colors={colors}/>
    }
}

class Dashboard extends Component {
    
    state = {
        selectedYear: 2023,
        selectedMonth: 1,
        url: BASE_URL + "/graph-data-new?",
        datas: {'bar': [], 'line': []},
        rules: [],
        isLoading: false

    }

    componentDidMount(){
        this.getRules();

    }

    getRuleData = (startDate, endDate, r) =>{
        if(r.length ===  0){
            return
        }
        const ruleName = r[0]["name"]
        const rule = r[0]["id"]
        this.setState({isLoading: true})
        fetchData(this.state.url + "start="+startDate+"T00:00:00&end="+endDate+"T00:00:00&rule="+rule).then((results) => {
            this.setState({datas: results, isLoading: false, rule: rule, ruleName: ruleName, rules: r});
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
        this.setState({isLoading: true})
        fetchData(this.state.url + "start="+sDate+"T00:00:00&end="+eDate+"T00:00:00&rule="+this.state.rule).then((results) => {
            this.setState({datas: results, startDate: sDate, endDate: eDate, isLoading: false});
        });
    }

    handleSelectRule = (rule, ruleName) => {
        this.setState({rule: rule, ruleName: ruleName});
    }

    getRules = () =>{
        const d = new Date();
        let [startDate, endDate] = getDates(d.getFullYear(), d.getMonth());
        this.setState({startDate: startDate, endDate: endDate, selectedMonth: d.getMonth(), selectedYear: d.getFullYear()});
        fetchData(RULES_URL).then((results) => {
                // this.setState({rules: results, ruleName: results[0]["name"], rule: results[0]["id"]})
            this.getRuleData(startDate, endDate, results);
        });
    }

    render(){
        const width = window.innerWidth;
        const colors = this.props.colors;
        const startDate = this.state.startDate;
        const endDate = this.state.endDate;
        return (
            <Box m="20px">
                {this.state.isLoading && <LoadingCircle/>}
                <Box display="flex" justifyContent="space-between" alignItems="center">
                    <Header title="DASHBOARD" subtitle="Welcome to your dashboard"/>
                    <Typography color={colors.grey[100]} variant="h3" fontWeight="bold">{monthIndexToString(this.state.selectedMonth)} {this.state.selectedYear}</Typography>
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
                                <Typography variant="h5" fontWeight="600" sx={{p: "30px 30px 0 30px"}} color={colors.grey[100]}>
                                    Bar Chart
                                </Typography>
                                
                                <Box height="250px" mt="-20px">
                                    <BarChart isDashboard={true} numberOfMonthsAgo={this.state.numberOfMonthsAgo} data={this.state.datas['bar']}/>
                                </Box>
                        </Box>

                        {/* ROW 3 */}
                        <Box  gridColumn={width > 1000 ? 'span 8' : 'span 12'} gridRow="span 2" backgroundColor={colors.primary[400]} overflow="auto">
                            <Box  m="30px 30px 30px 30px">
                            {this.state.startDate ? <Transactions rule={this.state.rule} ruleName={this.state.ruleName} isDashboard={true} startDate={startDate} endDate={endDate} numberOfMonthsAgo={this.state.numberOfMonthsAgo}/> : null}
                            </Box>
                        </Box>
                        
                        <Box
                            gridColumn={width > 1000 ? 'span 4' : 'span 12'}
                            gridRow="span 1"
                            backgroundColor={colors.primary[400]}
                            padding="30px"
                        >
                            <SetMonth handleSearch={this.handleSearch} handleSelectYear={this.handleSelectYear} handleSelectMonth={this.handleSelectMonth} monthStr={monthIndexToString(this.state.selectedMonth)} selectedYear={this.state.selectedYear}/>
                            <Dropdown>
                                <Dropdown.Toggle id="nav-dropdown" variant="secondary"  size="sm">
                                    {this.state.ruleName ? this.state.ruleName : "Select Rule"}
                                </Dropdown.Toggle>
                                <Dropdown.Menu variant="dark">
                                    {this.state.rules.map((rule, index) => {
                                        return <Dropdown.Item onClick={() => this.handleSelectRule(rule.id, rule.name)}>{rule.name}</Dropdown.Item>
                                    })}
                                </Dropdown.Menu>
                            </Dropdown>

                        </Box>
                </Box>
            </Box>
        )
    }
}


export default withMyHook(Dashboard);