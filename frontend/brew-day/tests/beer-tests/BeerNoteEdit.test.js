import React from "react";
import { render, screen, fireEvent, act } from "@testing-library/react";
import BeerEdit from "../../src/components/BeerEdit";
import Birre from "../../src/pages/Birre";

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

global.fetch = jest.fn().mockImplementation((url) => {
  if (url === "/api/beer") {
    return Promise.resolve({
      json: () => Promise.resolve([beer.beerID]),
    });
  } else if (url.startsWith("/api/beer/")) {
    return Promise.resolve({
      json: () => Promise.resolve(beer),
    });
  } else if (url.startsWith('/api/recipes/')) {
    return Promise.resolve({
        json: () => Promise.resolve({
            recipeID: "recipe1",
            name: "Recipe 1",
            description: "",
            ingredients: [],
          }),
      });
  }
});

test("edits note", async () => {
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
    screen.getAllByText("Modifica nota")[0];
  });
  const editNoteButton = screen.getAllByText("Modifica nota")[0];
  const descriptionTextArea = screen.getAllByTestId("description-textarea")[0];
  await act(() => {
    fireEvent.change(descriptionTextArea, {
      target: { value: "edited description" },
    });
  });
  beer.notes[0].description = "edited description";
  await act(() => {
    fireEvent.click(editNoteButton);
  });
  await act(() => {
    render(<Birre />);
  });
  const viewDetails = screen.getAllByText("Dettagli")[0];
  await act(() => {
    fireEvent.click(viewDetails);
  });
  expect(screen.getByText("• edited description"));
});
