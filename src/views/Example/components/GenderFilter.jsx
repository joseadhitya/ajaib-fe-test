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
    _.invoke(this.props, 'onChange', this.props.valueKey, value);
  };

  render() {
    return (
      <>
        <label for='input-gender-filter' className='fw-bold'>Gender</label>
        <div className='input-group' style={{ minWidth: '200px' }}>
          <select id='input-gender-filter' className='form-select' value={this.getValue()} onChange={this.handleChange}>
            <option value='null'>All</option>
            <option value='male'>Male</option>
            <option value='female'>Female</option>
          </select>
        </div>
      </>
    );
  };
};

export default GenderFilter;
