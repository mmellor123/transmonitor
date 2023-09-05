import {Box, useTheme} from "@mui/material";
import { tokens } from "../../theme";
import React, {Component} from "react";
import {fetchData, BASE_URL} from "../../common/functions.jsx";
import Table from "../../components/Table";
import { useSearchParams } from "react-router-dom";
import Header from "../../components/Header";
import EmailButton from "../../components/EmailButton";



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
        datas : [
        ],
        url: BASE_URL + "/transaction_info?cif=" + this.props.cif + "&start=" + this.props.start + "&end=" + this.props.end + "&type=" + this.props.type,
        selectedRule: 1   
    }

    componentDidMount(){
        this.getRuleData(this.state.selectedRule);
    }

    getRuleData = (rule) =>{
        fetchData(this.state.url).then((results) => {
            this.setState({datas: results, selectedRule: rule});
        });
    }

    getEmailAddress = () => {
        return document.getElementById("emailAddress").value;
    }

    render(){
        return (
            <Box m="20px">
                <Header title="Customer Transactions" subtitle="View Customer Transactions"/>
                {/* <Box>
                            <input class="emailText" type="text" id="emailAddress"/>
                            <button class="create-rule-submit" onClick={() => sendEmail(this.getEmailAddress(), jsonToCSV(this.state.datas), this.props.cif)}>Send Email</button>
                </Box> */}
                <EmailButton csv={this.state.datas} csvName={this.props.cif}/>
                <Table data={this.state.datas} isCustomerPage={true}/>
            </Box>
        )
    }
}

export default withMyHook(Customer);