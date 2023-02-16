import "@testing-library/jest-dom/extend-expect";
import React from "react";
import { render, screen, fireEvent, getByRole } from "@testing-library/react";
import Ricette from "../src/pages/Ricette";
import { act } from "react-test-renderer";
import { RECIPE_ENDPOINT, RECIPE_LIST_ENDPOINT, SETTINGS_ENDPOINT } from "../src/utils/Protocol";

var recipes = {
}

global.fetch = jest.fn().mockImplementation((url) =>
    Promise.resolve({
        json: () => {
            if (url.startsWith(SETTINGS_ENDPOINT + "equipment"))
                return Promise.resolve({value:"30"})
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

describe('Ricette.jsx can correctly add recipe', () => {
    test('can add recipe', async () => {
        await act(() => {render(<Ricette/>);});
        await act(() => fireEvent.change(screen.getAllByRole("textbox")[1], {target: {value: "newRecipeName"}}));
        await act(() => fireEvent.change(screen.getAllByRole("textbox")[2], {target: {value: "newRecipeDescription"}}));
        await act(() => fireEvent.click(screen.getAllByText("Aggiungi")[0]));
    })
})
