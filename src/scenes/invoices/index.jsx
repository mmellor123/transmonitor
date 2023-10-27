import { Box, useTheme, Typography } from "@mui/material";
import { tokens } from "../../theme";
import React, { Component } from "react";
import { getDates, monthIndexToString, fetchData, BASE_URL, debounce, isWidescreen} from "../../common/functions.jsx";
import Dropdown from 'react-bootstrap/Dropdown';
import Transactions from "../../components/Transactions";
import Header from "../../components/Header";
import SetMonth from "../../components/SetMonth";



function withMyHook(Component) {
    return function WrappedComponent(props) {
        const theme = useTheme();
        const colors = tokens(theme.palette.mode);
        return <Component {...props} theme={theme} colors={colors} />
    }
}

const RULES_URL = BASE_URL + '/get-rules'

class Invoices extends Component {

    constructor() {
        super();
        this.state = {
            numberOfMonthsAgo: 0,
            rules: [],
            WindowSize: window.innerWidth
        }
        this.debounceHandleResize = this.debounceHandleResize.bind(this);
    }


    componentDidMount() {
        window.addEventListener("resize", this.debounceHandleResize);
        this.getRules();
    }

    handleSelectMonth = (month, monthStr) => {
        this.setState({ selectedMonth: month, monthStr: monthStr });
    }

    handleSelectYear = (year) => {
        this.setState({ selectedYear: year });
    }

    handleSearch = () => {
        let [startDate, endDate] = getDates(this.state.selectedYear, this.state.selectedMonth);
        this.setState({ startDate: startDate, endDate: endDate });
    }

    handleSelectRule = (rule, ruleName) => {
        this.setState({ rule: rule, ruleName: ruleName });
    }

    getRules = () => {
        const d = new Date();
        let [startDate, endDate] = getDates(d.getFullYear(), d.getMonth());
        this.setState({ startDate: startDate, endDate: endDate, selectedMonth: d.getMonth(), selectedYear: d.getFullYear() });
        fetchData(RULES_URL).then((results) => {
            this.getRuleData(startDate, endDate, results);
        });
    }

    getRuleData = (startDate, endDate, r) => {
        if (r.length === 0) {
            return
        }
        const ruleName = r[0]["name"]
        const rule = r[0]["id"]
        this.setState({ isLoading: true })
        fetchData(this.state.url + "start=" + startDate + "T00:00:00&end=" + endDate + "T00:00:00&rule=" + rule).then((results) => {
            this.setState({ datas: results, isLoading: false, rule: rule, ruleName: ruleName, rules: r });
        });
    }

    handleResize = () => {
        this.setState({ WindowSize: window.innerWidth })
    }

    debounceHandleResize(WindowSize, event) {
        debounce(this.handleResize(), 1000)
    }

    render() {
        const colors = this.props.colors;
        return (
            <Box m="20px">
                <Header title="Transactions" subtitle="Transactions breaking rules" />
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
                            <Box sx={{ pb: "20px" }} gridColumn="span 5">
                                <Typography variant="h5" fontWeight="600" color={colors.grey[100]}>
                                    OPTIONS
                                </Typography>
                            </Box>
                            <Box gridColumn="span 1" gridRow="span 1" paddingBottom={"20px"}>
                                <Typography fontWeight="strong" color={"black"}>Rule</Typography>
                                <Dropdown>
                                    <Dropdown.Toggle id="nav-dropdown" variant="secondary" size="sm">
                                        {this.state.ruleName ? this.state.ruleName : "Select Rule"}
                                    </Dropdown.Toggle>
                                    <Dropdown.Menu variant="dark">
                                        {this.state.rules.map((rule, index) => {
                                            return <Dropdown.Item onClick={() => this.handleSelectRule(rule.id, rule.name)}>{rule.name}</Dropdown.Item>
                                        })}
                                    </Dropdown.Menu>
                                </Dropdown>
                            </Box>
                            <Box gridColumn="span 3" gridRow="span 2" paddingBottom={"20px"}>
                                <Typography color={"black"}>Date</Typography>
                                <SetMonth handleSearch={this.handleSearch} handleSelectYear={this.handleSelectYear} handleSelectMonth={this.handleSelectMonth} monthStr={monthIndexToString(this.state.selectedMonth)} selectedYear={this.state.selectedYear} />
                            </Box>
                            <Box gridColumn="span 1" gridRow="span 1">
                                <Typography>Search</Typography>
                                <button onClick={this.handleSearch} className="myButton">SEARCH</button>
                            </Box>
                        </Box>
                    </Box>
                    <Box className={"shadowed-box"} sx={{ mt: isWidescreen() ? "0px" : "20px" }} gridColumn={isWidescreen() ? 'span 12' : 'span 12'} gridRow="span 4" backgroundColor={colors.primary[400]} overflow="auto">
                        <Box m="30px 30px 30px 30px">
                            {this.state.startDate ? <Transactions rule={this.state.rule} startDate={this.state.startDate} endDate={this.state.endDate} isDashboard={false} numberOfMonthsAgo={this.state.numberOfMonthsAgo} /> : null}
                        </Box>
                    </Box>
                </Box>
            </Box>
        )
    }

}

export default withMyHook(Invoices);