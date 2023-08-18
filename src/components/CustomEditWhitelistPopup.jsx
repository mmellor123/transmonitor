import React from 'react';
import RemoveIcon from '@mui/icons-material/Remove';
import {faInfoCircle } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import InventoryApp from "./InventoryApp"
import { fetchData, postData, BASE_URL} from '../common/functions';




const INTEGER_REGEX = /^[0-9]{8,15}$/;
const ERROR_HEX = "#FFCCCC"


class CustomEditWhitelistPopup extends React.Component {

  state = {
    cif: "",
    validCif: false,
    cifFocus: false,
    cifList: []
  }


  componentDidMount(){
    fetchData(BASE_URL + "/get-customers").then((results) => {
      this.setState({cifList: results})
    });
  }

  componentDidUpdate(){
  }


  handleDeleteWhitelist = (customer) =>{
  }

  handleAddCustomer = () => {
    if(this.props.whitelist.includes(this.state.cif)){
      window.alert("CIF already added")
    }

    else{
      this.props.addCustomer(this.state.cif)
      this.setState({cif: "", validCif: false})
    }
  }

  doesCustomerExist(cif) {
    console.log("Checking if customer exists")
    postData(BASE_URL + "/get-customers-from-cif", {"cif": [cif]}, "POST").then((results) => {
      if(results.length === 1){
        console.log("True")
        return true;
      }
      else{
        return false;
      }
  });
  }

  handleChangeCif =(cif) =>{
    if(INTEGER_REGEX.test(cif) && !this.props.whitelist.includes(cif)){
      postData(BASE_URL + "/get-customers-from-cif", {"cif": [cif]}, "POST").then((results) => {
        var result = false;
        if(results.length === 1){
          var result = true;
        }
        console.log(results)
        this.setState({cif: cif, validCif: result});
      });
    }
    else{
      this.setState({cif:cif, validCif: false});
    }
  }



  render() {
    const {onCancel, messageTitle, messageSubtitle, whitelist, whitelistWithName, onDeleteWhitelist, filter, onFilter} = this.props;

    return (
      <div className="custom-confirm-popup">
        {/* Popup content */}
        <div style={{width: "700px"}} className="popup-content">
          <h2>{messageTitle}</h2>
          <p>{messageSubtitle}</p>

          {/* Field to look at whitelist so far */}
          {/* <div className='grid-container'>

            {this.props.whitelist.map((customer) => (
              <div className='item1'>
                <div onClick={() => {this.props.onDeleteWhitelist(customer)}} style={{cursor: "pointer", position: "absolute", right: 10}}>
                    <RemoveIcon style={{fontSize: "large"}}/>
                </div>
                <div>
                    {customer}
                </div>
              </div> 
            ))}
          </div> */}
          <InventoryApp validCif={this.state.validCif} cif={this.state.cif} onChange={this.handleChangeCif} onAdd={this.handleAddCustomer} listWithName={whitelistWithName} list={whitelist} onDelete={onDeleteWhitelist} search={filter} onFilter={onFilter} cifList={this.state.cifList}/>

          {/* Search for CIF to add */}
          <div style={{paddingTop: "10px", paddingBottom: "20px"}}>
             {/* <input
              value={this.state.cif}
              onChange={(e) => this.handleChangeCif(e.target.value)}
              onBlur={() => {this.setState({cifFocus: false})}}
              onFocus={() => {this.setState({cifFocus: true})}}
              className={this.state.validCif ? "valid-box" : "invalid-box"}
             />
             <button disabled={!this.state.validCif? true : false} className='popup-button popup-button-confirm' style={{paddingTop: "5px", paddingBottom: "5px"}} onClick={() => this.handleAddCustomer()}>Add</button> */}
              <p id="cif-note" className={!this.state.validCif ? "instructions" : "offscreen"}>
                <FontAwesomeIcon icon={faInfoCircle}/>
                    CIF must be a 8 digit number.
                    Each CIF must be unique.
              </p>
          </div>

          {/* Buttons */}
          <div className="buttons">
            <button className='popup-button popup-button-confirm' onClick={() => onCancel()}>Close</button>
            {/* <button className='popup-button popup-button-cancel' onClick={() => this.props.onCancel()}>Cancel</button> */}
          </div>
        </div>
      </div>
    );
  }
}

export default CustomEditWhitelistPopup;