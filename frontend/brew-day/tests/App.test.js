import React from 'react';
import { render } from '@testing-library/react';
import App from '../src/App';
import reportWebVitals from '../src/reportWebVitals';

describe('App component', () => {
  test('should render correctly', () => {
    const { container } = render(<App />);
    expect(container.firstChild).toMatchSnapshot();
  });
});

describe('reportWebVitals', () => {
  test('should launch reportWebVitals', () => {
    reportWebVitals(() => true);
  });
});
