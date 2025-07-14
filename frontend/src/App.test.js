import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom'; // Required for expect matchers
import App from './App';

test('renders status message', () => {
  render(<App />);
  const headingElement = screen.getByText(/MERN Stack Health Check/i);
  expect(headingElement).toBeInTheDocument();
});
