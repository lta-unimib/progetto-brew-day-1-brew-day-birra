import "@testing-library/jest-dom/extend-expect";
import React from "react";
import { render, screen, fireEvent, within } from "@testing-library/react";
import Ricette from "../src/pages/Ricette";
import { act } from "react-test-renderer";
import userEvent from "@testing-library/user-event";

var recipes = {
    "recipeID": {
        recipeID: "recipeID", name: "recipeName",
        description: "recipeDescription", ingredients: []
    }
}

global.fetch = jest.fn().mockImplementation((url) =>
  Promise.resolve({
    json: () => {
        if (url.startsWith("/api/recipes?name="))
          return Promise.resolve(Object.keys(recipes));
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
    test('load page', async () => {
        await act(() => {render(<Ricette/>);});
        expect(screen.getAllByText(recipes.recipeID.name, { exact: false })[0]).toBeInTheDocument();
        expect(screen.getByText(recipes.recipeID.description, { exact: false })).toBeInTheDocument();
    })
    
    test('can filter recipes', async () => {
        await act(() => {render(<Ricette/>);});
        await act(() => fireEvent.change(screen.getAllByRole("textbox")[0], {target: {value: "recipeName"}}));
        await act(() => userEvent.click(screen.getByLabelText("Recipe")));
        await act(() => userEvent.click(within(screen.getByRole("listbox")).getByText("recipeName")));
        await act(() => fireEvent.click(screen.getAllByText("Filtra")[0]));
        await act(() => fireEvent.click(screen.getAllByText("Togli")[0]));
    })
})