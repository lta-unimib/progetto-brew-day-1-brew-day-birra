import "@testing-library/jest-dom/extend-expect";
import React from "react";
import { render, screen, fireEvent, waitFor, getByRole } from "@testing-library/react";
import Birre from "../src/pages/Birre";
import { act } from "react-test-renderer";

var recipes = {
    "recipeID": {
        recipeID: "recipeID", name: "recipeName",
        description: "recipeDescription", ingredients: []
    }
}

var beers = {
    "beerID": {
        recipeID: "recipeID", name: "beerName",
        beerID: "beerID", notes: []
    }
}

global.fetch = jest.fn().mockImplementation((url) =>
  Promise.resolve({
    json: () => {
        if (url.startsWith("/api/recipes")) {
            if (url === "/api/recipes")
              return Promise.resolve(Object.keys(recipes));
            else {
                let recipeID = url.replace("/api/recipes/", "");
                return Promise.resolve(recipes[recipeID]);
            }
        } else if (url.startsWith("/api/beer")) {
            if (url === "/api/beer" || url.startsWith("/api/beer?"))
              return Promise.resolve(Object.keys(beers));
            else {
                let beerID = url.replace("/api/beer/", "");
                return Promise.resolve(beers[beerID]);
            }
        }
    },
  })
)

describe('Birre.jsx can correctly render page', () => {
    test('load page', async () => {
        await act(() => {render(<Birre/>);});
        expect(screen.getByText(beers.beerID.name, { exact: false })).toBeInTheDocument();
    })
    
    test('can filter beers', async () => {
        await act(() => {render(<Birre/>);});
        await act(() => fireEvent.change(screen.getAllByRole("textbox")[0], {target: {value: "beerName"}}));
        await act(() => fireEvent.change(screen.getAllByRole("combobox")[0], {target: {value: "recipeID"}}));
        await act(() => fireEvent.click(screen.getAllByText("Filtra")[0]));
        await act(() => fireEvent.click(screen.getAllByText("Togli")[0]));
    })
})