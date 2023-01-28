import "@testing-library/jest-dom/extend-expect";
import React from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import Birre from "../src/pages/Birre";
import Home from "../src/pages/Home";
import Spesa from "../src/pages/Spesa";
import Inventario from "../src/pages/Inventario";

global.fetch = jest.fn().mockImplementation(() =>
  Promise.resolve({
    json: () =>
      Promise.resolve([
        { name: "ingredient1", quantity: 2.0 },
        { name: "ingredient2", quantity: 3.0 },
      ]),
  })
);

describe("Inventario component", () => {
  test("loads the inventory on mount", async () => {
    render(<Inventario />);
    await screen.findByText("ingredient1", { exact: false });
    expect(screen.getByText("ingredient1")).toBeInTheDocument();
    expect(screen.getByText("ingredient2")).toBeInTheDocument();
  });

  test("renders the inventory items", async () => {
    render(<Inventario />);
    await screen.findByText("ingredient1", { exact: false });
    expect(screen.getAllByText("ingredient1")).toHaveLength(1);
    expect(screen.getAllByText("ingredient2")).toHaveLength(1);
  });

  test("deletes an item from the inventory and updates the state", async () => {
    render(<Inventario />);
    await waitFor(() => screen.getAllByText("Elimina ingrediente"));
    const deleteButton = screen.getAllByText("Elimina ingrediente")[0];
    fireEvent.click(deleteButton);
    await waitFor(() => {
      expect(screen.queryByText("ingredient1")).not.toBeInTheDocument();
    });
  });

  it("displays loading message while data is being fetched", async () => {
    render(<Inventario />);
    await waitFor(() => screen.getByText("Caricamento..."));
    expect(screen.getByText("Caricamento...")).toBeInTheDocument();
  });
});

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
