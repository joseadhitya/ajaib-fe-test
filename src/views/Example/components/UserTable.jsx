import _ from 'lodash';
import React from 'react';

const TABLE_COLUMNS = [
  { header: 'Username', body: 'login.username', sort: 'username' },
  { header: 'Name', body: 'name.full', sort: 'full-name' },
  { header: 'Email', body: 'email', sort: 'email' },
  { header: 'Gender', body: 'gender', sort: 'gender' },
  { header: 'Registered Date', body: 'registered.date', sort: 'registered-date' },
];

class UserTable extends React.Component {

  getSortIcon = (category, sortBy, sortOrder) => {
    let icon;
    if (category !== sortBy) return 'fa-sort';

    switch (sortOrder) {
      case null:
        icon = 'fa-sort';
        break;
      case 'ascend':
        icon = 'fa-sort-up';
        break;
      case 'descend':
        icon = 'fa-sort-down';
        break;
      default:
        icon = 'fa-sort';
        break;
    };
    return icon;
  };

  toggleSortOrder = (currentOrder) => {
    let newOrder;
    switch (currentOrder) {
      case null:
        newOrder = 'ascend';
        break;
      case 'ascend':
        newOrder = 'descend';
        break;
      case 'descend':
        newOrder = 'ascend';
        break;
      default:
        newOrder = null;
        break;
    };
    return newOrder;
  };

  toggleSort = (column) => {
    // If sort is clicked for the currently sorted column, change sort order
    if (column === this.props.sortBy) {
      let currentOrder = this.props.sortOrder;
      let newOrder = this.toggleSortOrder(currentOrder);
      _.invoke(this.props, 'onChange', { sortOrder: newOrder });
    };
    // If sort is clicked for other column, change sort by and set to Ascending
    if (column !== this.props.sortBy) {
      let newOrder = this.toggleSortOrder(null);
      _.invoke(this.props, 'onChange', { sortBy: column, sortOrder: newOrder });
    };
  };

  render() {
    return (
      <table className='table'>
        <thead>
          <tr>
            {TABLE_COLUMNS.map((o, i) => (
              <th key={i} scope='col' className='position-relative' onClick={() => this.toggleSort(o.sort)}>
                <span>{o.header}</span>
                <i className={`fas ${this.getSortIcon(o.sort, this.props.sortBy, this.props.sortOrder)} position-absolute py-1`} style={{ right: 0 }} />
              </th>
            ))}
          </tr>
        </thead>

        <tbody>
          {this.props.users.map((o, i) => (
            <tr key={i}>
              {TABLE_COLUMNS.map((p, j) => (
                <td key={j}>{_.get(o, p.body)}</td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    );
  };
};

export default UserTable;
