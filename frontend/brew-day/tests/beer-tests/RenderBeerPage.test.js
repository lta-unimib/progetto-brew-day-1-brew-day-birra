import React from "react";
import { render, screen, act } from "@testing-library/react";
import Birre from "../../src/pages/Birre";

global.fetch = jest.fn().mockImplementation((url) => {
  if (url.endsWith("/api/beer")) {
    return Promise.resolve({
      json: () =>
        Promise.resolve(["beer1"]),
    });
  } else if (url.endsWith("/api/beer/beer1")) {
    return Promise.resolve({
        json: () =>
          Promise.resolve({
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
          }),
      });
  } else if (url.endsWith("/api/recipes/recipe1")) {
    return Promise.resolve({
        json: () =>
          Promise.resolve({
            recipeID: "recipe1",
            name: "ricetta1",
            description: "Recipe 1's description ",
            ingredients: []
        }),
      });
  }
});

test("Renders all the beers inside the Birre page", async () => {
  await act(() => {render(<Birre />);});
  expect(screen.getByText("Beer 1"));
});