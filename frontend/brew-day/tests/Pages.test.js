import "@testing-library/jest-dom/extend-expect";
import React from "react";
import { render } from "@testing-library/react";
import Home from "../src/pages/Home";
import Spesa from "../src/pages/Spesa";

global.fetch = jest.fn().mockImplementation((url) =>
  Promise.resolve({
    json: () => {
        if (url == "/api/recipes")
          return Promise.resolve(["id"]);
        return Promise.resolve({recipeID: "id", name: "id", description: "desc", ingredients: []});
    },
  })
)

describe("Home component", () => {
  test("should render correctly", () => {
    const { container } = render(<Home />);
    expect(container.firstChild).toMatchSnapshot();
  });
});

describe("Spesa component", () => {
  test("should render correctly", () => {
    const { container } = render(<Spesa />);
    expect(container.firstChild).toMatchSnapshot();
  });
});