import React from 'react';

class Search extends React.Component {

  render() {
    return (
      <>
        <label for='input-search' class='fw-bold'>Search</label>
        <div class='input-group' style={{ minWidth: '200px'}}>
          <input type='text' id='input-search' class='form-control' placeholder='Search...' />
          <button class='btn btn-primary' type='button' id='button-addon1'><i class='fas fa-search' /></button>
        </div>
      </>
    );
  };
};

export default Search;
