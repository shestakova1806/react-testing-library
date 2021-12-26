import { render, screen, fireEvent } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from './App';

describe('App', () => {
  it('renders App component', async () => {
    render(<App />);
    await screen.findByText(/Logged in as/i);

    expect(screen.queryByText(/Searches for React/i)).toBeNull();
    userEvent.type(screen.getByRole('textbox'), 'React');
    expect(screen.getByText(/Searches for React/i)).toBeInTheDocument();
  });
});

describe('events', () => {
  it('checkbox click', () => {
    const { container } = render(<input type="checkbox" />);

    const checkbox = container.firstChild;
    expect(checkbox).not.toBeChecked();

    userEvent.click(checkbox);
    // userEvent.click(checkbox, { ctrlKey: true, shiftKey: true });
    expect(checkbox).toBeChecked();
  });

  it('double click', () => {
    const onChange = jest.fn();

    const { container } = render(<input type="checkbox" onChange={onChange} />);

    const checkbox = container.firstChild;
    expect(checkbox).not.toBeChecked();

    userEvent.dblClick(checkbox);
    expect(onChange).toHaveBeenCalledTimes(2);
  });

  it('focus', () => {
    render(
      <div>
        <input data-testId="element" type="checkbox" />
        <input data-testId="element" type="radio" />
        <input data-testId="element" type="number" />
      </div>
    );
    const [checkbox, radio, number] = screen.getAllByTestId('element');
    userEvent.tab();
    expect(checkbox).toHaveFocus();

    userEvent.tab();
    expect(radio).toHaveFocus();

    userEvent.tab();
    expect(number).toHaveFocus();
  });

  it('select option', () => {
    render(
      <select>
        <option value="1">A</option>
        <option value="2">B</option>
        <option value="3">C</option>
      </select>
    );

    userEvent.selectOptions(screen.getByRole('combobox'), '1');
    expect(screen.getByText('A').selected).toBeTruthy();

    userEvent.selectOptions(screen.getByRole('combobox'), '2');
    expect(screen.getByText('B').selected).toBeTruthy();
    expect(screen.queryByText('A').selected).toBeFalsy();
  });
});
