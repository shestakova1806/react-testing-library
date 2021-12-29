import React from 'react';
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import { reducer } from './reducer';
import TestRedux from './TestRedux';

const renderWithRedux = (
  component,
  { initialState, store = createStore(reducer, initialState) } = {}
) => {
  return {
    ...render(<Provider store={store}>{component}</Provider>),
    store,
  };
};

describe('Redux testing', () => {
  it('checks initial state is equal to 0', () => {
    renderWithRedux(<TestRedux />);

    expect(screen.getByRole('heading')).toHaveTextContent('0');
  });

  it('increment the counter through Redux', () => {
    renderWithRedux(<TestRedux />, {
      initialState: { count: 5 },
    });

    userEvent.click(screen.getByText('+1'));
    expect(screen.getByRole('heading')).toHaveTextContent('6');
  });

  it('decrement the counter through Redux', () => {
    renderWithRedux(<TestRedux />, {
      initialState: { count: 100 },
    });

    userEvent.click(screen.getByText('-1'));
    expect(screen.getByRole('heading')).toHaveTextContent('99');
  });
});
