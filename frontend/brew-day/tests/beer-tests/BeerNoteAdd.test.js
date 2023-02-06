import React from "react";
import { render, screen, fireEvent, act } from "@testing-library/react";
import BeerEdit from "../../src/components/BeerEdit";
import Birre from "../../src/pages/Birre";

let beer = {
  beerID: "1",
  name: "Beer 1",
  recipeID: "recipe1",
  notes: [],
};

global.fetch = jest.fn().mockImplementation((url) => {
  if (url === "/api/beer") {
    return Promise.resolve({
      json: () => Promise.resolve([beer.beerID]),
    });
  } else if (url.startsWith("/api/beer/")) {
    return Promise.resolve({
      json: () => Promise.resolve(beer),
    });
  } else if (url.startsWith("/api/recipes/")) {
    return Promise.resolve({
      json: () =>
        Promise.resolve({
          recipeID: "recipe1",
          name: "Recipe 1",
          description: "",
          ingredients: [],
        }),
    });
  }
});

test("adds note", async () => {
  await act(() => {
    render(<BeerEdit beerID="1" name="Beer 1" notes={[]} />);
  });
  const addNoteButton = screen.getAllByText("Aggiungi nota")[0];
  const typeNoteArea = screen.getAllByTestId("note-type-textarea")[0];
  const descriptionTextArea = screen.getAllByTestId("description-textarea")[0];
  await act(() => {
    fireEvent.change(typeNoteArea, {
      target: { value: "generic" },
    });
  });
  await act(() => {
    fireEvent.change(descriptionTextArea, {
      target: { value: "added note" },
    });
  });
  beer.notes.push({
    beerID: "1",
    noteID: "note1",
    noteType: "generic",
    description: "added note",
  });
  await act(() => {
    fireEvent.click(addNoteButton);
  });
  await act(() => {
    render(<Birre />);
  });
  const viewDetails = screen.getAllByText("Dettagli")[0];
  await act(() => {
    fireEvent.click(viewDetails);
  });
  expect(screen.getByText("• added note"));
});
