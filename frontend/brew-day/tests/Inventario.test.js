import "@testing-library/jest-dom/extend-expect";
import React from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import Inventario from "../src/pages/Inventario";
import { act } from "react-test-renderer";

var ingredients = [
  { name: "ingredient1", quantity: 2.0, ingredientID: "ingredient1" },
  { name: "luppoli", quantity: 3.0, ingredientID: "luppoli" },
]

global.fetch = jest.fn().mockImplementation(() =>
  Promise.resolve({
    json: () =>
      Promise.resolve(ingredients),
  })
);

describe("Inventario component", () => {
  test("loads the inventory on mount", async () => {
    await act(() => render(<Inventario />));
    expect(screen.getByText("ingredient1")).toBeInTheDocument();
    expect(screen.getByText("luppoli")).toBeInTheDocument();
  });

  test("renders the inventory items", async () => {
    await act(() => render(<Inventario />));
    expect(screen.getAllByText("ingredient1")).toHaveLength(1);
    expect(screen.getAllByText("luppoli")).toHaveLength(1);
  });

  test("sets the default image if the requested image is not found", async () => {
    await act(() => render(<Inventario />));

    const img = await screen.findByAltText('ingredient1');
    expect(img.getAttribute('src')).toContain('ingredient1.png');

    await act(() => fireEvent.error(img));

    const _img = await screen.findByAltText('ingredient1');
    expect(_img.getAttribute('src')).toContain('sconosciuto.png');
  });

  test("deletes an item from the inventory and updates the state", async () => {
    await act(() => render(<Inventario />));
    const deleteButton = screen.getAllByText("Elimina")[0];
    await act(() => fireEvent.click(deleteButton));
    ingredients = ingredients.filter((ingredient) => ingredient.name != "ingredient1");
    const confirmDeleteButton = screen.getAllByText("Conferma")[0];
    await act(() => fireEvent.click(confirmDeleteButton));
    expect(screen.queryByText("ingredient1")).not.toBeInTheDocument();
  });
});