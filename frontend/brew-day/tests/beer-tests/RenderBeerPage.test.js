import React from "react";
import {
  render,
  screen,
  act,
  waitFor,
  fireEvent,
} from "@testing-library/react";
import Birre from "../../src/pages/Birre";

global.fetch = jest.fn().mockImplementation((url) => {
  if (url.endsWith("/api/beer")) {
    return Promise.resolve({
      json: () => Promise.resolve(["beer1"]),
    });
  } else if (url.endsWith("/api/beer/beer1")) {
    return Promise.resolve({
      json: () =>
        Promise.resolve({
          beerID: "beer1",
          name: "Beer 1",
          recipeID: "recipe1",
          notes: [
            {
              beerID: "beer1",
              noteID: "note1",
              noteType: "generic",
              description: "Beer 1's description",
            },
          ],
        }),
    });
  } else if (url.endsWith("/api/recipes/recipe1")) {
    return Promise.resolve({
      json: () =>
        Promise.resolve({
          recipeID: "recipe1",
          name: "ricetta1",
          description: "Recipe 1's description",
          ingredients: [],
        }),
    });
  }
});

test("renders 'Birre' page", async () => {
  await act(() => {render(<Birre />);});
  expect(screen.getByText("Beer 1"));
});

test("renders beer details", async () => {
  render(<Birre />);
  await waitFor(() => screen.getAllByText("Dettagli")[0]);
  const detailsButton = screen.getAllByText("Dettagli")[0];
  fireEvent.click(detailsButton);
  await waitFor(() => screen.getByText("• Beer 1's description"));
  expect(screen.getByText("• Beer 1's description"));
});

test("renders beer edit", async () => {
  render(<Birre />);
  await waitFor(() => screen.getAllByText("Modifica")[0]);
  const editButton = screen.getAllByText("Modifica")[0];
  fireEvent.click(editButton);
  await waitFor(() => screen.getByText("Beer 1's description"));
  expect(screen.getByText("Beer 1's description"));
});
