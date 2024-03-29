import React, {Component} from "react";
import {Box} from "@mui/material";
import Dropdown from 'react-bootstrap/Dropdown';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {faInfoCircle } from "@fortawesome/free-solid-svg-icons";
import {postData, BASE_URL} from "../common/functions.jsx";
import CustomConfirmPopup from './CustomConfirmPopup'; // Assuming the file path for CustomConfirmPopup
import CustomEditWhitelistPopup from './CustomEditWhitelistPopup'; // Assuming the file path for CustomConfirmPopup




const INTEGER_REGEX = /^\d+$/;
const WHITELIST_REGEX = /^[0-9]+(,[0-9]+)*$/;

const NAME_REGEX = /^[A-Za-z0-9 ]{5,15}$/;
const EMPTY_REGEX = /^$/


class Rule extends Component {
    
    state ={
        periodUnit: "Day",
        isNewCustomer: true,
        isNumberOfTrans: false,
        
        maxPerPeriod: "",
        validMaxPerPeriod: false,
        maxPerPeriodFocus: false,

        ruleName: "",
        validRuleName: false,
        ruleNameFocus: false,

        period: "",
        validPeriod: false,
        periodFocus: false,

        whitelist: [],
        validWhitelist: true,
        whitelistFocus: false,
        whitelistWithName: [],

        showPopup: false,

        showPopupWhitelist: false,

        filter: ""
        
    }

    componentDidMount(){
    }

    //Updates fields to have data for particular rule
    updateFields(data){
        postData(BASE_URL + "/get-customers-from-cif", {"cif": data.whitelist}, "POST").then((results) => {
            this.setState({
                periodUnit: data.period_unit, 
                period:data.period, 
                ruleName:data.name,
                maxPerPeriod:data.max_per_period,
                isNewCustomer:data.new_customer,
                isNumberOfTrans:data.number,
                whitelist: data.whitelist,
                whitelistWithName: results,
                validMaxPerPeriod: true,
                validRuleName: true,
                validPeriod: true,
                validWhitelist: true
            });
        });
    }

    componentDidUpdate(previousProps){
        if(this.props.endpoint === "/update-rule" && (previousProps.data !== this.props.data)){
            this.updateFields(this.props.data);
        }
    }

    handleFilter = (query) => {
        this.setState({filter: query})
    }
    

    handleSelectPeriodUnit = (unit) => {
        this.setState({periodUnit: unit})
    }

    handleSelectIsNewCustomer = (isNew) => {
        this.setState({isNewCustomer: isNew})
    }

    handleSelectAmountOrNumber= (isNumberOfTrans) => {
        this.setState({isNumberOfTrans: isNumberOfTrans})
    }

    setMaxPerPeriod = (value) => {
        this.setState({maxPerPeriod: value, validMaxPerPeriod: INTEGER_REGEX.test(value)});
    }

    setMaxPerPeriodFocus = (value) => {
        this.setState({maxPerPeriodFocus: value});
    }

    setRuleName = (value) => {
        this.setState({ruleName: value, validRuleName: NAME_REGEX.test(value)});
    }

    setRuleNameFocus = (value) => {
        this.setState({ruleNameFocus: value});
    }

    setPeriod = (value) => {
        this.setState({period: value, validPeriod: INTEGER_REGEX.test(value)});
    }

    setPeriodFocus = (value) => {
        this.setState({periodFocus: value});
    }

    setWhitelist = (value) => {
        this.setState({whitelist: value.split(","), validWhitelist: WHITELIST_REGEX.test(value) || EMPTY_REGEX.test(value)});
    }

    setWhitelistFocus = (value) => {
        this.setState({whitelistFocus: value});
    }

    ruleDescription = () => {
        if(!this.state.validMaxPerPeriod || !this.state.validPeriod || !this.state.validMaxPerPeriod){
            return "";
        }
        var description  = "More than ";
        if(this.state.isNumberOfTrans){
            description += this.state.maxPerPeriod + " transactions sent ";
        }
        else{
            description += "£" + this.state.maxPerPeriod+" sent ";
        }
        description += "in " + this.state.period + " " + this.state.periodUnit;
        return description;
    }

    resetFields = () =>{
        this.setState({validWhitelist: false, whitelist: false, validRuleName: false, validPeriod: false, validMaxPerPeriod: false, ruleName: "", period: "", maxPerPeriod: ""});
    }

    handleSubmit = () => {
        let payload = {
            name: this.state.ruleName,
            period: this.state.period,
            max_per_period: this.state.maxPerPeriod,
            period_unit: this.state.periodUnit,
            new_customer: this.state.isNewCustomer,
            number: this.state.isNumberOfTrans,
            whitelist: this.state.whitelist[0] ? this.state.whitelist : [0] 
        }
        if(this.props.endpoint ==="/update-rule"){
            payload['rule_id'] = this.props.ruleId
            postData(BASE_URL+this.props.endpoint, payload, "PUT");
        }
        else if(this.props.endpoint ==="/create-rule"){
            postData(BASE_URL+this.props.endpoint, payload, "POST");
        }
        this.props.navigate("/view-rules");
    }
    
      handleCancel = () => {
        this.setState({ showPopup: false }); // Close the popup after cancellation
      };

      handleCancelWhitelist = () => {
        this.setState({showPopupWhitelist: false});
      }

      handleDeleteWhitelist = (customer) => {
        var index = this.state.whitelist.indexOf(customer);
        console.log(index);
        if (index !== -1) {
            console.log("True")
            var arr = this.state.whitelist;
            arr.splice(index, 1)
            this.updateWhitelist(arr);
        }
      }

      updateWhitelist(arr){
        postData(BASE_URL + "/get-customers-from-cif", {"cif": arr}, "POST").then((results) => {
            this.setState({whitelist: arr, whitelistWithName: results})
        });
      }

      addCustomer = (cif) => {
        var arr = this.state.whitelist;
        arr.push(cif);
        postData(BASE_URL + "/get-customers-from-cif", {"cif": arr}, "POST").then((results) => {
            this.setState({whitelist: arr, whitelistWithName: results})
        });
      }

      getButtonClass(isEnabled){
        return isEnabled ? "popup-button-confirm" : "popup-button-disabled";
      }

      isInvalid(){
        return !this.state.validWhitelist || !this.state.validMaxPerPeriod || !this.state.validPeriod || !this.state.validRuleName;
      }


    render(){
        return (
            <Box>
                    {this.state.showPopupWhitelist && (
                        <CustomEditWhitelistPopup
                            onConfirm={this.handleSubmit}
                            onCancel={this.handleCancelWhitelist}
                            messageTitle="Rule Whitelist"
                            messageSubtitle={"Add customers to whitelist"}
                            whitelist={this.state.whitelist}
                            whitelistWithName={this.state.whitelistWithName}
                            onDeleteWhitelist={this.handleDeleteWhitelist}
                            addCustomer={this.addCustomer}
                            filter={this.state.filter}
                            onFilter={this.handleFilter}
                        />
                    )}

                    {this.state.showPopup && (
                        <CustomConfirmPopup
                            onConfirm={this.handleSubmit}
                            onCancel={this.handleCancel}
                            messageTitle={this.props.endpoint === "/create-rule" ? "Create Rule?" : "Save Changes?"}
                            messageSubtitle={this.props.endpoint === "/create-rule" ? "Are you sure you want to create rule?" : "Save changes to this rule?"}
                        />
                    )}    

                    <div style={{marginTop: "20px"}}>
                        <p className="rule-description"><FontAwesomeIcon icon={faInfoCircle}/> Description: <strong>{this.ruleDescription()}</strong></p>
                    </div>
                    <div>
                        <label>Name</label><br></br>
                        <input
                            autoComplete="none"
                            value={this.state.ruleName}
                            onFocus={() => this.setRuleNameFocus(true)} 
                            onBlur={() => this.setRuleNameFocus(false)} 
                            onChange={(e) => this.setRuleName(e.target.value)} 
                            required 
                            aria-invalid={this.state.validRuleName ? "false" : "true"} 
                            id="rule-name"
                            className={this.state.validRuleName ? "valid-box" : "invalid-box"}
                        />
                        <p id="rule-name-note" className={!this.state.validRuleName && this.state.ruleNameFocus ? "instructions" : "offscreen"}>
                            <FontAwesomeIcon icon={faInfoCircle}/>
                            Name of the rule as will be shown 
                        </p>
                    </div>
                    <div>
                        <label>Max per period</label><br></br>
                        <input
                            autoComplete="none"
                            value={this.state.maxPerPeriod}
                            onFocus={() => this.setMaxPerPeriodFocus(true)} 
                            onBlur={() => this.setMaxPerPeriodFocus(false)} 
                            onChange={(e) => this.setMaxPerPeriod(e.target.value)} 
                            required aria-invalid={this.state.validMaxPerPeriod ? "false" : "true"} 
                            id="max-per-period"
                            className={this.state.validMaxPerPeriod ? "valid-box" : "invalid-box"}
                        />
                        <p id="maxperprdnote" className={!this.state.validMaxPerPeriod && this.state.maxPerPeriodFocus ? "instructions" : "offscreen"}>
                            <FontAwesomeIcon icon={faInfoCircle}/>
                            Maximum customer is allowed to send. Must be an integer <br/>
                            If rule is set to 'Amount', this is the maximum amount of money the customer can send. <br />
                            If rule is set to 'Frequency', this is the maximum # of transactions a customer can send. <br/>
                        </p>
                    </div>
                    <div>
                        <label>Period</label><br></br>
                        <input
                            autoComplete="none"
                            value={this.state.period}
                            onFocus={() => this.setPeriodFocus(true)} 
                            onBlur={() => this.setPeriodFocus(false)} 
                            onChange={(e) => this.setPeriod(e.target.value)} 
                            required aria-invalid={this.state.validPeriod ? "false" : "true"} 
                            id="period"
                            className={this.state.validPeriod ? "valid-box" : "invalid-box"}
                        />
                        <p id="period-note" className={!this.state.validPeriod && this.state.periodFocus ? "instructions" : "offscreen"}>
                            <FontAwesomeIcon icon={faInfoCircle}/>
                            Number of 'Period Unit' to look between. Must be an integer <br/>
                            E.g. If set to 2 with 'Period Unit' set to 'week', then rule will look at data within 2 weeks 
                        </p>
                    </div>
                    <div style={{padding: "0px"}}>
                        <div >
                            <label>Period Unit</label><br></br>
                            <Dropdown id="period-unit">
                                <Dropdown.Toggle className="create-rule-dropdown" variant="secondary"  size="sm">
                                        {this.state.periodUnit}
                                </Dropdown.Toggle>
                                <Dropdown.Menu variant="dark">
                                    <Dropdown.Item onClick={() => this.handleSelectPeriodUnit("Hour")}>Hour</Dropdown.Item>
                                    <Dropdown.Item onClick={() => this.handleSelectPeriodUnit("Day")}>Day</Dropdown.Item>
                                    <Dropdown.Item onClick={() => this.handleSelectPeriodUnit("Week")}>Week</Dropdown.Item>
                                    <Dropdown.Item onClick={() => this.handleSelectPeriodUnit("Month")}>Month</Dropdown.Item>
                                </Dropdown.Menu>
                            </Dropdown>
                        </div>
                        <div >
                            <label>New Customer?</label><br></br>
                            <Dropdown id="is-new-customer">
                                <Dropdown.Toggle className="create-rule-dropdown" variant="secondary"  size="sm">
                                        {this.state.isNewCustomer ? "Yes" : "No"}
                                </Dropdown.Toggle>
                                <Dropdown.Menu variant="dark">
                                    <Dropdown.Item onClick={() => this.handleSelectIsNewCustomer(true)}>Yes</Dropdown.Item>
                                    <Dropdown.Item onClick={() => this.handleSelectIsNewCustomer(false)}>No</Dropdown.Item>
                                </Dropdown.Menu>
                            </Dropdown>
                        </div>
                        <div >
                            <label>Amount or Frequency?</label><br></br>
                            <Dropdown id="is-num-of-trans">
                                <Dropdown.Toggle className="create-rule-dropdown" variant="secondary"  size="sm">
                                        {this.state.isNumberOfTrans ? "Frequency" : "Amount"}
                                </Dropdown.Toggle>
                                <Dropdown.Menu variant="dark">
                                    <Dropdown.Item onClick={() => this.handleSelectAmountOrNumber(false)}>Amount</Dropdown.Item>
                                    <Dropdown.Item onClick={() => this.handleSelectAmountOrNumber(true)}>Frequency</Dropdown.Item>
                                </Dropdown.Menu>
                            </Dropdown>
                        </div>
                    </div>
                    <div>
                        {/* <label>Whitelist</label> */}
                        <br/>
                        {/* <textarea
                            value={this.state.whitelist}
                            onFocus={() => this.setWhitelistFocus(true)} 
                            onBlur={() => this.setWhitelistFocus(false)} 
                            onChange={(e) => this.setWhitelist(e.target.value)} 
                            required aria-invalid={this.state.validWhitelist ? "false" : "true"} 
                            id="whitelist"
                            style={{width: "150px", backgroundColor: !this.state.validWhitelist && this.state.whitelistFocus ? ERROR_HEX : ""}}
                        /> */}
                        <button onClick={() => this.setState({showPopupWhitelist: true})} className="create-rule-submit" style={{margin: "0px"}}>
                            Edit Whitelist
                        </button>
                        {/* <p id="whitelist-note" className={"instructions"}>
                            <FontAwesomeIcon icon={faInfoCircle}/>
                            Enter each CIF number, seperated by comma.
                            All customers will be whitelist if field left blank.
                        </p> */}
                    </div>
                    <div style={{paddingTop: "10px"}}>
                        <button onClick={() => this.setState({ showPopup: true})} className={"popup-button "+this.getButtonClass(!this.isInvalid())} disabled={this.isInvalid() ? true : false}>
                            {this.props.buttonTitle}
                        </button>
                    </div>
            </Box>
        )
    }
}

export default Rule;
