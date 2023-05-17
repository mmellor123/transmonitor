import React, {Component} from "react";
import {Box} from "@mui/material";


class ChangeMonth extends Component{
    

    render(){
        return (
            <Box>
                <button class="myButton" onClick={this.props.handlePreviousMonthClick}>LAST MONTH</button>
                <button class="myButton"  onClick={this.props.handleNextMonthClick}>NEXT MONTH</button>
            </Box>
        )
    }

}
export default ChangeMonth;