import {Box, useTheme} from "@mui/material";
import { tokens } from "../../theme";
import React, {Component} from "react";
import {getDates, monthIndexToString, fetchData, BASE_URL} from "../../common/functions.jsx";
import Dropdown from 'react-bootstrap/Dropdown';
import Transactions from "../../components/Transactions";
import Header from "../../components/Header";
import SetMonth from "../../components/SetMonth";



function withMyHook(Component){
    return function WrappedComponent(props){
        const theme = useTheme();
        const colors = tokens(theme.palette.mode);
        return <Component {...props} theme={theme} colors={colors}/>
    }
}

const RULES_URL = BASE_URL + '/get-rules'


class Invoices extends Component {

    state = {
        numberOfMonthsAgo: 0,
        rules: []
    }

    componentDidMount(){
        this.getRules();
    }

    handleSelectMonth = (month, monthStr) => {
        this.setState({selectedMonth: month, monthStr: monthStr});
    }

    handleSelectYear = (year) => {
        this.setState({selectedYear: year});
    }

    handleSearch = () => {
        let [startDate, endDate] = getDates(this.state.selectedYear, this.state.selectedMonth);
        this.setState({startDate: startDate, endDate: endDate});
    }

    handleSelectRule = (rule, ruleName) => {
        this.setState({rule: rule, ruleName: ruleName});
    }

    getRules = () =>{
        const d = new Date();
        let [startDate, endDate] = getDates(d.getFullYear(), d.getMonth());
        this.setState({startDate: startDate, endDate: endDate, selectedMonth: d.getMonth(), selectedYear: d.getFullYear()});
        fetchData(RULES_URL).then((results) => {
            this.getRuleData(startDate, endDate, results);
        });
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

    render(){
        return (
            <Box m="20px">
                <Header title="TRANSACTIONS" subtitle="Transactions breaking rules"/>
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
                {this.state.startDate ? <Transactions rule={this.state.rule} startDate={this.state.startDate} endDate={this.state.endDate} isDashboard={false} numberOfMonthsAgo={this.state.numberOfMonthsAgo}/> : null}
            </Box>
        )
    }

    

    
}

export default withMyHook(Invoices);