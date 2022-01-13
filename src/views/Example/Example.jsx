import React from 'react';
import { Breadcrumb, Search, GenderFilter, ResetButton, UserTable } from './components';

const EXAMPLE_DATA = [1,1,1,1,1];

class ExamplePage extends React.Component {

  render() {
    return (
      <div className='container py-4'>
        <Breadcrumb />

        <h2 class='mb-3'>Example With Search and Filter</h2>

        <div class='row align-items-end mb-3'>
          <div class='col-auto my-1'>
            <Search />
          </div>
          <div class='col-auto my-1'>
            <GenderFilter />
          </div>
          <div class='col-auto my-1'>
            <ResetButton />
          </div>
        </div>

        <hr />
        
        <UserTable users={EXAMPLE_DATA} />
      </div>
    );
  };
};

export default ExamplePage;
