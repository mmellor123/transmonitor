import React from 'react';

const EMAIL_REGEX = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;
const ERROR_HEX = "#FFCCCC";

class CustomConfirmSendEmail extends React.Component {

  state = {
    email: "",
    validEmail: false,
    emailFocus: false
  }


  render() {
    return (
      <div className="custom-confirm-popup">
        {/* Popup content */}
        <div className="popup-content">
          <h2>Email Data</h2>
          <p>Type in your email and click <strong>Confirm</strong></p>

          <input
            input={this.state.email}
            onChange={(e) => this.setState({email: e.target.value, validEmail: EMAIL_REGEX.test(e.target.value)})} 
            id="email"
            required
            aria-invalid={this.state.validEmail ? "false" : "true"}
            style={{backgroundColor: !this.state.validEmail && this.state.emailFocus ? ERROR_HEX : ""}}
            onFocus={() => this.setState({emailFocus: true})} 
            onBlur={() => this.setState({emailFocus: false})} 
        />

          {/* Buttons */}
          <div className="buttons">
            <button className='popup-button popup-button-confirm' onClick={() => this.props.onConfirm(this.state.email)}>Confirm</button>
            <button className='popup-button popup-button-cancel' onClick={() => this.props.onCancel()}>Cancel</button>
          </div>
        </div>
      </div>
    );
  }
}

export default CustomConfirmSendEmail;