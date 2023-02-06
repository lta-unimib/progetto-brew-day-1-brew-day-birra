import React from "react";
import { render, screen, fireEvent, act } from "@testing-library/react";
import BeerEdit from "../../src/components/BeerEdit";

let beer = {
    beerID: "1",
    name: "Beer 1",
    recipeID: "recipe1",
    notes: [
      {
        beerID: "1",
        noteID: "noteID1",
        noteType: "generic",
        description: "Description 1",
      },
    ],
};

global.fetch = jest.fn().mockImplementation(() => {
  return Promise.resolve({
    json: () =>
      Promise.resolve(beer),
  });
});

test("deletes note", async () => {
  await act(() => {
    render(
      <BeerEdit
        beerID="1"
        name="Beer 1"
        notes={[
          {
            beerID: "1",
            noteID: "noteID1",
            noteType: "generic",
            description: "Description 1",
          },
        ]}
      />
    );
  });
  await act(() => {
    screen.getAllByText("Elimina nota")[0];
  });
  const deleteButton = screen.getAllByText("Elimina nota")[0];
  beer.notes = [];
  await act(() => {
    fireEvent.click(deleteButton);
  });
  expect(screen.queryByText("Description 1")).toBeNull();
});