import React from 'react';

class GenderFilter extends React.Component {

  render() {
    return (
      <>
        <label for='input-gender-filter' class='fw-bold'>Search</label>
        <div class='input-group' style={{ minWidth: '200px'}}>
          <select class='form-select' id='input-gender-filter'>
            <option value='1' selected>All</option>
            <option value='2'>Male</option>
            <option value='3'>Female</option>
          </select>
        </div>
      </>
    );
  };
};

export default GenderFilter;
