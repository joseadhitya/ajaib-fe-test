import _ from 'lodash';
import React from 'react';

class GenderFilter extends React.Component {

  getValue = () => {
    let value = this.props.value;
    if (value === null) value = 'null';
    return value;
  };

  handleChange = (event) => {
    let value = event.target.value;
    if (value === 'null') value = null;
    _.invoke(this.props, 'onChange', { [this.props.valueKey]: value });
  };

  render() {
    return (
      <>
        <label htmlFor='input-gender-filter' className='fw-bold'>Gender</label>
        <div className='input-group' style={{ minWidth: '200px' }} data-testid='input-group-gender-filter' >
          <select id='input-gender-filter' className='form-select' value={this.getValue()} onChange={this.handleChange} data-testid='input-gender-filter' >
            <option value='null' data-testid='input-group-gender-filter-option'>All</option>
            <option value='male' data-testid='input-group-gender-filter-option'>Male</option>
            <option value='female' data-testid='input-group-gender-filter-option'>Female</option>
          </select>
        </div>
      </>
    );
  };
};

export default GenderFilter;
