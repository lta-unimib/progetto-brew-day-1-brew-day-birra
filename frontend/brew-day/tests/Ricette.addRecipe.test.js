import "@testing-library/jest-dom/extend-expect";
import React from "react";
import { render, screen, fireEvent, waitFor, getByRole } from "@testing-library/react";
import Ricette from "../src/pages/Ricette";
import { act } from "react-test-renderer";

var recipes = {
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

describe('Ricette.jsx can correctly add recipe', () => {
    test('can add recipe', async () => {
        await act(() => {render(<Ricette/>);});
        await act(() => fireEvent.change(screen.getAllByRole("textbox")[1], {target: {value: "newRecipeName"}}));
        await act(() => fireEvent.change(screen.getAllByRole("textbox")[2], {target: {value: "newRecipeDescription"}}));
        await act(() => fireEvent.click(screen.getAllByText("Aggiungi")[0]));
    })
})