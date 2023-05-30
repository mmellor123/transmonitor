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
        selectedRule: 1,
        selectedType: "2c2p"  
    }

    componentDidMount(){
        this.getRuleData(this.props.numberOfMonthsAgo, this.state.selectedRule);
    }

    componentDidUpdate(previousProps){
        // if(previousProps.numberOfMonthsAgo != this.props.numberOfMonthsAgo){
        if(previousProps.startDate !== this.props.startDate || previousProps.endDate !== this.props.endDate){
            this.getRuleData(this.props.numberOfMonthsAgo, this.state.selectedRule);     
        }
    }

    getRuleData = (numberMonthsAgo, rule) =>{
        const startDate = this.props.startDate;
        const endDate = this.props.endDate;
        fetchData(this.state.url +""+rule+ "?start="+startDate+"&end="+endDate).then((results) => {
            this.setState({datas: results, numberMonthsAgo: numberMonthsAgo, selectedRule: rule})
        });
    }

    handleSelectRule = (rule) => {
        this.getRuleData(this.props.numberOfMonthsAgo, rule)
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
                        <Dropdown.Toggle id="dropdown-button-dark-example1" variant="secondary"  size="sm">
                            Rule {this.state.selectedRule}
                        </Dropdown.Toggle>
                        <Dropdown.Menu variant="dark">
                            <Dropdown.Item onClick={() => this.handleSelectRule(1)}>1</Dropdown.Item>
                            <Dropdown.Item onClick={() => this.handleSelectRule(2)}>2</Dropdown.Item>
                            <Dropdown.Item onClick={() => this.handleSelectRule(3)}>3</Dropdown.Item>
                            <Dropdown.Item onClick={() => this.handleSelectRule(4)}>4</Dropdown.Item>
                        </Dropdown.Menu>
                    </Dropdown>
                    {!this.props.isDashboard &&
                        <Box display="flex">
                            <input class="emailText" type="text" id="emailAddress"/>
                            <button class="myButton" onClick={() => sendEmail(this.getEmailAddress(), jsonToCSV(this.state.datas), headerSubtitle)}>Send Email</button>
                        </Box>
                    }
                </Box>
                <Table data={this.state.datas} isCustomerPage={false}/>
            </Box>
        )
    }
}

export default withMyHook(Transactions);