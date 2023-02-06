import "@testing-library/jest-dom/extend-expect";
import React from "react";
import { render, screen, fireEvent, waitFor, getByRole } from "@testing-library/react";
import Ricette from "../src/pages/Ricette";
import { act } from "react-test-renderer";

var recipes = {
    "recipeID": {
        recipeID: "recipeID", name: "recipeName",
        description: "recipeDescription", ingredients: [
            {
                "recipeID": "recipeID", "ingredientID": "ingredientID",
                "name": "malto", "quantity": "0"
            },
            {
                "recipeID": "recipeID", "ingredientID": "ingredientID2",
                "name": "ingsoc", "quantity": "0"
            }
        ]
    }
}

global.fetch = jest.fn().mockImplementation((url) =>
  Promise.resolve({
    json: () => {
        if (url == "/api/recipes")
          return Promise.resolve(Object.keys(recipes));
        else {
            if (url.startsWith("/api/recipes/")) {
                let recipeID = url.replace("/api/recipes/", "");
                return Promise.resolve(recipes[recipeID]);
            } else {
                return Promise.resolve(null);
            }
        }
    },
  })
)

describe('Ricette.jsx can correctly render page', () => {
    test('open and close recipe view', async () => {
        await act(() => {render(<Ricette/>);});
        await act(() => {fireEvent.click(screen.getAllByText("Dettagli")[0])});
        Object.keys(recipes).forEach((recipeID) => {
            let recipe = recipes[recipeID];
            expect(screen.getAllByText(recipe.name)[1]).toBeInTheDocument();
            expect(screen.getAllByText(recipe.description)[1]).toBeInTheDocument();
            recipe.ingredients.forEach((ing) => expect(screen.getAllByText(ing.name)[0]).toBeInTheDocument());
        })
        await act(() => {fireEvent.click(screen.getAllByText("Cancel")[0])});
    })
})