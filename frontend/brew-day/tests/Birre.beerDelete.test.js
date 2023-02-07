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
      name: "beerName", recipeID: null,
      beerID: "beerID", notes: [
        {
          beerID: "beerID", noteID: "noteID",
          noteType: "generic", description: "noteDescription"
        }
      ]
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
  test('open beer delete but dont delete', async () => {
      await act(() => {render(<Birre/>);});
      await act(() => {fireEvent.click(screen.getAllByText("Elimina")[0])});
      expect(screen.getByText("Sei sicuro di voler eliminare questa birra?", {exact: false})).toBeInTheDocument();
      await act(() => {fireEvent.click(screen.getAllByText("Cancel")[0])});
  })
  
  test('open beer delete and delete', async () => {
      await act(() => {render(<Birre/>);});
      await act(() => {fireEvent.click(screen.getAllByText("Elimina")[0])});
      delete beers.beerID;
      await act(() => {fireEvent.click(screen.getByText("Conferma"))});
      expect(screen.queryByText("beerName")).toBeNull();
  })
})