import "@testing-library/jest-dom/extend-expect";
import React from "react";
import { render, screen, fireEvent, within } from "@testing-library/react";
import Ricette from "../src/pages/Ricette";
import { act } from "react-test-renderer";
import { RECIPE_ENDPOINT, RECIPE_LIST_ENDPOINT, SETTINGS_ENDPOINT } from "../src/utils/Protocol";

var recipes = {
    "recipeID": {
        recipeID: "recipeID", name: "recipeName",
        description: "recipeDescription", ingredients: []
    }
}

const theIngredient = {
                "name": "ingredientName", "quantity": "1",
                "recipeID": "recipeID", "ingredientID": "ingredientID"
            };

global.fetch = jest.fn().mockImplementation((url) =>
  Promise.resolve({
    json: () => {
        if (url.startsWith(SETTINGS_ENDPOINT))
          return Promise.resolve({value:"default"})
        if (url == RECIPE_LIST_ENDPOINT)
          return Promise.resolve(Object.keys(recipes));
        else {
            if (url.startsWith(RECIPE_ENDPOINT)) {
                let recipeID = url.replace(RECIPE_ENDPOINT, "");
                return Promise.resolve(recipes[recipeID]);
            } else {
                return Promise.resolve(null);
            }
        }
    },
  })
)

describe('Ricette.jsx can correctly edit recipe', () => {
    test('open recipe edit and add an ingredient', async () => {
        await act(() => {render(<Ricette/>);});
        await act(() => {fireEvent.click(screen.getAllByText("Modifica")[0])});
        await act(() => {fireEvent.change(screen.getAllByRole("combobox")[0], {target: {value: "newIngredientName"}})});
        await act(() => {fireEvent.change(screen.getAllByRole("textbox")[2], {target: {value: "12"}})});
        await act(() => {fireEvent.click(screen.getAllByText("Aggiungi")[0])});
        await act(() => {fireEvent.click(screen.getAllByText("Cancel")[0])});
    })

  test("open recipe edit and rename recipe with invalid name", async () => {
        await act(() => {render(<Ricette/>);});
        await act(() => {fireEvent.click(screen.getAllByText("Modifica")[0])});
        await act(() => {fireEvent.change(screen.getAllByRole("textbox")[0], {target: {value: ""}})});
        await act(() => {fireEvent.click(screen.getAllByText("Aggiorna")[0])});
        await act(() => {fireEvent.click(screen.getAllByText("Cancel")[0])});
   })

  test('open recipe edit and attempt add an ingredient with invalid name', async () => {
        await act(() => {render(<Ricette/>);});
        await act(() => {fireEvent.click(screen.getAllByText("Modifica")[0])});
        await act(() => {fireEvent.change(screen.getAllByRole("combobox")[0], {target: {value: ""}})});
        await act(() => {fireEvent.change(screen.getAllByRole("textbox")[2], {target: {value: "12"}})});
        await act(() => {fireEvent.click(screen.getAllByText("Aggiungi")[0])});
        await act(() => {fireEvent.click(screen.getAllByText("Cancel")[0])});
  })

  test('open recipe edit and attempt add an ingredient with valid name', async () => {
        await act(() => {render(<Ricette/>);});
        await act(() => {fireEvent.click(screen.getAllByText("Modifica")[0])});
        await act(() => {fireEvent.change(screen.getAllByRole("combobox")[0], {target: {value: "boh"}})});
        await act(() => {fireEvent.change(screen.getAllByRole("textbox")[2], {target: {value: "12"}})});
        await act(() => {fireEvent.click(screen.getAllByText("Aggiungi")[0])});
        await act(() => {fireEvent.click(screen.getAllByText("Cancel")[0])});
  })

  test('open recipe edit and attempt add an ingredient with valid but already present name', async () => {
        recipes.recipeID.ingredients.push(theIngredient);
        await act(() => {render(<Ricette/>);});
        await act(() => {fireEvent.click(screen.getAllByText("Modifica")[0])});
        await act(() => {fireEvent.change(screen.getAllByRole("combobox")[0], {target: {value: "ingredientName"}})});
        await act(() => {fireEvent.change(screen.getAllByRole("textbox")[2], {target: {value: "24"}})});
        await act(() => {fireEvent.click(screen.getAllByText("Aggiungi")[0])});
        await act(() => {fireEvent.click(screen.getAllByText("Cancel")[0])});
  })
})
