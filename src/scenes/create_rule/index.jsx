import React, {Component} from "react";
import {Box, useTheme} from "@mui/material";
import {tokens} from "../../theme";
import Header from "../../components/Header";
import Rule from "../../components/Rule";
import { useNavigate } from "react-router-dom";

function withMyHook(Component){
    return function WrappedComponent(props){
        const navigate = useNavigate();
        const theme = useTheme();
        const colors = tokens(theme.palette.mode);
        return <Component {...props} navigate={navigate} colors={colors}/>
    }
}

class CreateRule extends Component {

    render(){
        const colors = this.props.colors;
        return (
            <Box m="20px">
                <Header title="Create Rule" subtitle="Create your own custom rule"/>
                <Box
                    backgroundColor={colors.primary[400]}
                    padding="30px"
                    className={"shadowed-box"}
                    width="50%"
                    minWidth="300px"
                    >
                    <Rule navigate={this.props.navigate} buttonTitle="Create" endpoint="/create-rule"/>
                </Box>
            </Box>
        )
    }
}

export default withMyHook(CreateRule);
