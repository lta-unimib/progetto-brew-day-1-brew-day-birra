import React from 'react';
import { render } from '@testing-library/react';
import App from '../src/App';

describe('App component', () => {
  test('should render correctly', () => {
    const { container } = render(<App />);
    expect(container.firstChild).toMatchSnapshot();
  });
});