import "@testing-library/jest-dom/extend-expect";
import React from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import Birre from "../src/pages/Birre";
import Home from "../src/pages/Home";
import Spesa from "../src/pages/Spesa";
import Ricette from "../src/pages/Ricette";

global.fetch = jest.fn().mockImplementation((url) =>
  Promise.resolve({
    json: () => {
        if (url == "/api/recipes")
          return Promise.resolve(["id"]);
        return Promise.resolve({recipeID: "id", name: "id", ingredients: []});
    },
  })
)

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

describe("Ricette component", () => {
  test("loads the recipes on mount", async () => {
    render(<Ricette />);
    await screen.findByText("id", { exact: false });
    expect(screen.getByText("id")).toBeInTheDocument();
  });

  test("renders the recipes items", async () => {
    render(<Ricette />);
    await screen.findByText("id", { exact: false });
    expect(screen.getAllByText("id")).toHaveLength(1);
  });

  test("rendes the view of recipe", async () => {
    const {container} = render(<Ricette />);
    await waitFor(() => screen.getAllByText("Dettagli"));
    const viewButton = screen.getAllByText("Dettagli")[0];
    fireEvent.click(viewButton);
    const modal = container.querySelector(".modal");
    fireEvent.click(modal);
  });

  test("rendes the edit of recipe", async () => {
    render(<Ricette />);
    await waitFor(() => screen.getAllByText("Modifica"));
    const editButton = screen.getAllByText("Modifica")[0];
    fireEvent.click(editButton);
  });

  test("rendes the deletion of recipe", async () => {
    render(<Ricette />);
    await waitFor(() => screen.getAllByText("Elimina"));
    const deleteButton = screen.getAllByText("Elimina")[0];
    fireEvent.click(deleteButton);
  });

  test("rendes the addition of recipe", async () => {
    render(<Ricette />);
    await waitFor(() => screen.getAllByText("V"));
    const addButton = screen.getAllByText("V")[0];
    fireEvent.click(addButton);
  });

  test("changes values for addition of recipe", async () => {
    const {container} = render(<Ricette />);
    const inputs = container.querySelectorAll("input");
    fireEvent.change(inputs[0], { target: { value: "name" } });
    fireEvent.change(inputs[1], { target: { value: "description" } });
    expect(inputs[0].value).toBe("name");
    expect(inputs[1].value).toBe("description");
  });
});
