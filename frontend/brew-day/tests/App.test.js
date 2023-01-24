import React from "react";
import ReactDOM from "react-dom";
import { render } from '@testing-library/react';
import { act } from 'react-dom/test-utils';
import { create } from 'react-test-renderer';
import '@testing-library/jest-dom/extend-expect';
import App from '../src/App';

describe('App component', () => {
  test('should render correctly', () => {
    const { container } = render(<App />);
    expect(container.firstChild).toMatchSnapshot();
  });
});

let container;

beforeEach(() => {
  container = document.createElement('div');
  document.body.appendChild(container);
});

afterEach(() => {
  document.body.removeChild(container);
  container = null;
});

describe('index.js', () => {
  test('should render the App component', () => {
    act(() => {
      ReactDOM.render(
        <React.StrictMode>
          <App />
        </React.StrictMode>,
        container
      );
    });
    const component = create(<App />);
    expect(component.toJSON()).toMatchSnapshot();
  });
});