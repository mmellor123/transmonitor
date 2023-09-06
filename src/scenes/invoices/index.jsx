import {Box, useTheme} from "@mui/material";
import { tokens } from "../../theme";
import React, {Component} from "react";
import {getDates, monthIndexToString} from "../../common/functions.jsx";

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

class Invoices extends Component {

    state = {
        numberOfMonthsAgo: 0
    }

    componentDidMount(){
        const d = new Date();
        let [startDate, endDate] = getDates(d.getFullYear(), d.getMonth());
        this.setState({startDate: startDate, endDate: endDate, selectedMonth: d.getMonth(), selectedYear: d.getFullYear()});
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

    render(){
        return (
            <Box m="20px">
                <Header title="TRANSACTIONS TEST" subtitle="Transactions breaking rules"/>
                <SetMonth handleSearch={this.handleSearch} handleSelectYear={this.handleSelectYear} handleSelectMonth={this.handleSelectMonth} monthStr={monthIndexToString(this.state.selectedMonth)} selectedYear={this.state.selectedYear}/>
                {this.state.startDate ? <Transactions startDate={this.state.startDate} endDate={this.state.endDate} isDashboard={false} numberOfMonthsAgo={this.state.numberOfMonthsAgo}/> : null}
            </Box>
        )
    }

    

    
}

export default withMyHook(Invoices);