import React from 'react';
import CustomConfirmPopup from './CustomConfirmPopup'; // Assuming the file path for CustomConfirmPopup

class ConfirmSelectionPopup extends React.Component {
  state = {
    showPopup: false,
  };

  handleConfirm = () => {
    // Triggered when the user confirms the selection
    // Implement your logic here
    console.log('Selection confirmed!');
    this.setState({ showPopup: false }); // Close the popup after confirmation
  };

  handleCancel = () => {
    // Triggered when the user cancels the selection
    // Implement your logic here
    console.log('Selection canceled!');
    this.setState({ showPopup: false }); // Close the popup after cancellation
  };

  render() {
    console.log(this.state.showPopup);
    return (
      <div>
        {/* Your main content goes here */}
        <h1>Popup Box Example</h1>
        <p>Click the button below to confirm your selection:</p>

        {/* Button to trigger the popup */}
        <button onClick={() => this.setState({ showPopup: true })}>Confirm Selection</button>

        {/* Render the custom popup when showPopup is true */}
        {this.state.showPopup && (
          <CustomConfirmPopup
            onConfirm={this.handleConfirm}
            onCancel={this.handleCancel}
          />
        )}
      </div>
    );
  }
}

export default ConfirmSelectionPopup;
