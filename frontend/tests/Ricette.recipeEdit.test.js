import "@testing-library/jest-dom/extend-expect";
import React from "react";
import { render, screen, fireEvent, within } from "@testing-library/react";
import Ricette from "../src/pages/Ricette";
import { act } from "react-test-renderer";

var recipes = {
    "recipeID": {
        recipeID: "recipeID", name: "recipeName",
        description: "recipeDescription", ingredients: [
            {
                "name": "ingredientName", "quantity": "1",
                "recipeID": "recipeID", "ingredientID": "ingredientID"
            },
            {
                "name": "ingredientName2", "quantity": "1",
                "recipeID": "recipeID", "ingredientID": "ingredientID2"
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

describe('Ricette.jsx can correctly edit recipe', () => {
    test('open recipe edit', async () => {
        await act(() => {render(<Ricette/>);});
        await act(() => {fireEvent.click(screen.getAllByText("Modifica")[0])});
        expect(screen.getAllByRole("textbox").length).toBeGreaterThanOrEqual(5);
        expect(screen.getAllByRole("textbox").length).toBeLessThanOrEqual(5);
        await act(() => {fireEvent.click(screen.getAllByText("Cancel")[0])});
    })
    test('open recipe edit and set name', async () => {
        await act(() => {render(<Ricette/>);});
        await act(() => {fireEvent.click(screen.getAllByText("Modifica")[0])});
        await act(() => {fireEvent.change(screen.getAllByRole("textbox")[0], {target: {value: "newName"}})});
        await act(() => {fireEvent.click(screen.getAllByText("V")[0])});
        await act(() => {fireEvent.click(screen.getAllByText("Cancel")[0])});
    })
    test('open recipe edit and set description', async () => {
        await act(() => {render(<Ricette/>);});
        await act(() => {fireEvent.click(screen.getAllByText("Modifica")[0])});
        await act(() => {fireEvent.change(screen.getAllByRole("textbox")[1], {target: {value: "newDescription"}})});
        await act(() => {fireEvent.click(screen.getAllByText("V")[1])});
        await act(() => {fireEvent.click(screen.getAllByText("Cancel")[0])});
    })
    test('open recipe edit and update an ingredient', async () => {
        await act(() => {render(<Ricette/>);});
        await act(() => {fireEvent.click(screen.getAllByText("Modifica")[0])});
        await act(() => {fireEvent.change(screen.getAllByRole("textbox")[2], {target: {value: "0"}})});
        await act(() => {fireEvent.click(screen.getAllByText("V")[2])});
        await act(() => {fireEvent.click(screen.getAllByText("Cancel")[0])});
    })
    test('open recipe edit and add an ingredient', async () => {
        await act(() => {render(<Ricette/>);});
        await act(() => {fireEvent.click(screen.getAllByText("Modifica")[0])});
        await act(() => {fireEvent.change(within(screen.getByTestId("ingredient-name-input")).getByRole("combobox"), {target: { value: "newName" },});});
        await act(() => {fireEvent.change(screen.getAllByRole("textbox")[4], {target: {value: "newIngredientDescription"}})});
        await act(() => {fireEvent.click(screen.getAllByText("V")[4])});
        await act(() => {fireEvent.click(screen.getAllByText("Cancel")[0])});
    })
    test('open recipe edit and delete an ingredient', async () => {
        await act(() => {render(<Ricette/>);});
        await act(() => {fireEvent.click(screen.getAllByText("Modifica")[0])});
        await act(() => {fireEvent.click(screen.getAllByText("X")[0])});
        await act(() => {fireEvent.click(screen.getAllByText("Cancel")[0])});
    })
})