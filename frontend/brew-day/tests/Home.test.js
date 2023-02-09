import "@testing-library/jest-dom/extend-expect";
import React from "react";
import { render, screen, act } from "@testing-library/react";
import Home from "../src/pages/Home";

global.fetch = jest.fn().mockImplementation((url) =>
  Promise.resolve({
    json: () => {
        if (url == "/api/advice")
          return Promise.resolve({
            recipeID: "recipe1",
            quantity: 30.0
        });
        else if (url == "/api/recipes/recipe1") {
            return Promise.resolve({
              recipeID: "recipe1",
              name: "ricetta luppoli",
              description: "test",
              ingredients: [{
                  ingredientID: "ingredient1",
                  name: "luppoli",
                  quantity: 3.0,
                  recipeID: "recipe1"
              }]
          });
        } else {
          return Promise.resolve([]);
        }
    },
  })
)

describe("Home component", () => {
  test("If response is not null, show recipe to execute", async () => {
    await act(() => render(<Home />));
    expect(screen.getByText("Crea")).toBeInTheDocument();
  });
});
