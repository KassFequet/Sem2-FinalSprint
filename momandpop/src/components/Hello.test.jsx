import { render, screen } from '@testing-library/react';
import Hello from './Hello';

test('renders with name', () => {
    render(<Hello name="Brendan"/>);
    expect(screen.getByText('Hello, Brendan!')).toBeInTheDocument();
});