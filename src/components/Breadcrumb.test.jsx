import { render, screen } from '@testing-library/react';
import { Provider as ReduxProvider } from 'react-redux';
import { MemoryRouter } from 'react-router-dom';
import store from '../utils/redux/store';
import routes from '../utils/router/routes';

import Breadcrumb from './Breadcrumb';

const TestElement = props => {
  return (
    <ReduxProvider store={store}>
      <MemoryRouter>
        <Breadcrumb location={{ pathname: props.pathname }} routes={routes} />
      </MemoryRouter>
    </ReduxProvider>
  );
};

test('renders correctly', () => {
  render(<TestElement pathname='/' />);
  const containerElement = screen.getByTestId('breadcrumb');
  expect(containerElement).toBeInTheDocument();
  const itemElements = screen.getAllByTestId('breadcrumb-item');
  itemElements.forEach((o, i) => {
    expect(o).toBeInTheDocument();
    expect(o.href).toBeDefined();
  });
});

test('generates the correct amount of breadcrumb items: home', () => {
  render(<TestElement pathname='/' />);
  const itemElements = screen.getAllByTestId('breadcrumb-item');
  expect(itemElements).toHaveLength(2);
  expect(itemElements[0].className).toMatch('active');
  expect(itemElements[1].className).not.toMatch('active');
});

test('generates the correct amount of breadcrumb items: example', () => {
  render(<TestElement pathname='/example' />);
  const itemElements = screen.getAllByTestId('breadcrumb-item');
  expect(itemElements).toHaveLength(2);
  expect(itemElements[0].className).not.toMatch('active');
  expect(itemElements[1].className).toMatch('active');
});
