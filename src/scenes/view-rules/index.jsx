import React, {Component} from "react";
import Table from "../../components/Table";
import {fetchData, BASE_URL, deleteRule} from "../../common/functions.jsx";
import {Box} from "@mui/material";
import Header from "../../components/Header";

class ViewRules extends Component {

    state = {
        data: []
    }

    fetchRuleData(){
        fetchData(BASE_URL +"/get-rules").then((results) => {
            this.setState({data: results})
        });
    }

    componentDidMount(){
        this.fetchRuleData();
    }

    handleDelete = (rule_id) => {
        deleteRule(BASE_URL + "/delete-rule", {"rule_id": rule_id}).then((results) => {
            this.fetchRuleData();
        });
    }

    render(){
        return (
            <Box m="20px">
                <Header title="View Rules" subtitle="View and manage your rules here"/>
                <Table data={this.state.data} isCustomerPage={false} isViewRules={true} handleDelete={this.handleDelete}/>
            </Box>
        )
    }
}

export default ViewRules