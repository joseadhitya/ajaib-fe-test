import React from 'react';
import { Link } from 'react-router-dom';

class Breadcrumb extends React.Component {

  render() {
    return (
      <nav aria-label='breadcrumb'>
        <ol className='breadcrumb'>
          <Link className='breadcrumb-item' to='/'>Home</Link>
          <Link className='breadcrumb-item active' aria-current='page' to='/example'>Example Page</Link>
        </ol>
      </nav>
    );
  };
};

export default Breadcrumb;
