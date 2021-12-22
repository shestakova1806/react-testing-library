import { render, screen } from '@testing-library/react';
import App from './App';

describe('App', () => {
  it('renders App component', async () => {
    render(<App />);
    expect(screen.queryByText(/Logged in as/i)).toBeNull();
    expect(await screen.findByText(/Logged in as/i)).toBeInTheDocument();

    expect(screen.getByAltText(/search image/i)).toHaveClass('image');

    expect(screen.getByLabelText(/search/i)).not.toBeRequired();

    expect(screen.getByLabelText(/search/i)).toHaveAttribute('id');
  });
});
