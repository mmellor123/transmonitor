import { Box, Typography, useTheme } from "@mui/material";
import Header from "../../components/Header";
import { tokens } from "../../theme";
import BarChart from "../../components/BarChart";
import React, { Component } from "react";
import { getDates, monthIndexToString, debounce, MAX_WIDTH, isWidescreen } from "../../common/functions.jsx";
import SetMonth from "../../components/SetMonth";




function withMyHook(Component) {
    return function WrappedComponent(props) {
        const theme = useTheme();
        const colors = tokens(theme.palette.mode);
        return <Component {...props} colors={colors} />
    }
}

class Bar extends Component {

    constructor() {
        super();
        this.state = {
            numberOfMonthsAgo: 0,
            selectedYear: 2023,
        }
        this.debounceHandleResize = this.debounceHandleResize.bind(this);
    }

    componentDidMount() {
        window.addEventListener("resize", this.debounceHandleResize);
        const d = new Date();
        let [startDate, endDate] = getDates(d.getFullYear(), d.getMonth());
        this.setState({ startDate: startDate, endDate: endDate, selectedMonth: d.getMonth(), selectedYear: d.getFullYear() });
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
                <Header title="Bar Chart" subtitle="Simple Bar Chart" />
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
                        {this.state.startDate && this.state.endDate ? <BarChart startDate={this.state.startDate} endDate={this.state.endDate} isDashboard={false} numberOfMonthsAgo={this.state.numberOfMonthsAgo} /> : null}
                    </Box>
                </Box>
            </Box>
        )
    }
}

export default withMyHook(Bar);