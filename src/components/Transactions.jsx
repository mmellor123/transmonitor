import {Box, useTheme} from "@mui/material";
import { tokens } from "../theme";
import React, {Component} from "react";
import {fetchData, BASE_URL} from "../common/functions.jsx";
import Table from "../components/Table";
import EmailButton from "../components/EmailButton";
import LoadingCircle from "./LoadingCircle";



function withMyHook(Component){
    return function WrappedComponent(props){
        const theme = useTheme();
        const colors = tokens(theme.palette.mode);
        return <Component {...props} theme={theme} colors={colors}/>
    }
}

const TRANS_URL = BASE_URL + '/get-rule-data'

class Transactions extends Component {

    state = {
        datas : [
        
        ],
        url: BASE_URL + "/rule",
        selectedType: "2c2p",
        isLoading: false,
    }

    componentDidMount(){
        console.log("Did mount")
        // this.getRuleData(this.props.rule, this.props.ruleName)
    }

    componentDidUpdate(previousProps){
        if(previousProps.rule !== this.props.rule || previousProps.ruleName !== this.props.ruleName || previousProps.startDate !== this.props.startDate || previousProps.endDate !== this.props.endDate){
            console.log("Did update")
            this.getRuleData(this.props.rule, this.props.ruleName)
        }
    }

    getRuleData = (rule, ruleName) =>{
        const startDate = this.props.startDate;
        const endDate = this.props.endDate;
        this.setState({isLoading: true})
        fetchData(TRANS_URL +"?rule_id="+rule+ "&start="+startDate+"T00:00:00&end="+endDate+"T00:00:00").then((results) => {
            this.setState({datas: results, selectedRule: ruleName, selectedRuleId: rule, isLoading: false})
        });
    }


    getEmailAddress = () => {
        return document.getElementById("emailAddress").value;
    }

    render(){
        return (
            <Box >
                {this.state.isLoading && <LoadingCircle/>}
                <Table data={this.state.datas} isCustomerPage={false}/>
                <EmailButton csv={this.state.datas} csvName={this.props.ruleName}/>
            </Box>
        )
    }
}

export default withMyHook(Transactions);