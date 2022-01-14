import _ from 'lodash';
import React from 'react';

class UserTable extends React.Component {

  render() {
    return (
      <table className='table'>
        <thead>
          <tr>
            <th scope='col'>Username</th>
            <th scope='col'>Name</th>
            <th scope='col'>Email</th>
            <th scope='col'>Gender</th>
            <th scope='col'>Registered Date</th>
          </tr>
        </thead>

        <tbody>
          {this.props.users.map((o, i) => (
            <tr key={i}>
              <td>{_.get(o, 'login.username')}</td>
              <td>{_.get(o, 'name.first') + ' ' + _.get(o, 'name.last')}</td>
              <td>{_.get(o, 'email')}</td>
              <td>{_.get(o, 'gender')}</td>
              <td>{_.get(o, 'registered.date')}</td>
            </tr>
          ))}
        </tbody>
      </table>
    );
  };
};

export default UserTable;
