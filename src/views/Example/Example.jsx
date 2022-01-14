import _ from 'lodash';
import React from 'react';
import { connect } from 'react-redux';

import config from '../../config';
import { fetchUsers } from '../../utils/redux/slices';

import { Breadcrumb, Search, GenderFilter, ResetButton, UserTable, Pagination } from './components';

const INITIAL_STATE = {
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
    this.props.dispatch(fetchUsers(config.BE_USER_URL, params));
  };

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

  render() {
    return (
      <div className='container py-4'>
        <Breadcrumb />

        <h2 className='mb-3'>Example With Search and Filter</h2>

        <div className='row align-items-end mb-3'>
          <div className='col-auto my-1'>
            <Search valueKey='keyword' value={this.state.keyword} onChange={this.handleFilterSelected} />
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

export default connect(mapStateToProps)(Example);
