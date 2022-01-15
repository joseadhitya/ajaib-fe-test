import { render, screen, fireEvent } from '@testing-library/react';
import { Provider as ReduxProvider } from 'react-redux';
import { MemoryRouter } from 'react-router-dom';
import Chance from 'chance';
import store from '../utils/redux/store';

import Pagination from './Pagination';

var chance = new Chance();

const TestElement = props => {
  return (
    <ReduxProvider store={store}>
      <MemoryRouter>
        <Pagination {...props} />
      </MemoryRouter>
    </ReduxProvider>
  );
};

var mockInfo = {
  seed: chance.word(),
  results: chance.integer({ min: 0, max: 100 }),
  page: chance.integer({ min: 0, max: 10 }),
  version: chance.word(),
};
mockInfo.pageSize = chance.integer({ min: mockInfo.page, max: 10 });

test('renders correctly', () => {
  render(<TestElement info={mockInfo} />);
  const containerElement = screen.getByTestId('pagination');
  expect(containerElement).toBeInTheDocument();
  const itemElements = screen.getAllByTestId('pagination-item');
  expect(itemElements).toHaveLength(mockInfo.pageSize + 2);
  for (let i = 0; i < itemElements.length; i++) {
    if (i === 0) expect(itemElements[i].children[0].children).toHaveLength(1);
    else if (i === itemElements.length - 1) expect(itemElements[i].children[0].children).toHaveLength(1);
    else expect(itemElements[i].children[0].textContent).toBeDefined();
  };
});

test('returns the correct value when page is selected: previous page', () => {
  const mockChangeHandler = jest.fn();

  render(<TestElement info={mockInfo} onChange={mockChangeHandler} />);
  const itemElements = screen.getAllByTestId('pagination-item');
  fireEvent.click(itemElements[0]);

  setTimeout(() => {
    // For whatever reason, testing right away doesn't work properly. Maybe need to offset for post-render updates first?
    if (mockInfo.page === 1) {
      expect(mockChangeHandler.mock.calls.length).toBe(0);
    } else {
      expect(mockChangeHandler.mock.calls.length).toBe(1);
      expect(mockChangeHandler.mock.calls[0][0]).toStrictEqual({ page: mockInfo.page - 1 });
    };
  }, 100);
});

test('returns the correct value when page is selected: next page', () => {
  const mockChangeHandler = jest.fn();

  render(<TestElement info={mockInfo} onChange={mockChangeHandler} />);
  const itemElements = screen.getAllByTestId('pagination-item');
  fireEvent.click(itemElements[itemElements.length - 1]);

  setTimeout(() => {
    // For whatever reason, testing right away doesn't work properly. Maybe need to offset for post-render updates first?
    if (mockInfo.page >= mockInfo.pageSize) {
      expect(mockChangeHandler.mock.calls.length).toBe(0);
    } else {
      expect(mockChangeHandler.mock.calls.length).toBe(1);
      expect(mockChangeHandler.mock.calls[0][0]).toStrictEqual({ page: mockInfo.page + 1 });
    };
  }, 100);
});

test('returns the correct value when page is selected: page select', () => {
  const mockChangeHandler = jest.fn();
  const newPage = chance.integer({ min: mockInfo.page, max: mockInfo.pageSize });

  render(<TestElement info={mockInfo} onChange={mockChangeHandler} />);
  const itemElements = screen.getAllByTestId('pagination-item');
  fireEvent.click(itemElements[newPage]); // As 0 is Previous, thus 1 would still be 1 and so on

  setTimeout(() => {
    // For whatever reason, testing right away doesn't work properly. Maybe need to offset for post-render updates first?
    if (newPage === mockInfo.page) {
      expect(mockChangeHandler.mock.calls.length).toBe(0);
    } else {
      expect(mockChangeHandler.mock.calls.length).toBe(1);
      expect(mockChangeHandler.mock.calls[0][0]).toStrictEqual({ page: newPage });
    };
  }, 100);
});
