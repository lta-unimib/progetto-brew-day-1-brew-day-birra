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
    let theContainer;
    await act(() => {
      const { container } = render(<App />);
      theContainer = container;
    })
    expect(theContainer.firstChild).toMatchSnapshot();
  });
});

describe('reportWebVitals', () => {
  test('should launch reportWebVitals', () => {
    reportWebVitals(() => true);
  });
});