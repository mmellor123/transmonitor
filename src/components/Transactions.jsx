import {Box, useTheme} from "@mui/material";
import { tokens } from "../theme";
import React, {Component} from "react";
import {getStartAndEndDates, fetchData, jsonToCSV, sendEmail, BASE_URL} from "../common/functions.jsx";
import Table from "../components/Table";
import Dropdown from 'react-bootstrap/Dropdown';



function withMyHook(Component){
    return function WrappedComponent(props){
        const theme = useTheme();
        const colors = tokens(theme.palette.mode);
        return <Component {...props} theme={theme} colors={colors}/>
    }
}

class Transactions extends Component {

    state = {
        datas : [
        
        ],
        url: BASE_URL + "/rule",
        selectedType: "2c2p",
        rules: []
    }

    componentDidMount(){
        this.getRuleData(this.props.numberOfMonthsAgo, this.state.selectedRule);
        this.getRules();
    }

    componentDidUpdate(previousProps){
        // if(previousProps.numberOfMonthsAgo != this.props.numberOfMonthsAgo){
        if(previousProps.startDate !== this.props.startDate || previousProps.endDate !== this.props.endDate){
            this.getRuleData(this.props.numberOfMonthsAgo, this.state.selectedRule);
            this.getRules();
        }
    }

    getRuleData = (numberMonthsAgo, rule, ruleName) =>{
        const startDate = this.props.startDate;
        const endDate = this.props.endDate;
        fetchData(BASE_URL +"/get-rule-data?rule_id="+rule+ "&start="+startDate+"T00:00:00&end="+endDate+"T00:00:00").then((results) => {
            this.setState({datas: results, numberMonthsAgo: numberMonthsAgo, selectedRule: ruleName})
        });
    }

    getRules = () =>{
        fetchData(BASE_URL + "/get-rules").then((results) => {
            this.setState({rules: results});
        });
    }

    handleSelectRule = (rule, ruleName) => {
        this.getRuleData(this.props.numberOfMonthsAgo, rule, ruleName)
    }

    handlePreviousMonthClick = () => {
        let no = this.state.numberMonthsAgo + 1;
        this.getRuleData(no, this.state.selectedRule);
    };

    handleNextMonthClick = () => {
        let no = this.state.numberMonthsAgo;
        no > 0 ? --no : no+=0;
        this.getRuleData(no, this.state.selectedRule);
    };

    handleDownloadCSV = () => {
        console.log("Downloading CSV")
    }

    getEmailAddress = () => {
        return document.getElementById("emailAddress").value;
    }

    render(){
        const rule = "Rule " + this.state.selectedRule;
        const [startDate, endDate] = getStartAndEndDates(this.props.numberOfMonthsAgo);
        const headerSubtitle = rule + " (" + startDate + " to " + endDate + ")";

        return (
            <Box >
                <Box >
                    {/* Drop down to pick rule */}
                    <Dropdown>
                        <Dropdown.Toggle id="nav-dropdown" variant="secondary"  size="sm">
                            {this.state.selectedRule ? this.state.selectedRule : "Select Rule"}
                        </Dropdown.Toggle>
                        <Dropdown.Menu variant="dark">
                            {this.state.rules.map((rule, index) => {
                                return <Dropdown.Item onClick={() => this.handleSelectRule(rule.id, rule.name)}>{rule.name}</Dropdown.Item>
                            })}
                        </Dropdown.Menu>
                    </Dropdown>
                    {/* {!this.props.isDashboard &&
                        <Box display="flex">
                            <input class="emailText" type="text" id="emailAddress"/>
                            <button class="myButton" onClick={() => sendEmail(this.getEmailAddress(), jsonToCSV(this.state.datas), headerSubtitle)}>Send Email</button>
                        </Box>
                    } */}
                </Box>
                <Table data={this.state.datas} isCustomerPage={false}/>
            </Box>
        )
    }
}

export default withMyHook(Transactions);