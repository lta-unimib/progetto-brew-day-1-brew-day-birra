import "@testing-library/jest-dom/extend-expect";
import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import Ricette from "../src/pages/Ricette";
import { act } from "react-test-renderer";
import { RECIPE_ENDPOINT, RECIPE_LIST_ENDPOINT, SETTINGS_ENDPOINT, SHOPPING_ENDPOINT } from "../src/utils/Protocol";

var recipes = {
    "recipeID": {
        recipeID: "recipeID", name: "recipeName",
        description: "recipeDescription", ingredients: []
    },
    "recipeID2": {
        recipeID: "recipeID2", name: "recipeName2",
        description: "recipeDescription2", ingredients: [
            {
                "name": "malto", "quantity": "1",
                "recipeID": "recipeID2", "ingredientID": "ingredientID"
            },
            {
                "name": "ingredientName2", "quantity": "1",
                "recipeID": "recipeID2", "ingredientID": "ingredientID2"
            }
        ]
    }
}

var statusFlick = true;

function getStatus(url) {
    if (url.startsWith("/api/beers") && (!statusFlick)) {
        return 400;
    } else {
        return 200;
    }
}

global.fetch = jest.fn().mockImplementation((url) => {
    return Promise.resolve({
        status: getStatus(url),
        json: () => {
            if (url.startsWith(SETTINGS_ENDPOINT + "equipment"))
              return Promise.resolve({value:"30"})
              if (url.startsWith(SETTINGS_ENDPOINT))
                return Promise.resolve({value:"default"})
            if (url === RECIPE_LIST_ENDPOINT)
              return Promise.resolve(Object.keys(recipes));
            else if (url.startsWith(RECIPE_ENDPOINT)) {
                let recipeID = url.replace(RECIPE_ENDPOINT, "");
                return Promise.resolve(recipes[recipeID]);
            } else if (url.startsWith(SHOPPING_ENDPOINT)) {
                let recipeID = url.replace(SHOPPING_ENDPOINT, "");
                return Promise.resolve(recipes[recipeID].ingredients);
            } else {
                return Promise.resolve(null);
            }
        }
    })
})

describe('Ricette.jsx can correctly execute recipe', () => {
    
    test('open recipe execute but dont create beer', async () => {
        await act(() => {render(<Ricette/>);});
        await act(() => {fireEvent.click(screen.getAllByLabelText("Esegui")[1])});
        await act(() => {fireEvent.click(screen.getAllByText("Cancel")[0])});
    })
    
    test('open recipe execute and create beer', async () => {
        await act(() => {render(<Ricette/>);});
        await act(() => {fireEvent.click(screen.getAllByLabelText("Esegui")[0])});
        await act(() => {fireEvent.change(screen.getByLabelText("Beer Name"), {target: {value: "newBeerName"}})});
        await act(() => {fireEvent.change(screen.getByLabelText("Beer Quantity"), {target: {value: "12"}})});
        await act(() => {fireEvent.click(screen.getAllByText("Crea")[0])});
        await act(() => {fireEvent.click(screen.getAllByText("Cancel")[0])});
    })

    test('open recipe execute and create beer but not enoght equipment', async () => {
        await act(() => {render(<Ricette/>);});
        await act(() => {fireEvent.click(screen.getAllByLabelText("Esegui")[0])});
        await act(() => {fireEvent.change(screen.getByLabelText("Beer Name"), {target: {value: "newBeerName"}})});
        await act(() => {fireEvent.change(screen.getByLabelText("Beer Quantity"), {target: {value: "90"}})});
        await act(() => {fireEvent.click(screen.getAllByText("Crea")[0])});
    })

    test('open recipe execute and create beer but not enoght ingredient', async () => {
        statusFlick = false;
        await act(() => {render(<Ricette/>);});
        await act(() => {fireEvent.click(screen.getAllByLabelText("Esegui")[1])});
        await act(() => {fireEvent.change(screen.getByLabelText("Beer Name"), {target: {value: "newBeerName"}})});
        await act(() => {fireEvent.change(screen.getByLabelText("Beer Quantity"), {target: {value: "1"}})});
        await act(() => {fireEvent.click(screen.getAllByText("Crea")[0])});
    })
})