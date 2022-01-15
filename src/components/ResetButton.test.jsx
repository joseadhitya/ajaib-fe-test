import { render, screen, fireEvent } from '@testing-library/react';
import { Provider as ReduxProvider } from 'react-redux';
import { MemoryRouter } from 'react-router-dom';
import Chance from 'chance';
import store from '../utils/redux/store';

import ResetButton from './ResetButton';

var chance = new Chance();

const TestElement = props => {
  return (
    <ReduxProvider store={store}>
      <MemoryRouter>
        <ResetButton {...props} />
      </MemoryRouter>
    </ReduxProvider>
  );
};

test('renders correctly', () => {
  render(<TestElement />);
  const buttonElement = screen.getByTestId('button-reset');
  expect(buttonElement).toBeInTheDocument();
  expect(buttonElement.type).toBe('button');
});

test('calls the handler when button is clicked', () => {
  const mockClickHandler = jest.fn();

  render(<TestElement onClick={mockClickHandler} />);
  const buttonElement = screen.getByTestId('button-reset');
  fireEvent.click(buttonElement);

  expect(mockClickHandler.mock.calls.length).toBe(1);
});
