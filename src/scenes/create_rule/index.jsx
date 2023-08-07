import React, {Component} from "react";
import {Box} from "@mui/material";
import Header from "../../components/Header";
import Rule from "../../components/Rule";
import { useNavigate } from "react-router-dom";

function withMyHook(Component){
    return function WrappedComponent(props){
        const navigate = useNavigate();
        return <Component {...props} navigate={navigate}/>
    }
}

class CreateRule extends Component {

    render(){
        return (
            <Box m="20px">
                <Header title="Create Rule" subtitle="Create your own custom rule"/>
                <Rule navigate={this.props.navigate} buttonTitle="Save" endpoint="/create-rule"/>
            </Box>
        )
    }
}

export default withMyHook(CreateRule);
