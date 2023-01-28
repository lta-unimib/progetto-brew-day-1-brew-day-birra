import "@testing-library/jest-dom/extend-expect";
import React from "react";
import { render, fireEvent } from "@testing-library/react";
import Birre from "../src/pages/Birre";
import Home from "../src/pages/Home";
import Spesa from "../src/pages/Spesa";

describe("Birre component", () => {
  test("should render correctly", () => {
    const { container } = render(<Birre />);
    expect(container.firstChild).toMatchSnapshot();
  });
});

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
