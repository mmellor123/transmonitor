import React from 'react';
import CustomConfirmSendEmail from './CustomConfirmSendEmail';
import {sendEmail, jsonToCSV} from "../common/functions.jsx";


class EmailButton extends React.Component {

  state = {
    showPopup: false
  }

  handleCancel = () => {
    this.setState({showPopup: false});
  }

  handleConfirm = (email) => {
    sendEmail(email, jsonToCSV(this.props.csv), this.props.csvName)
    this.setState({showPopup: false});
    console.log("Email sent to: ", email)
  }

  render() {
    return (
      <div>
        <button className='create-rule-submit' onClick={() => this.setState({ showPopup: true })}>Send Email</button>
        
        {this.state.showPopup && (
          <CustomConfirmSendEmail
            onConfirm={this.handleConfirm}
            onCancel={this.handleCancel}
          />
        )}
      </div>
    );
  }
}

export default EmailButton;