import { render, screen, fireEvent } from '@testing-library/react';
import { Provider as ReduxProvider } from 'react-redux';
import { MemoryRouter } from 'react-router-dom';
import Chance from 'chance';
import store from '../utils/redux/store';

import GenderFilter from './GenderFilter';

var chance = new Chance();

const TestElement = props => {
  return (
    <ReduxProvider store={store}>
      <MemoryRouter>
        <GenderFilter {...props} />
      </MemoryRouter>
    </ReduxProvider>
  );
};

test('renders correctly', () => {
  render(<TestElement />);
  const inputGroupElement = screen.getByTestId('input-group-gender-filter');
  expect(inputGroupElement).toBeInTheDocument();
  const inputElement = screen.getByTestId('input-gender-filter');
  expect(inputElement).toBeInTheDocument();
  const optionElements = screen.getAllByTestId('input-group-gender-filter-option');
  expect(optionElements).toHaveLength(3);
  optionElements.forEach((o, i) => {
    expect(o.value).toBeDefined();
    expect(o.textContent).toBeDefined();
  });
});

test('returns the correct value when changed', () => {
  const mockChangeHandler = jest.fn();
  const values = [null, 'male', 'female'];
  const initValue = chance.pickone(values), newValue = chance.pickone(values);

  render(<TestElement valueKey='gender' value={initValue} onChange={mockChangeHandler} />);
  const inputElement = screen.getByTestId('input-gender-filter');
  fireEvent.change(inputElement, { target: { value: newValue } });

  expect(mockChangeHandler.mock.calls.length).toBe(1);
  expect(mockChangeHandler.mock.calls[0][0]).toStrictEqual({ gender: newValue });
});
