import _ from 'lodash';
import React from 'react';
import { connect } from 'react-redux';
import { useLocation } from 'react-router-dom';

import config from '../../config';
import { fetchUsers } from '../../utils/redux/slices';

// Reusable components
import { Breadcrumb, Search, GenderFilter, ResetButton, Pagination } from '../../components';

// Page-specific components
import { UserTable } from './components';
import './Example.css';

const INITIAL_STATE = {
  isLoaded: false,
  page: 1,
  pageSize: 10,
  results: 10,
  keyword: null,
  gender: null,
  sortBy: null,
  sortOrder: null,
};

class Example extends React.Component {

  constructor(props) {
    super(props);
    this.state = INITIAL_STATE;
  };

  componentDidMount = () => {
    this.fetchUsers();
  };

  fetchUsers = () => {
    let params = _.clone(this.state);
    params = _.omitBy(params, _.isNil);

    const onSuccess = () => {
      this.setState({ isLoaded: true });
    };

    this.props.dispatch(fetchUsers(config.BE_USER_URL, params, onSuccess));
  };

  fetchUsersDebounced = _.debounce(() => {
    let params = _.clone(this.state);
    params = _.omitBy(params, _.isNil);

    const onSuccess = () => {
      this.setState({ isLoaded: true });
    };

    this.props.dispatch(fetchUsers(config.BE_USER_URL, params, onSuccess));
  }, config.HTTP_DEBOUNCE_MS);

  resetFilter = () => {
    const onStateChanged = () => {
      this.fetchUsers();
    };
    this.setState(INITIAL_STATE, onStateChanged);
  };

  handleFilterSelected = (values) => {
    const onStateChanged = () => {
      this.fetchUsers();
    };
    this.setState(values, onStateChanged);
  };

  handleFilterSelectedDebounced = (values) => {
    const onStateChanged = () => {
      this.fetchUsersDebounced();
    };
    this.setState(values, onStateChanged);
  };

  render() {
    return (
      <div className='container py-4' data-testid='container-example'>
        {!this.state.isLoaded && (
          <div className='fullscreen-container'>l
            <div className='spinner-container'>
              <i className='spinner fas fa-spinner fa-3x' />
            </div>
          </div>
        )}

        <Breadcrumb location={this.props.location} routes={this.props.routes} />

        <h2 className='mb-3'>Example With Search and Filter</h2>

        <div className='row align-items-end mb-3'>
          <div className='col-auto my-1'>
            <Search valueKey='keyword' value={this.state.keyword} onChange={this.handleFilterSelectedDebounced} />
          </div>
          <div className='col-auto my-1'>
            <GenderFilter valueKey='gender' value={this.state.gender} onChange={this.handleFilterSelected} />
          </div>
          <div className='col-auto my-1'>
            <ResetButton onClick={this.resetFilter} />
          </div>
        </div>

        <hr />

        <UserTable users={this.props.users} sortBy={this.state.sortBy} sortOrder={this.state.sortOrder} onChange={this.handleFilterSelected} />

        <div className='row justify-content-end'>
          <div className='col-auto my-1'>
            <Pagination info={this.props.info} onChange={this.handleFilterSelected} />
          </div>
        </div>
      </div>
    );
  };
};

const mapStateToProps = (state) => {
  return {
    users: state.data.users,
    info: state.data.info,
  };
};

// Since react-router-dom v6 dropped support for using withRouter, had to wrap it manually.
const WrappedExample = props => {
  const location = useLocation();
  return <Example location={location} {...props} />
};

export default connect(mapStateToProps)(WrappedExample);
