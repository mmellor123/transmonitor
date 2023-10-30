import React from 'react';
import { faInfoCircle } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import InventoryApp from "./InventoryApp"
import { fetchData, postData, BASE_URL } from '../common/functions';




const INTEGER_REGEX = /^[0-9]{8,15}$/;

class CustomEditWhitelistPopup extends React.Component {

  state = {
    cif: "",
    validCif: false,
    cifFocus: false,
    cifList: []
  }


  componentDidMount() {
    fetchData(BASE_URL + "/get-customers").then((results) => {
      this.setState({ cifList: results })
    });
  }

  componentDidUpdate() {
  }


  handleDeleteWhitelist = (customer) => {
  }

  handleAddCustomer = () => {
    if (this.props.whitelist.includes(this.state.cif)) {
      window.alert("CIF already added")
    }

    else {
      this.props.addCustomer(this.state.cif)
      this.setState({ cif: "", validCif: false })
    }
  }

  doesCustomerExist(cif) {
    postData(BASE_URL + "/get-customers-from-cif", { "cif": [cif] }, "POST").then((results) => {
      if (results.length === 1) {
        return true;
      }
      else {
        return false;
      }
    });
  }

  handleChangeCif = (cif) => {
    if (INTEGER_REGEX.test(cif) && !this.props.whitelist.includes(cif)) {
      postData(BASE_URL + "/get-customers-from-cif", { "cif": [cif] }, "POST").then((results) => {
        var result = false;
        if (results.length === 1) {
          result = true;
        }
        this.setState({ cif: cif, validCif: result });
      });
    }
    else {
      this.setState({ cif: cif, validCif: false });
    }
  }



  render() {
    const { onCancel, messageTitle, messageSubtitle, whitelist, whitelistWithName, onDeleteWhitelist, filter, onFilter } = this.props;

    return (
      <div className="custom-confirm-popup">
        {/* Popup content */}
        <div style={{ width: "700px" }} className="popup-content">
          <h2>{messageTitle}</h2>
          <p>{messageSubtitle}</p>

          <InventoryApp validCif={this.state.validCif} cif={this.state.cif} onChange={this.handleChangeCif} onAdd={this.handleAddCustomer} listWithName={whitelistWithName} list={whitelist} onDelete={onDeleteWhitelist} search={filter} onFilter={onFilter} cifList={this.state.cifList} />

          {/* Search for CIF to add */}
          <div style={{ paddingTop: "10px", paddingBottom: "20px" }}>
            
            <p id="cif-note" className={!this.state.validCif ? "instructions" : "offscreen"}>
              <FontAwesomeIcon icon={faInfoCircle} />
              CIF must be a 8 digit number.
              Each CIF must be unique.
            </p>
          </div>

          {/* Buttons */}
          <div className="buttons">
            <button className='popup-button popup-button-confirm' onClick={() => onCancel()}>Close</button>
          </div>
        </div>
      </div>
    );
  }
}

export default CustomEditWhitelistPopup;