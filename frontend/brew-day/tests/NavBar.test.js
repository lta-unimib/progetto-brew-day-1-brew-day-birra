import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import App from '../src/App';
import reportWebVitals from '../src/reportWebVitals';
import { act } from "react-test-renderer";
import mediaQuery from "css-mediaquery";
import {BrowserRouter} from "react-router-dom"


function createMatchMedia(width) {
  return (query) => {
    return {
      matches: mediaQuery.match(query, { width }),
      media: "",
      addListener: () => {},
      removeListener: () => {},
      onchange: () => {},
      addEventListener: () => {},
      removeEventListener: () => {},
      dispatchEvent: () => true,
    };
  };
}

function resizeScreenSize(width) {
  window.matchMedia = createMatchMedia(width);
}

global.fetch = jest.fn().mockImplementation(() =>
  Promise.resolve({
    json: () => {
      return Promise.resolve([]);
    },
  })
)

describe('NavBar component', () => {
  test('should render correctly', async () => {
    
    resizeScreenSize(900);

    let theContainer;
    await act(() => {
      const { container } = render(<BrowserRouter><App /></BrowserRouter>);
      theContainer = container;
    })
    await act(() => {fireEvent.click(screen.getAllByRole("button")[0])});
    await act(() => {fireEvent.click(screen.getAllByText("Impostazioni")[0])});
  });
});
