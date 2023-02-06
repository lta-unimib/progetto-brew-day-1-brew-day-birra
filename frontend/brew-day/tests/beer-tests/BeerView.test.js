import React from "react";
import { render, screen, fireEvent, act } from "@testing-library/react";
import BeerView from "../../src/components/BeerView";

global.fetch = jest.fn().mockImplementation(() => {
  return Promise.resolve({
    json: () =>
      Promise.resolve({
        recipeID: "RecipeID1",
        name: "Recipe 1",
        description: "",
        ingredients: [],
      }),
  });
});

test("view recipe from 'Dettagli'", async () => {
  await act(() => {render(<BeerView beerID="1" name="Beer 1" notes={[]} />);});
  await act(() => {screen.getAllByText("Visualizza ricetta")[0]});
  const viewRecipeButton = screen.getAllByText("Visualizza ricetta")[0];
  await act(() => {fireEvent.click(viewRecipeButton)});
  expect(screen.queryAllByText("Recipe 1")[0]);
});

test("Recipe details are visibile only after clicking 'Visualizza ricetta'", async () => {
  await act(() => {render(<BeerView beerID="1" name="Beer 1" notes={[]} />)});
  expect(screen.queryByText("Immagine")).toBeNull();
  const viewRecipeButton = screen.getAllByText("Visualizza ricetta")[0];
  await act(() => {fireEvent.click(viewRecipeButton)});
  expect(screen.queryByText("Immagine"));
});