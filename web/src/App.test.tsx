import { render, screen } from '@testing-library/react';
import App from './App';

test('renders financing options title', () => {
  render(<App />);
  const linkElement = screen.getByText(/financing options/i);
  expect(linkElement).toBeInTheDocument();
});
