import { Box, useTheme } from "@mui/material";
import { tokens } from "../../theme";
import React, { Component } from "react";
import { fetchData, BASE_URL, isWidescreen } from "../../common/functions.jsx";
import Table from "../../components/Table";
import { useSearchParams } from "react-router-dom";
import Header from "../../components/Header";
import EmailButton from "../../components/EmailButton";



function withMyHook(Component) {
    return function WrappedComponent(props) {
        const theme = useTheme();
        const colors = tokens(theme.palette.mode);
        const [searchParams] = useSearchParams();
        return <Component {...props} theme={theme} colors={colors} type={searchParams.get('type')} cif={searchParams.get('cif')} start={searchParams.get('start')} end={searchParams.get('end')} />
    }
}

class Customer extends Component {

    state = {
        datas: [
        ],
        url: BASE_URL + "/transaction_info?cif=" + this.props.cif + "&start=" + this.props.start + "&end=" + this.props.end + "&type=" + this.props.type,
        selectedRule: 1
    }

    componentDidMount() {
        this.getRuleData(this.state.selectedRule);
    }

    getRuleData = (rule) => {
        fetchData(this.state.url).then((results) => {
            this.setState({ datas: results, selectedRule: rule });
        });
    }

    getEmailAddress = () => {
        return document.getElementById("emailAddress").value;
    }

    render() {
        const colors = this.props.colors;
        return (
            <Box m="20px">
                <Header title="Customer Transactiions" subtitle="View Customer Transactions" />
                <Box
                    display={isWidescreen() ? "grid" : ""}
                    gridTemplateColumns="repeat(12, 1fr)"
                    gridAutoRows="140px"
                    gap="20px"
                >
                    <Box
                        gridColumn={isWidescreen() ? 'span 6' : 'span 12'}
                        gridRow={isWidescreen() ? 'span 1' : 'span 1'}
                        backgroundColor={colors.primary[400]}
                        padding="30px"
                        className={"shadowed-box"}
                    >
                        <Box
                            display={isWidescreen() ? "grid" : ""}

                        >
                            <EmailButton csv={this.state.datas} csvName={this.props.cif}/>
                        </Box>
                    </Box>
                    <Box className={"shadowed-box"} sx={{ mt: isWidescreen() ? "0px" : "20px" }} gridColumn={isWidescreen() ? 'span 12' : 'span 12'} gridRow="span 4" backgroundColor={colors.primary[400]} overflow="auto">
                        <Box m="30px 30px 30px 30px">
                            <Table data={this.state.datas} isCustomerPage={true} />
                        </Box>
                    </Box>
                </Box>
                {/* <Header title="Customer Transactiions" subtitle="View Customer Transactions"/>
                <EmailButton csv={this.state.datas} csvName={this.props.cif}/>
                <Table data={this.state.datas} isCustomerPage={true}/> */}
            </Box>
        )
    }
}

export default withMyHook(Customer);