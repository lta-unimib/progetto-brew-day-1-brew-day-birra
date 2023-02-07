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

describe('Birre.jsx can correctly edit recipe', () => {
    test('open beer edit', async () => {
        await act(() => {render(<Birre/>);});
        await act(() => {fireEvent.click(screen.getAllByText("Modifica")[0])});
        expect(screen.getAllByRole("textbox").length).toBeGreaterThanOrEqual(5);
        expect(screen.getAllByRole("textbox").length).toBeLessThanOrEqual(5);
        await act(() => {fireEvent.click(screen.getAllByText("Cancel")[0])});
    })
    
    test('open beer edit and set name', async () => {
        await act(() => {render(<Birre/>);});
        await act(() => {fireEvent.click(screen.getAllByText("Modifica")[0])});
        await act(() => {fireEvent.change(screen.getAllByRole("textbox")[0], {target: {value: "newName"}})});
        await act(() => {fireEvent.click(screen.getAllByText("V")[0])});
        await act(() => {fireEvent.click(screen.getAllByText("Cancel")[0])});
    })
    
    test('open beer edit and update a note', async () => {
        await act(() => {render(<Birre/>);});
        await act(() => {fireEvent.click(screen.getAllByText("Modifica")[0])});
        await act(() => {fireEvent.change(screen.getAllByRole("textbox")[1], {target: {value: "newNoteType"}})});
        await act(() => {fireEvent.change(screen.getAllByRole("textbox")[2], {target: {value: "newNoteDescription"}})});
        await act(() => {fireEvent.click(screen.getAllByText("V")[1])});
        await act(() => {fireEvent.click(screen.getAllByText("Cancel")[0])});
    })
    
    test('open beer edit and add a note', async () => {
        await act(() => {render(<Birre/>);});
        await act(() => {fireEvent.click(screen.getAllByText("Modifica")[0])});
        await act(() => {fireEvent.change(screen.getAllByRole("textbox")[3], {target: {value: "newNoteType"}})});
        await act(() => {fireEvent.change(screen.getAllByRole("textbox")[4], {target: {value: "newNoteDescription"}})});
        await act(() => {fireEvent.click(screen.getAllByText("V")[2])});
        await act(() => {fireEvent.click(screen.getAllByText("Cancel")[0])});
    })
    
    test('open beer edit and delete a note', async () => {
        await act(() => {render(<Birre/>);});
        await act(() => {fireEvent.click(screen.getAllByText("Modifica")[0])});
        await act(() => {fireEvent.click(screen.getAllByText("X")[0])});
        await act(() => {fireEvent.click(screen.getAllByText("Cancel")[0])});
    })
})