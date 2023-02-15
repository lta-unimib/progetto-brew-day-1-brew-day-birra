import "@testing-library/jest-dom/extend-expect";
import React from "react";
import { render, screen, act } from "@testing-library/react";
import Home from "../src/pages/Home";
import { RECIPE_ENDPOINT, RECIPE_LIST_ENDPOINT, SETTINGS_ENDPOINT } from "../src/utils/Protocol";

global.fetch = jest.fn().mockImplementation((url) =>
  Promise.resolve({
    json: () => {
      if (url.startsWith(SETTINGS_ENDPOINT + "equipment"))
          return Promise.resolve({value:"30"})
      if (url === "/api/settings/nextRecipeID")
        return Promise.resolve({ value: "recipe1" });
      if (url.startsWith(SETTINGS_ENDPOINT))
        return Promise.resolve({value:"default"})
      if (url == "/api/advice") {
        return Promise.resolve({
          recipeID: "recipe1",
          quantity: 30.0,
        });
      } else if (url == "/api/recipes/recipe1") {
        return Promise.resolve({
          recipeID: "recipe1",
          name: "ricetta luppoli",
          description: "test",
          ingredients: [
            {
              ingredientID: "ingredient1",
              name: "luppoli",
              quantity: 3.0,
              recipeID: "recipe1",
            },
          ],
        });
      }
      return Promise.resolve([]);
    }
  })
);

describe("Home component", () => {
  test("If response is not null, show recipe to execute", async () => {
    await act(() => render(<Home />));
    expect(screen.getAllByText("Crea")[0]).toBeInTheDocument();
  });
});
