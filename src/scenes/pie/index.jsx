import {Box} from "@mui/material";
import Header from "../../components/Header";
import PieChart from "../../components/PieChart";
import React, {Component} from "react";
import {getDates, monthIndexToString} from "../../common/functions.jsx";
import SetMonth from "../../components/SetMonth";


function withMyHook(Component){
    return function WrappedComponent(props){
        return <Component {...props}/>
    }
}

class Pie extends Component {

    state = {
        numberOfMonthsAgo: 0,
        selectedYear: 2023,
    }

    componentDidMount(){
        const d = new Date();
        let [startDate, endDate] = getDates(d.getFullYear(), d.getMonth());
        this.setState({startDate: startDate, endDate: endDate, selectedYear: d.getFullYear(), selectedMonth: d.getMonth()});
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
                <Header title="Pie Chart" subtitle="Simple Pie Chart"/>
                <Box height="75vh">
                    <SetMonth handleSearch={this.handleSearch} handleSelectYear={this.handleSelectYear} handleSelectMonth={this.handleSelectMonth} monthStr={monthIndexToString(this.state.selectedMonth)} selectedYear={this.state.selectedYear}/>
                    {this.state.startDate ? <PieChart startDate={this.state.startDate} endDate={this.state.endDate} isDashboard={false} numberOfMonthsAgo={this.state.numberOfMonthsAgo}/> : null}
                </Box>
            </Box>
        )
}}

export default withMyHook(Pie);