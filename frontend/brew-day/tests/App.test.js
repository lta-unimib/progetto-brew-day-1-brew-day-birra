import React from 'react';
import { render } from '@testing-library/react';
import App from '../src/App';
import reportWebVitals from '../src/reportWebVitals';
import { act } from "react-test-renderer";

global.fetch = jest.fn().mockImplementation(() =>
  Promise.resolve({
    json: () => {
      return Promise.resolve([]);
    },
  })
)

describe('App component', () => {
  test('should render correctly', async () => {
    let container;
    await act(() => {
      container = render(<App />);
    })
    expect(container.firstChild).toMatchSnapshot();
  });
});

describe('reportWebVitals', () => {
  test('should launch reportWebVitals', () => {
    reportWebVitals(() => true);
  });
});