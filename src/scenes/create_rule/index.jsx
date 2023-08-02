import React, {Component} from "react";
import {Box} from "@mui/material";
import Header from "../../components/Header";
import Rule from "../../components/Rule";


class CreateRule extends Component {

    render(){
        return (
            <Box m="20px">
                <Header title="Create Rule" subtitle="Create your own custom rule"/>
                <Rule buttonTitle="Save" endpoint="/create-rule"/>
            </Box>
        )
    }
}

export default CreateRule;
