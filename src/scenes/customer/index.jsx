import {Box, useTheme} from "@mui/material";
import { tokens } from "../../theme";
import React, {Component} from "react";
import {fetchData, sendEmail, jsonToCSV, BASE_URL} from "../../common/functions.jsx";
import Table from "../../components/Table";
import { useSearchParams } from "react-router-dom";
import Header from "../../components/Header";



function withMyHook(Component){
    return function WrappedComponent(props){
        const theme = useTheme();
        const colors = tokens(theme.palette.mode);
        const [searchParams] = useSearchParams(); 
        return <Component {...props} theme={theme} colors={colors} type={searchParams.get('type')} cif={searchParams.get('cif')} start={searchParams.get('start') } end={searchParams.get('end') }/>
    }
}

class Customer extends Component {

    state = {
        numberMonthsAgo: 0,
        datas : [
        
        ],
        url: BASE_URL + "/transaction_info?cif=" + this.props.cif + "&start=" + this.props.start + "&end=" + this.props.end + "&type=" + this.props.type,
        selectedRule: 1   
    }

    componentDidMount(){
        this.getRuleData(this.state.numberMonthsAgo, this.state.selectedRule);
    }

    getRuleData = (numberMonthsAgo, rule) =>{
        fetchData(this.state.url).then((results) => {
            this.setState({datas: results, selectedRule: rule, numberMonthsAgo: numberMonthsAgo});
        });
    }

    getEmailAddress = () => {
        return document.getElementById("emailAddress").value;
    }

    render(){
        return (
            <Box m="20px">
                <Header title="Customer Transactions" subtitle="View Customer Transactions"/>
                {/* <Box textAlign="right" display="inline-block">
                    <Button variant="contained" color="error"><CSVLink data={this.state.datas}>Download CSV</CSVLink></Button>
                </Box> */}
                {/* <button onClick={() => sendEmail("max.m@kogopay.com", jsonToCSV(this.state.datas), this.props.cif + "_transactions")}>Send Email</button> */}
                <Box>
                            <input class="emailText" type="text" id="emailAddress"/>
                            <button class="create-rule-submit" onClick={() => sendEmail(this.getEmailAddress(), jsonToCSV(this.state.datas), this.props.cif)}>Send Email</button>
                </Box>
                <Table data={this.state.datas} isCustomerPage={true}/>
            </Box>
        )
    }
}

export default withMyHook(Customer);