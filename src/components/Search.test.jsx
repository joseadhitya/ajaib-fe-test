import { render, screen, fireEvent } from '@testing-library/react';
import { Provider as ReduxProvider } from 'react-redux';
import { MemoryRouter } from 'react-router-dom';
import Chance from 'chance';
import store from '../utils/redux/store';

import Search from './Search';

var chance = new Chance();

const TestElement = props => {
  return (
    <ReduxProvider store={store}>
      <MemoryRouter>
        <Search {...props} />
      </MemoryRouter>
    </ReduxProvider>
  );
};

test('renders correctly', () => {
  render(<TestElement />);
  const inputGroupElement = screen.getByTestId('input-group-search');
  expect(inputGroupElement).toBeInTheDocument();
  const inputElement = screen.getByTestId('input-search');
  expect(inputElement).toBeInTheDocument();
  expect(inputElement.type).toBe('text');
  expect(inputElement.placeholder).toBe('Search...');
  const buttonElement = screen.getByTestId('button-search');
  expect(buttonElement).toBeInTheDocument();
  expect(buttonElement.type).toBe('button');
});

test('returns the correct value when input is changed', () => {
  const mockChangeHandler = jest.fn();
  const initValue = chance.word(), newValue = chance.word();

  render(<TestElement valueKey='keyword' value={initValue} onChange={mockChangeHandler} />);
  const inputElement = screen.getByTestId('input-search');
  fireEvent.change(inputElement, { target: { value: newValue } });

  expect(mockChangeHandler.mock.calls.length).toBe(1);
  expect(mockChangeHandler.mock.calls[0][0]).toStrictEqual({ keyword: newValue });
});

test('returns the existing value when button is clicked', () => {
  const mockChangeHandler = jest.fn();
  const initValue = chance.word(), newValue = chance.word();

  render(<TestElement valueKey='keyword' value={initValue} onChange={mockChangeHandler} />);
  const buttonElement = screen.getByTestId('button-search');
  fireEvent.click(buttonElement);

  expect(mockChangeHandler.mock.calls.length).toBe(1);
  expect(mockChangeHandler.mock.calls[0][0]).toStrictEqual({ keyword: initValue });
});
