import React from "react";
import ReactTestRenderer from 'react-test-renderer';
import App from './App';

describe('App component', () => {
  test('should render correctly', () => {
    const renderer = ReactTestRenderer.create(<App />);
    const json = renderer.toJSON();
    expect(json).toMatchSnapshot();
  });
});