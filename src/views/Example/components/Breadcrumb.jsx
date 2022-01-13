import React from 'react';
import { Link } from 'react-router-dom';

class Breadcrumb extends React.Component {

  render() {
    return (
      <nav aria-label='breadcrumb'>
        <ol class='breadcrumb'>
          <Link class='breadcrumb-item' to='/'>Home</Link>
          <Link class='breadcrumb-item active' aria-current='page' to='/example'>Example Page</Link>
        </ol>
      </nav>
    );
  };
};

export default Breadcrumb;
