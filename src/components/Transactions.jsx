import {Box, useTheme} from "@mui/material";
import { tokens } from "../theme";
import React, {Component} from "react";
import {fetchData, BASE_URL} from "../common/functions.jsx";
import Table from "../components/Table";
import Dropdown from 'react-bootstrap/Dropdown';



function withMyHook(Component){
    return function WrappedComponent(props){
        const theme = useTheme();
        const colors = tokens(theme.palette.mode);
        return <Component {...props} theme={theme} colors={colors}/>
    }
}

const TRANS_URL = BASE_URL + '/get-rule-data'
const RULES_URL = BASE_URL + '/get-rules'

class Transactions extends Component {

    state = {
        datas : [
        
        ],
        url: BASE_URL + "/rule",
        selectedType: "2c2p",
        rules: []
    }

    componentDidMount(){
        this.getRuleData(this.state.selectedRule);
        this.getRules();
    }

    componentDidUpdate(previousProps){
        if(previousProps.startDate !== this.props.startDate || previousProps.endDate !== this.props.endDate){
            this.getRuleData(this.state.selectedRule);
            this.getRules();
        }
    }

    getRuleData = (rule, ruleName) =>{
        const startDate = this.props.startDate;
        const endDate = this.props.endDate;
        fetchData(TRANS_URL +"?rule_id="+rule+ "&start="+startDate+"T00:00:00&end="+endDate+"T00:00:00").then((results) => {
            this.setState({datas: results,selectedRule: ruleName})
        });
    }

    getRules = () =>{
        fetchData(RULES_URL).then((results) => {
            this.setState({rules: results});
        });
    }

    handleSelectRule = (rule, ruleName) => {
        this.getRuleData(rule, ruleName)
    }


    getEmailAddress = () => {
        return document.getElementById("emailAddress").value;
    }

    render(){
        return (
            <Box >
                <Box >
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
                </Box>
                <Table data={this.state.datas} isCustomerPage={false}/>
            </Box>
        )
    }
}

export default withMyHook(Transactions);