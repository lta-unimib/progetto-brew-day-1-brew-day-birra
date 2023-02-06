import React from "react";
import { render, screen, waitFor, fireEvent } from "@testing-library/react";
import Ricette from "../src/pages/Ricette";
import Birre from "../src/pages/Birre";

global.fetch = jest.fn().mockImplementation((url) => {
  if (url.endsWith("/recipes")) {
    return Promise.resolve({
        json: () => Promise.resolve(["ricetta1", "ricetta2"]),
      });
  } else if (url.endsWith("/recipes/ricetta1")) {
    return Promise.resolve({
      json: () =>
        Promise.resolve({
            recipeID: "ricetta1",
            name: "Ricetta 1",
            description: "Descrizione Ricetta 1",
            ingredients: [{
                ingredientID: "ingrediente1",
                name: "acqua",
                quantity: 15.0,
                recipeID: "ricetta1"
            }, {
                ingredientID: "ingrediente2",
                name: "luppoli",
                quantity: 5.0,
                recipeID: "ricetta1"
            }]
        }),
    });
  } else if (url.endsWith("/recipes/ricetta2")) {
    return Promise.resolve({
      json: () =>
      Promise.resolve({
          recipeID: "ricetta2",
          name: "Ricetta 2",
          description: "Descrizione Ricetta 2",
          ingredients: [{
              ingredientID: "ingrediente1",
              name: "acqua",
              quantity: 5.0,
              recipeID: "ricetta2"
          }, {
              ingredientID: "ingrediente2",
              name: "luppoli",
              quantity: 5.0,
              recipeID: "ricetta2"
          }]
      }),
    });
  } else if(url.endsWith("/shopping/ricetta1")) {
    return Promise.resolve({
        json: () =>
        Promise.resolve([{
            ingredientID: "ingrediente1",
            name: "acqua",
            quantity: 1.0
        }]),
      });
  } else if(url.endsWith("/shopping/ricetta2")) {
    return Promise.resolve({
        json: () =>
        Promise.resolve([]),
      });
  } else if (url.endsWith("/api/beer")) {
    return Promise.resolve({
        json: () =>
        Promise.resolve([]),
      });
  }
});

describe("RecipeExecute component", () => {
    test("renders missing ingredients when executing", async () => {
        render(<Ricette />);
        await waitFor(() => screen.getAllByText("Esegui")[0]);
        const editButton = screen.getAllByText("Esegui")[0];
        fireEvent.click(editButton);
        await waitFor(() => screen.getByText("Ingredienti Mancanti"));
        expect(screen.getByText("Ingredienti Mancanti"));
    });
    
    test("executes beer when ingredients are not missing", async () => {
        render(<Ricette />);
        await waitFor(() => screen.getAllByText("Esegui")[1]);
        const editButton = screen.getAllByText("Esegui")[1];
        fireEvent.click(editButton);
        await waitFor(() => screen.getByText("Crea birra"));
        const executeButton = screen.getAllByText("Crea birra")[0];
        fireEvent.click(executeButton);
        render(<Birre />);
        await waitFor(() => screen.getByText("new Beer"));
        expect(screen.getByText("new Beer"));
    });
});