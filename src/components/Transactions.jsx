import { Box, useTheme } from "@mui/material";
import { tokens } from "../theme";
import React, { Component } from "react";
import { fetchData, BASE_URL } from "../common/functions.jsx";
import Table from "../components/Table";
import EmailButton from "../components/EmailButton";
import LoadingCircle from "./LoadingCircle";



function withMyHook(Component) {
    return function WrappedComponent(props) {
        const theme = useTheme();
        const colors = tokens(theme.palette.mode);
        return <Component {...props} theme={theme} colors={colors} />
    }
}

const TRANS_URL = BASE_URL + '/get-rule-data'
const RULES_URL = BASE_URL + '/get-rules'

class Transactions extends Component {

    state = {
        datas: [

        ],
        url: BASE_URL + "/rule",
        selectedType: "2c2p",
        rules: [],
        isLoading: false
    }

    componentDidMount() {
        this.getRuleData(this.props.rule, this.props.ruleName);
        this.getRules();
    }

    componentDidUpdate(previousProps) {
        if (previousProps.rule !== this.props.rule || previousProps.ruleName !== this.props.ruleName || previousProps.startDate !== this.props.startDate || previousProps.endDate !== this.props.endDate) {
            this.getRuleData(this.props.rule, this.props.ruleName)
            this.getRules();
        }
    }

    getRuleData = (rule, ruleName) => {
        const startDate = this.props.startDate;
        const endDate = this.props.endDate;
        this.setState({ isLoading: true })
        fetchData(TRANS_URL + "?rule_id=" + rule + "&start=" + startDate + "T00:00:00&end=" + endDate + "T00:00:00").then((results) => {
            this.setState({ datas: results, selectedRule: ruleName, selectedRuleId: rule, isLoading: false })
        });
    }

    getRules = () => {
        fetchData(RULES_URL).then((results) => {
            this.setState({ rules: results });
        });
    }

    handleSelectRule = (rule, ruleName) => {
        this.getRuleData(rule, ruleName)
    }


    getEmailAddress = () => {
        return document.getElementById("emailAddress").value;
    }

    render() {
        return (
            <Box >
                {this.state.isLoading ? <LoadingCircle /> :
                    <div>
                        <Table data={this.state.datas} isCustomerPage={false} />
                        <EmailButton csv={this.state.datas} csvName={this.state.selectedRule} />
                    </div>
                }
            </Box>
        )
    }
}

export default withMyHook(Transactions);