import "@testing-library/jest-dom/extend-expect";
import React from "react";
import { render, screen, fireEvent, within } from "@testing-library/react";
import Birre from "../src/pages/Birre";
import { act } from "react-test-renderer";
import { RECIPE_ENDPOINT, RECIPE_LIST_ENDPOINT, SETTINGS_ENDPOINT } from "../src/utils/Protocol";

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
    },
    "beerID2": {
        recipeID: "recipeID", name: "beerNome",
        beerID: "beerID2", notes: []
    }
}

global.fetch = jest.fn().mockImplementation((url) =>
  Promise.resolve({
    json: () => {
      if (url.startsWith(SETTINGS_ENDPOINT + "equipment"))
          return Promise.resolve({value:"30"})
          if (url.startsWith(SETTINGS_ENDPOINT))
            return Promise.resolve({value:"default"})
        if (url.startsWith("/api/recipes")) {
            if (url === "/api/recipes")
              return Promise.resolve(Object.keys(recipes));
            else {
                let recipeID = url.replace("/api/recipes/", "");
                return Promise.resolve(recipes[recipeID]);
            }
        } else if (url.startsWith("/api/beers")) {
            if (url === "/api/beers" || url.startsWith("/api/beers?"))
              return Promise.resolve(Object.keys(beers));
            else {
                let beerID = url.replace("/api/beers/", "");
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
        fireEvent.mouseDown(screen.getByLabelText("Recipe"));
        fireEvent.mouseDown(within(screen.getByRole("listbox")).getByText("recipeName"));
        await act(() => fireEvent.click(screen.getAllByText("Filtra")[0]));
        await act(() => fireEvent.click(screen.getAllByText("Togli")[0]));
    })
})
