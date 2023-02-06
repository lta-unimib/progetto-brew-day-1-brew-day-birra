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
    render(<BeerEdit beerID="1" name="Beer 1" notes={[]} onConfirm={() => {}}/>);
  });
  const editBeerNameText = screen.getAllByTestId("inputBeerEdit")[0];
  const editBeerNameButton = screen.getAllByText("Modifica nome")[0];
  await act(() => {
    fireEvent.change(editBeerNameText, {
      target: { value: "new_name" },
    });
  });
  beer.name = 'new_name';
  await act(() => {
    fireEvent.click(editBeerNameButton);
  });
  await act(() => {
    render(<Birre />);
  });
  expect(screen.getByText("new_name"));
});
