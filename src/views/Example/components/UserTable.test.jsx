import { render, screen, fireEvent } from '@testing-library/react';
import { Provider as ReduxProvider } from 'react-redux';
import { MemoryRouter } from 'react-router-dom';
import moment from 'moment';
import Chance from 'chance';
import store from '../../../utils/redux/store';

import UserTable from './UserTable';

var chance = new Chance();

const TestElement = props => {
  return (
    <ReduxProvider store={store}>
      <MemoryRouter>
        <UserTable {...props} />
      </MemoryRouter>
    </ReduxProvider>
  );
};

// Mock object similar to randomuser.me
chance.mixin({
  'user': function () {
    return {
      login: {
        username: chance.twitter(),
      },
      name: {
        full: chance.first() + ' ' + chance.last(),
      },
      email: chance.email(),
      gender: chance.pickone(['male', 'female']),
      registered: {
        date: moment(chance.date()),
      },
    };
  },
});

var users = [];
for (let i = 0; i < chance.integer({ min: 1, max: 20 }); i++) {
  users.push(chance.user());
};

test('renders correctly', () => {
  render(<TestElement users={users} />);
  const containerElement = screen.getByTestId('table-user');
  expect(containerElement).toBeInTheDocument();
  const headerElements = screen.getAllByTestId('table-user-header');
  expect(headerElements).toHaveLength(5);
  const dataElements = screen.getAllByTestId('table-user-data');
  expect(dataElements).toHaveLength(5 * users.length);
});

test('returns the correct value when column is being sorted', () => {
  const mockChangeHandler = jest.fn();
  const sortByValues = ['username', 'full-name', 'email', 'gender', 'registered-date'], sortOrderValues = ['ascend', 'descend'];
  const initSortBy = chance.pickone(sortByValues), initSortOrder = chance.pickone(sortOrderValues);
  const newSortIndex = chance.integer({ min: 0, max: 4 });

  render(<TestElement users={users} sortBy={initSortBy} sortOrder={initSortOrder} onChange={mockChangeHandler} />);
  const headerElements = screen.getAllByTestId('table-user-header');
  fireEvent.click(headerElements[newSortIndex]);

  setTimeout(() => {
    // For whatever reason, testing right away doesn't work properly. Maybe need to offset for post-render updates first?
    let newSortBy = sortByValues[newSortIndex], newSortOrder;
    if (initSortOrder === sortOrderValues[0]) newSortOrder = sortOrderValues[1];
    if (initSortOrder === sortOrderValues[1]) newSortOrder = sortOrderValues[0];

    if (newSortBy === initSortBy) {
      expect(mockChangeHandler.mock.calls.length).toBe(1);
      expect(mockChangeHandler.mock.calls[0][0]).toStrictEqual({ sortOrder: newSortOrder });
    } else {
      expect(mockChangeHandler.mock.calls.length).toBe(1);
      expect(mockChangeHandler.mock.calls[0][0]).toStrictEqual({ sortBy: newSortBy, sortOrder: newSortOrder });
    };
  }, 100);
});
