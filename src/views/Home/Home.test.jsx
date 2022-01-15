import { render, screen } from '@testing-library/react';
import { Provider as ReduxProvider } from 'react-redux';
import { MemoryRouter } from 'react-router-dom';
import store from '../../utils/redux/store';
import routes from '../../utils/router/routes';

import Home from './Home';

const TestElement = props => {
  return (
    <ReduxProvider store={store}>
      <MemoryRouter>
        <Home routes={routes} />
      </MemoryRouter>
    </ReduxProvider>
  );
};

test('does not crash', () => {
  render(<TestElement />);
  const homeElement = screen.getByTestId('container-home');
  expect(homeElement).toBeInTheDocument();
});

test('renders breadcrumb', () => {
  render(<TestElement />);
  const breadcrumbElement = screen.getAllByTestId('breadcrumb-item');
  breadcrumbElement.forEach((o, i) => {
    expect(o).toBeInTheDocument();
  });
});
