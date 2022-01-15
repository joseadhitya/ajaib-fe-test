import { render, screen } from '@testing-library/react';
import { Provider as ReduxProvider } from 'react-redux';
import { MemoryRouter } from 'react-router-dom';
import store from '../../utils/redux/store';
import routes from '../../utils/router/routes';

import Example from './Example';

const TestElement = props => {
  return (
    <ReduxProvider store={store}>
      <MemoryRouter>
        <Example routes={routes} />
      </MemoryRouter>
    </ReduxProvider>
  );
};

test('does not crash', () => {
  render(<TestElement />);
  const homeElement = screen.getByTestId('container-example');
  expect(homeElement).toBeInTheDocument();
});

test('renders breadcrumb', () => {
  render(<TestElement />);
  const breadcrumbElement = screen.getByTestId('breadcrumb');
  expect(breadcrumbElement).toBeInTheDocument();
  const breadcrumbItemElements = screen.getAllByTestId('breadcrumb-item');
  breadcrumbItemElements.forEach((o, i) => {
    expect(o).toBeInTheDocument();
  });
});

test('renders searchbar', () => {
  render(<TestElement />);
  const searchElement = screen.getByTestId('input-group-search');
  expect(searchElement).toBeInTheDocument();
});

test('renders gender filter', () => {
  render(<TestElement />);
  const genderFilterElement = screen.getByTestId('input-group-gender-filter');
  expect(genderFilterElement).toBeInTheDocument();
});

test('renders reset button', () => {
  render(<TestElement />);
  const resetButtonElement = screen.getByTestId('button-reset');
  expect(resetButtonElement).toBeInTheDocument();
});

test('renders user table', () => {
  render(<TestElement />);
  const userTableElement = screen.getByTestId('table-user');
  expect(userTableElement).toBeInTheDocument();
});

test('renders pagination', () => {
  render(<TestElement />);
  const paginationElement = screen.getByTestId('pagination');
  expect(paginationElement).toBeInTheDocument();
  const paginationItemElements = screen.getAllByTestId('pagination-item');
  paginationItemElements.forEach((o, i) => {
    expect(o).toBeInTheDocument();
  });
});
