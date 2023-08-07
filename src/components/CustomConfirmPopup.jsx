import React from 'react';

class CustomConfirmPopup extends React.Component {

  render() {
    return (
      <div className="custom-confirm-popup">
        {/* Popup content */}
        <div className="popup-content">
          <h2>{this.props.messageTitle}</h2>
          <p>{this.props.messageSubtitle}</p>

          {/* Buttons */}
          <div className="buttons">
            <button className='popup-button popup-button-confirm' onClick={() => this.props.onConfirm()}>Confirm</button>
            <button className='popup-button popup-button-cancel' onClick={() => this.props.onCancel()}>Cancel</button>
          </div>
        </div>
      </div>
    );
  }
}

export default CustomConfirmPopup;