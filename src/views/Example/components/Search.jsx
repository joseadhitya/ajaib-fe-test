import _ from 'lodash';
import React from 'react';

class Search extends React.Component {

  getValue = () => {
    let value = this.props.value;
    if (value === null) value = '';
    return value;
  };

  handleChange = (event) => {
    let value = event.target.value;
    if (value === '') value = null;
    _.invoke(this.props, 'onChange', this.props.valueKey, value);
  };

  handleClick = (event) => {
    let value = _.clone(this.props.value);
    if (value === '') value = null;
    _.invoke(this.props, 'onChange', this.props.valueKey, value);
  };

  render() {
    return (
      <>
        <label for='input-search' className='fw-bold'>Search</label>
        <div className='input-group' style={{ minWidth: '200px' }}>
          <input type='text' id='input-search' className='form-control' placeholder='Search...' value={this.getValue()} onChange={this.handleChange} />
          <button type='button' className='btn btn-primary' onChange={this.handleClick}>
            <i className='fas fa-search' />
          </button>
        </div>
      </>
    );
  };
};

export default Search;
