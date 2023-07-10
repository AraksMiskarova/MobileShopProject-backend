import React from 'react';
import { Provider } from 'react-redux';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
// eslint-disable-next-line import/no-extraneous-dependencies
import configureStore from 'redux-mock-store';
import { MemoryRouter } from 'react-router-dom';

import LogInPage from '../src/pages/LogInPage/LogInPage';

const mockStore = configureStore([]);

describe('LogInPage', () => {
  test('renders and submits form successfully', () => {
    // Mock the Redux store
    const store = mockStore({
      // Add your initial store state here if necessary
    });

    // Render the component
    render(
      <Provider store={store}>
        <MemoryRouter>
          <LogInPage />
        </MemoryRouter>
      </Provider>,
    );

    const visibilityOffToggle = screen.getByTestId('visibilityOffToggle');
    fireEvent.click(visibilityOffToggle);

    // Assertions
    const passwordInput = screen.getByLabelText(/password/i);
    expect(screen.getByTestId('loginPage')).toBeInTheDocument();
    expect(passwordInput).toBeInTheDocument();
    expect(passwordInput).toHaveAttribute('type', 'text');
    expect(screen.getByLabelText(/E-Mail/i)).toBeInTheDocument();
  });
});
