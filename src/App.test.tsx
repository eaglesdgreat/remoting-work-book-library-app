import { describe, expect, it, test } from 'vitest';

import App from './App';
import { render } from '@testing-library/react';

test('demo', () => {
  expect(true).toBe(true);
});

describe('render', () => {
  it('renders the main page', () => {
    render(<App />);
    expect(true).toBeTruthy();
  });
});
