import "@testing-library/jest-dom/extend-expect";
import React from "react";
import { render } from "@testing-library/react";
import Home from "../src/pages/Home";
import Spesa from "../src/pages/Spesa";
import { act } from "react-test-renderer";

global.fetch = jest.fn().mockImplementation((url) =>
  Promise.resolve({
    json: () => {
      if (url === "/api/advice")
        return Promise.resolve(null);
        if (url === "/api/settings/nextRecipeID")
        return Promise.resolve({value:""});
        if (url === "/api/settings/nextRecipeQuantity")
        return Promise.resolve({value:""});
        if (url === "/api/settings/color")
        return Promise.resolve({value:"default"});
        if (url === "/api/settings/background")
        return Promise.resolve({value:"default"});
      return Promise.resolve({});
    },
  })
);

describe("Home component", () => {
  test("should render correctly", async () => {
    let theContainer;
    await act(() => {
      const { container } = render(<Home />);
      theContainer = container;
    });
    expect(theContainer.firstChild).toMatchSnapshot();
  });
});