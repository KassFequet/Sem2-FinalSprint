import React from 'react';
import { render, screen } from '@testing-library/react';
import { test, expect } from 'vitest';
import AddToCartButton from './AddToCartButton';

test('renders the AddToCartButton', () => {
  // Mock product data
  const product = {
    id: '1',
    name: 'Sample Product',
  };

  // Render the AddToCartButton component
  render(<AddToCartButton product={product} />);

  // Check if the button is rendered
  const button = screen.getByRole('button');
  expect(button).toBeInTheDocument();
});
