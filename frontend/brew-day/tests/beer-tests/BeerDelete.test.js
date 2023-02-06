import React from "react";
import { render, screen, act, fireEvent } from "@testing-library/react";
import Birre from "../../src/pages/Birre";

let beer = {
  beerID: "beer1",
  name: "Beer 1",
  recipeID: "recipe1",
  notes: [
    {
      beerID: "beer1",
      noteID: "note1",
      noteType: "generic",
      description: "Beer 1's description",
    },
  ],
};

let recipe = {
  recipeID: "recipe1",
  name: "ricetta1",
  description: "Recipe 1's description",
  ingredients: [],
};

global.fetch = jest.fn().mockImplementation((url) => {
  if (url === "/api/beer") {
    return Promise.resolve({
      json: () =>
        Promise.resolve('beerID' in beer ? [beer.beerID] : []),
    });
  } else if (url.startsWith("/api/recipes/")) {
    return Promise.resolve({
      json: () => Promise.resolve(recipe),
    });
  } else if (url.startsWith("/api/beer/")) {
    return Promise.resolve({
      json: () => Promise.resolve(beer),
    });
  }
});

test("deletes beer", async () => {
  await act(() => render(<Birre />));
  await act(() => fireEvent.click(screen.getAllByText("Elimina")[0]));
  beer = {};
  await act(() => fireEvent.click(screen.getAllByText("Elimina")[1]));
  expect(screen.queryByText("Beer 1")).toBeNull();
});
