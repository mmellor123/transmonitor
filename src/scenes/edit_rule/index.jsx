import React, {Component} from "react";
import {Box} from "@mui/material";
import Header from "../../components/Header";
import Rule from "../../components/Rule";
import { useSearchParams } from "react-router-dom";
import {fetchData, BASE_URL, deleteRule} from "../../common/functions.jsx";
import {Link} from "react-router-dom";


function withMyHook(Component){
    return function WrappedComponent(props){
        const [searchParams, setSearchParams] = useSearchParams();
        return <Component {...props} searchParams={searchParams}/>
    }
}

class EditRule extends Component {
    
    state={
        data: {}
    }

    componentDidMount(){
        fetchData(BASE_URL + "/get-rule?rule_id="+this.props.searchParams.get("id")).then((results) => {
            this.setState({data: results});
        })
    }
    
    handleDelete = (rule_id) => {
        deleteRule(BASE_URL + "/delete-rule", {"rule_id": rule_id}).then((results) => {
            console.log("Deleted Rule!");
        })
    }

    render(){
        return (
            <Box m="20px">
                <Header title="Edit Rule" subtitle="Edit an existing rule here"/>
                <Rule buttonTitle="Save Changes" endpoint="/update-rule" ruleId={this.props.searchParams.get("id")} data={this.state.data}/>
                
                <Link to={"/view-rules"}>
                    <button className="cancel-button">Cancel</button>
                </Link><br/>

                <Link to={"/view-rules"}>
                    <button onClick={() => this.handleDelete(this.props.searchParams.get("id"))} className="delete-rule-button">Delete</button>
                </Link>
            </Box>
        )
    }
}

export default withMyHook(EditRule);;