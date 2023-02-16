import "@testing-library/jest-dom/extend-expect";
import React from "react";
import { render, screen, fireEvent, waitFor, getByRole } from "@testing-library/react";
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
        name: "beerName", recipeID: null,
        beerID: "beerID", notes: []
    },
    "beerID2": {
        recipeID: "recipeID", name: "beerName2",
        beerID: "beerID2", notes: [
            {
                beerID: "beerID2", noteID: "noteID",
                noteType: "generic", description: "noteDescription"
            }
        ]
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
    test('open and close beer view', async () => {
        await act(() => {render(<Birre/>);});
        await act(() => {fireEvent.click(screen.getAllByText("Dettagli")[0])});
        expect(screen.getAllByText(beers.beerID.name)[1]).toBeInTheDocument();
        await act(() => {fireEvent.click(screen.getAllByText("Cancel")[0])});
    })
    
    test('open and close beer view, view recipe', async () => {
        await act(() => {render(<Birre/>);});
        await act(() => {fireEvent.click(screen.getAllByText("Dettagli")[1])});
        beers.beerID2.notes.forEach(note => expect(screen.getAllByText(note.description, {exact: false})[0]).toBeInTheDocument());
        await act(() => {fireEvent.click(screen.getAllByText("Visualizza Ricetta")[0])});
        await act(() => {fireEvent.click(screen.getAllByText("Cancel")[0])});
    })
})
