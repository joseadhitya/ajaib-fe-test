import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Breadcrumb } from '../../components';
import logo from '../../logo.svg';
import './Home.css';

class App extends React.Component {

  render() {
    return (
      <div className='container py-4'>
        <Breadcrumb location={this.props.location} routes={this.props.routes} />

        <header className='App-header'>
          <img src={logo} className='App-logo' alt='logo' />
          <p>
            This is the Home page. Please go to the <Link to='/example'>Example</Link> page for the answer to the test
          </p>
        </header>
      </div>
    );
  };
};

// Since react-router-dom v6 dropped support for using withRouter, had to wrap it manually.
const WrappedApp = props => {
  const location = useLocation();
  return <App location={location} {...props} />
};

export default WrappedApp;
