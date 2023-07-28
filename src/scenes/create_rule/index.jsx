import React, {Component} from "react";
import {Box} from "@mui/material";
import Header from "../../components/Header";
import Dropdown from 'react-bootstrap/Dropdown';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheck, faTimes, faInfoCircle } from "@fortawesome/free-solid-svg-icons";
import {postData, BASE_URL} from "../../common/functions.jsx";
import Rule from "../../components/Rule";



const INTEGER_REGEX = /^\d+$/;
const NAME_REGEX = /^[A-Za-z0-9]$/;
const ERROR_HEX = "#FFCCCC"


class CreateRule extends Component {
    
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
        this.setState({validRuleName: false, validPeriod: false, validMaxPerPeriod: false, ruleName: "", period: "", maxPerPeriod: ""});
    }

    handleSubmit = () => {
        let payload = {
            name: this.state.ruleName,
            period: this.state.period,
            max_per_period: this.state.maxPerPeriod,
            period_unit: this.state.periodUnit,
            new_customer: this.state.isNewCustomer,
            number: this.state.isNumberOfTrans
        }
        postData(BASE_URL+"/create-rule", payload, "POST");
        this.resetFields();
    }


    render(){
        return (
            <Box m="20px">
                <Header title="Create Rule" subtitle="Create your own custom rule"/>
                {/*
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
                                <Dropdown.Toggle className="create-rule-button" variant="secondary"  size="sm">
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
                            <label>New Customer</label><br></br>
                            <Dropdown id="is-new-customer">
                                <Dropdown.Toggle className="create-rule-button" variant="secondary"  size="sm">
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
                                <Dropdown.Toggle className="create-rule-button" variant="secondary"  size="sm">
                                        {this.state.isNumberOfTrans ? "Frequency" : "Amount"}
                                </Dropdown.Toggle>
                                <Dropdown.Menu variant="dark">
                                    <Dropdown.Item onClick={() => this.handleSelectAmountOrNumber(false)}>Amount</Dropdown.Item>
                                    <Dropdown.Item onClick={() => this.handleSelectAmountOrNumber(true)}>Frequency</Dropdown.Item>
                                </Dropdown.Menu>
                            </Dropdown>
                        </div>
                    </div>
                    <div style={{marginTop: "20px"}}>
                        <h3>{this.ruleDescription()}</h3>
                    </div>
                    <button onClick={() => this.handleSubmit()} className="create-rule-submit" disabled={!this.state.validMaxPerPeriod || !this.state.validPeriod || !this.state.validRuleName ? true : false}>
                        Create Rule
                    </button> */}
                <Rule buttonTitle="Save" endpoint="/create-rule"/>
            </Box>
        )
    }
}

export default CreateRule;
