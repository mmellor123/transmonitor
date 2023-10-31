import React, {Component} from "react";
import {Box, useTheme} from "@mui/material";
import { tokens} from "../../theme";
import Header from "../../components/Header";
import Rule from "../../components/Rule";
import { useSearchParams } from "react-router-dom";
import {fetchData, BASE_URL, deleteRule} from "../../common/functions.jsx";
import {Link} from "react-router-dom";
import CustomConfirmPopup from '../../components/CustomConfirmPopup'; // Assuming the file path for CustomConfirmPopup
import { useNavigate } from "react-router-dom";



function withMyHook(Component){
    return function WrappedComponent(props){
        const [searchParams] = useSearchParams();
        const navigate = useNavigate();
        const theme = useTheme();
        const colors = tokens(theme.palette.mode);
        return <Component {...props} searchParams={searchParams} navigate={navigate} colors={colors}/>
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
        const colors = this.props.colors;
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
                <Header title="Edit Rule" subtitle="Edit an existing rule"/>
                
                <Box
                    backgroundColor={colors.primary[400]}
                    padding="30px"
                    className={"shadowed-box"}
                    width="50%"
                    minWidth="300px"
                    >
                    <Rule navigate={this.props.navigate} buttonTitle="Save Changes" endpoint="/update-rule" ruleId={this.props.searchParams.get("id")} data={this.state.data}/>
                    <Link to={"/view-rules"}>
                        <button className="cancel-button">Cancel</button>
                    </Link><br/>

                    <button onClick={() => this.setState({ showPopup: true})} className="delete-rule-button">Delete</button>
                </Box>
            </Box>
        )
    }
}

export default withMyHook(EditRule);