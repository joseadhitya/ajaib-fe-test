import React from 'react';

class UserTable extends React.Component {

  render() {
    return (
      <table class='table'>
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
              <td>Username</td>
              <td>Name</td>
              <td>Email</td>
              <td>Gender</td>
              <td>Registered Date</td>
            </tr>
          ))}
        </tbody>
      </table>
    );
  };
};

export default UserTable;
