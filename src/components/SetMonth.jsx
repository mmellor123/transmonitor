import React, {Component} from "react";
import {Box} from "@mui/material";
import Dropdown from 'react-bootstrap/Dropdown';


class SetMonth extends Component{
    

    render(){
        return (
            <Box>
                <Box display="flex" paddingBottom="10px">
                                <Box paddingRight="5px">
                                    <Dropdown>
                                        <Dropdown.Toggle id="nav-dropdown" variant="secondary"  size="sm">
                                            {this.props.monthStr}
                                        </Dropdown.Toggle>
                                        <Dropdown.Menu variant="dark">
                                            <Dropdown.Item onClick={() => this.props.handleSelectMonth('01', 'Jan')}>Jan</Dropdown.Item>
                                            <Dropdown.Item onClick={() => this.props.handleSelectMonth('02', 'Feb')}>Feb</Dropdown.Item>
                                            <Dropdown.Item onClick={() => this.props.handleSelectMonth('03', 'Mar')}>Mar</Dropdown.Item>
                                            <Dropdown.Item onClick={() => this.props.handleSelectMonth('04', 'Apr')}>Apr</Dropdown.Item>
                                            <Dropdown.Item onClick={() => this.props.handleSelectMonth('05', 'May')}>May</Dropdown.Item>
                                            <Dropdown.Item onClick={() => this.props.handleSelectMonth('06', 'Jun')}>Jun</Dropdown.Item>
                                            <Dropdown.Item onClick={() => this.props.handleSelectMonth('07', 'Jul')}>Jul</Dropdown.Item>
                                            <Dropdown.Item onClick={() => this.props.handleSelectMonth('08', 'Aug')}>Aug</Dropdown.Item>
                                            <Dropdown.Item onClick={() => this.props.handleSelectMonth('09', 'Sep')}>Sep</Dropdown.Item>
                                            <Dropdown.Item onClick={() => this.props.handleSelectMonth('10', 'Oct')}>Oct</Dropdown.Item>
                                            <Dropdown.Item onClick={() => this.props.handleSelectMonth('11', 'Nov')}>Nov</Dropdown.Item>
                                            <Dropdown.Item onClick={() => this.props.handleSelectMonth('12', 'Dec')}>Dec</Dropdown.Item>
                                        </Dropdown.Menu>
                                    </Dropdown>
                                </Box>
                                <Box paddingRight="5px">
                                    <Dropdown>
                                        <Dropdown.Toggle id="nav-dropdown" variant="secondary"  size="sm">
                                            {this.props.selectedYear}
                                        </Dropdown.Toggle>
                                        <Dropdown.Menu variant="dark">
                                            <Dropdown.Item onClick={() => this.props.handleSelectYear(2021)}>2021</Dropdown.Item>
                                            <Dropdown.Item onClick={() => this.props.handleSelectYear(2022)}>2022</Dropdown.Item>
                                            <Dropdown.Item onClick={() => this.props.handleSelectYear(2023)}>2023</Dropdown.Item>
                                        </Dropdown.Menu>
                                    </Dropdown>
                                </Box>
                                {/* <button class="myButton" onClick={this.props.handleSearch}>Search</button> */}
                </Box>
            </Box>
        )
    }

}
export default SetMonth;
