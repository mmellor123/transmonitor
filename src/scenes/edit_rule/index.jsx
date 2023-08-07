import React, {Component} from "react";
import {Box} from "@mui/material";
import Header from "../../components/Header";
import Rule from "../../components/Rule";
import { useSearchParams } from "react-router-dom";
import {fetchData, BASE_URL, deleteRule} from "../../common/functions.jsx";
import {Link} from "react-router-dom";
import CustomConfirmPopup from '../../components/CustomConfirmPopup'; // Assuming the file path for CustomConfirmPopup
import { useNavigate } from "react-router-dom";



function withMyHook(Component){
    return function WrappedComponent(props){
        const [searchParams, setSearchParams] = useSearchParams();
        const navigate = useNavigate();
        return <Component {...props} searchParams={searchParams} navigate={navigate}/>
    }
}

class EditRule extends Component {
    
    state={
        data: {},
        showPopup: false
    }

    handleConfirm = () => {
        console.log('Selection confirmed!');
        this.handleDelete(this.props.searchParams.get("id"));
        this.setState({ showPopup: false }); // Close the popup after confirmation
        this.props.navigate("/view-rules");
    };
    
      handleCancel = () => {
        console.log('Selection canceled!');
        this.setState({ showPopup: false }); // Close the popup after cancellation
      };

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
                {this.state.showPopup && (
                    <CustomConfirmPopup
                        onConfirm={this.handleConfirm}
                        onCancel={this.handleCancel}
                        messageTitle="Confirm Delete?"
                        messageSubtitle="Are you sure you want to delete this rule?"
                    />
                )}
                <Header title="Edit Rule" subtitle="Edit an existing rule here"/>
                <Rule navigate={this.props.navigate} buttonTitle="Save Changes" endpoint="/update-rule" ruleId={this.props.searchParams.get("id")} data={this.state.data}/>
                
                <Link to={"/view-rules"}>
                    <button className="cancel-button">Cancel</button>
                </Link><br/>

                <button onClick={() => this.setState({ showPopup: true})} className="delete-rule-button">Delete</button>
            </Box>
        )
    }
}

export default withMyHook(EditRule);