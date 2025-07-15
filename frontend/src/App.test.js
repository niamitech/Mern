// src/App.test.js (or src/App.spec.js - choose one)
import { render, screen } from '@testing-library/react';
import App from './App'; // This will now correctly import your main App component

test('renders learn react link', () => {
  render(<App />);
  const linkElement = screen.getByText(/learn react/i);
  expect(linkElement).toBeInTheDocument();
});