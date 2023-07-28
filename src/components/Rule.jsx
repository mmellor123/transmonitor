import React, {Component} from "react";
import {Box} from "@mui/material";
import Header from "../components/Header";
import Dropdown from 'react-bootstrap/Dropdown';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheck, faTimes, faInfoCircle } from "@fortawesome/free-solid-svg-icons";
import {postData, BASE_URL} from "../common/functions.jsx";



const INTEGER_REGEX = /^\d+$/;
const WHITELIST_REGEX = /^[0-9]+(,[0-9]+)*$/;

const NAME_REGEX = /^([A-Za-z0-9 _]*[A-Za-z0-9][A-Za-z0-9 _]){4,10}$/;
const ERROR_HEX = "#FFCCCC"
const EMPTY_REGEX = /^$/


class Rule extends Component {
    
    state ={
        periodUnit: "Day",
        isNewCustomer: true,
        isNumberOfTrans: false,
        // maxPerPeriod: {value: "", isValid: false}
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
        whitelistFocus: false
    }

    //TODO MAKE STATE UPDATE BASED ON IF ITS EDIT OR CREATE RULE
    componentDidMount(){
    }

    //Updates fields to have data for particular rule
    updateFields(data){
        console.log("Whitelist: ", data.whitelist)
        this.setState({
            periodUnit: data.period_unit, 
            period:data.period, 
            ruleName:data.name,
            maxPerPeriod:data.max_per_period,
            isNewCustomer:data.new_customer,
            isNumberOfTrans:data.number,
            whitelist: data.whitelist,
            validMaxPerPeriod: true,
            validRuleName: true,
            validPeriod: true,
            validWhitelist: true
        });

    }

    componentDidUpdate(previousProps){
        if(this.props.endpoint === "/update-rule" && (previousProps.data !== this.props.data)){
            this.updateFields(this.props.data);
        }
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
        console.log("Test1")
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
    }


    render(){
        return (
            <Box>
                    <div style={{marginTop: "20px"}}>
                        <p className="rule-description"><FontAwesomeIcon icon={faInfoCircle}/> Description: <strong>{this.ruleDescription()}</strong></p>
                    </div>
                    <div>
                        <label>Name</label><br></br>
                        <input 
                            value={this.state.ruleName}
                            onFocus={() => this.setRuleNameFocus(true)} 
                            onBlur={() => this.setRuleNameFocus(false)} 
                            onChange={(e) => this.setRuleName(e.target.value)} 
                            required 
                            aria-invalid={this.state.validRuleName ? "false" : "true"} 
                            id="rule-name"
                            style={{backgroundColor: !this.state.validRuleName && this.state.ruleNameFocus ? ERROR_HEX : ""}}
                        />
                        <p id="rule-name-note" className={!this.state.validRuleName && this.state.ruleNameFocus ? "instructions" : "offscreen"}>
                            <FontAwesomeIcon icon={faInfoCircle}/>
                            Name of the rule as will be shown 
                        </p>
                    </div>
                    <div>
                        <label>Max per period</label><br></br>
                        <input 
                            value={this.state.maxPerPeriod}
                            onFocus={() => this.setMaxPerPeriodFocus(true)} 
                            onBlur={() => this.setMaxPerPeriodFocus(false)} 
                            onChange={(e) => this.setMaxPerPeriod(e.target.value)} 
                            required aria-invalid={this.state.validMaxPerPeriod ? "false" : "true"} 
                            id="max-per-period"
                            style={{backgroundColor: !this.state.validMaxPerPeriod && this.state.maxPerPeriodFocus ? ERROR_HEX : ""}}
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
                            value={this.state.period}
                            onFocus={() => this.setPeriodFocus(true)} 
                            onBlur={() => this.setPeriodFocus(false)} 
                            onChange={(e) => this.setPeriod(e.target.value)} 
                            required aria-invalid={this.state.validPeriod ? "false" : "true"} 
                            id="period"
                            style={{backgroundColor: !this.state.validPeriod && this.state.periodFocus ? ERROR_HEX : ""}}
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
                        <label>Whitelist</label><br></br>
                        <textarea
                            value={this.state.whitelist}
                            onFocus={() => this.setWhitelistFocus(true)} 
                            onBlur={() => this.setWhitelistFocus(false)} 
                            onChange={(e) => this.setWhitelist(e.target.value)} 
                            required aria-invalid={this.state.validWhitelist ? "false" : "true"} 
                            id="whitelist"
                            style={{width: "150px", backgroundColor: !this.state.validWhitelist && this.state.whitelistFocus ? ERROR_HEX : ""}}
                        />
                        <p id="whitelist-note" className={"instructions"}>
                            <FontAwesomeIcon icon={faInfoCircle}/>
                            Enter each CIF number, seperated by comma.
                            All customers will be whitelist if field left blank.
                        </p>
                    </div>
                    <button onClick={() => this.handleSubmit()} className="create-rule-submit" disabled={!this.state.validWhitelist || !this.state.validMaxPerPeriod || !this.state.validPeriod || !this.state.validRuleName ? true : false}>
                        {this.props.buttonTitle}
                    </button>
            </Box>
        )
    }
}

export default Rule;
