import "@testing-library/jest-dom/extend-expect";
import React from "react";
import { render, screen, fireEvent, waitFor, getByRole } from "@testing-library/react";
import Ricette from "../src/pages/Ricette";
import { act } from "react-test-renderer";

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

function getStatus(url) {
    if (url.startsWith("/api/beers")) {
        return 400;
    } else {
        return 200;
    }
}


global.fetch = jest.fn().mockImplementation((url) => {
    return Promise.resolve({
        status: getStatus(url),
        json: () => {
            if (url == "/api/recipes")
              return Promise.resolve(Object.keys(recipes));
            else if (url.startsWith("/api/recipes/")) {
                let recipeID = url.replace("/api/recipes/", "");
                return Promise.resolve(recipes[recipeID]);
            } else if (url.startsWith("/api/shopping/")) {
                let recipeID = url.replace("/api/shopping/", "");
                return Promise.resolve(recipes[recipeID].ingredients);
            } else if (url.startsWith("/api/settings/")) {
                return Promise.resolve({value : "30"});
            } else {
                return Promise.resolve(null);
            }
        }
    })
})

describe('Ricette.jsx can correctly execute recipe', () => {
    
    test('open recipe execute but dont create beer', async () => {
        await act(() => {render(<Ricette/>);});
        await act(() => {fireEvent.click(screen.getAllByText("Esegui")[1])});
        await act(() => {fireEvent.click(screen.getAllByText("Cancel")[0])});
    })
    
    test('open recipe execute and create beer', async () => {
        await act(() => {render(<Ricette/>);});
        await act(() => {fireEvent.click(screen.getAllByText("Esegui")[0])});
        await act(() => {fireEvent.change(screen.getAllByRole("textbox")[0], {target: {value: "newBeerName"}})});
        await act(() => {fireEvent.change(screen.getAllByRole("textbox")[1], {target: {value: "0"}})});
        await act(() => {fireEvent.click(screen.getAllByText("Crea")[0])});
        await act(() => {fireEvent.click(screen.getAllByText("Cancel")[0])});
    })

    test('open recipe execute and create beer but not enoght equipment', async () => {
        await act(() => {render(<Ricette/>);});
        await act(() => {fireEvent.click(screen.getAllByText("Esegui")[0])});
        await act(() => {fireEvent.change(screen.getAllByRole("textbox")[0], {target: {value: "newBeerName"}})});
        await act(() => {fireEvent.change(screen.getAllByRole("textbox")[1], {target: {value: "90"}})});
        await act(() => {fireEvent.click(screen.getAllByText("Crea")[0])});
        expect(screen.getByText("Equipaggiamento Mancante", { exact: false })).toBeInTheDocument();
    })

    test('open recipe execute and create beer but not enoght ingredient', async () => {
        await act(() => {render(<Ricette/>);});
        await act(() => {fireEvent.click(screen.getAllByText("Esegui")[1])});
        await act(() => {fireEvent.change(screen.getAllByRole("textbox")[0], {target: {value: "newBeerName"}})});
        await act(() => {fireEvent.change(screen.getAllByRole("textbox")[1], {target: {value: "1"}})});
        await act(() => {fireEvent.click(screen.getAllByText("Crea")[0])});
        expect(await screen.findByText("Ingredienti Mancanti", { exact: false })).toBeInTheDocument();
    })
})