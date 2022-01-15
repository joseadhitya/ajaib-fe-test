import React from 'react';

class ResetButton extends React.Component {

  render() {
    return (
      <button type='button' className='btn btn-light border' onClick={this.props.onClick}>Reset Filter</button>
    );
  };
};

export default ResetButton;
