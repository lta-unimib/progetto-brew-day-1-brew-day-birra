import React from 'react';
import { render } from '@testing-library/react';
import App from '../src/App';
import reportWebVitals from '../src/reportWebVitals';

global.fetch = jest.fn().mockImplementation(() =>
  Promise.resolve({
    json: () => {
      return Promise.resolve({});
    },
  })
)

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