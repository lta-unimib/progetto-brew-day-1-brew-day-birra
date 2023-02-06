import React from "react";
import { render, screen, fireEvent, act } from "@testing-library/react";
import BeerEdit from "../../src/components/BeerEdit";

let beer = {
  beerID: "1",
  name: "Beer 1",
  recipeID: "recipe1",
  notes: [],
};

global.fetch = jest.fn().mockImplementation(() => {
  return Promise.resolve({
    json: () => Promise.resolve(beer),
  });
});

test("open beer edit and set description", async () => {
  await act(() => {
    render(
      <BeerEdit
        notes={beer.notes}
        name={beer.name}
        beerID={beer.beerID}
        onConfirm={() => {}}
      />
    );
  });
  await act(() => {
    fireEvent.change(screen.getAllByTestId("note-type-textarea")[0], {
      target: { value: "taste" },
    });
  });
  await act(() => {
    fireEvent.change(screen.getAllByTestId("description-textarea")[0], {
      target: { value: "New Description" },
    });
  });
  await act(() => {
    fireEvent.click(screen.getAllByText("Aggiungi nota")[0]);
  });
  await act(() => {
    fireEvent.click(
      screen.getAllByRole("button")[screen.getAllByRole("button").length - 1]
    );
  });
});

test("open beer edit and set name", async () => {
  await act(() => {
    render(
      <BeerEdit
        notes={beer.notes}
        name={beer.name}
        beerID={beer.beerID}
        onConfirm={() => {}}
      />
    );
  });
  await act(() => {
    fireEvent.change(screen.getAllByTestId("note-type-textarea")[0], {
      target: { value: "taste" },
    });
  });
  await act(() => {
    fireEvent.click(screen.getAllByText("Aggiungi nota")[0]);
  });
  await act(() => {
    fireEvent.click(
      screen.getAllByRole("button")[screen.getAllByRole("button").length - 1]
    );
  });
});

test("open beer edit and update an ingredient", async () => {
  await act(() => {
    render(
      <BeerEdit
        notes={beer.notes}
        name={beer.name}
        beerID={beer.beerID}
        onConfirm={() => {}}
      />
    );
  });
  await act(() => {
    fireEvent.change(screen.getAllByTestId("description-textarea")[0], {
      target: { value: "new description" },
    });
  });
  await act(() => {
    fireEvent.click(screen.getAllByText("Aggiungi nota")[0]);
  });
  await act(() => {
    fireEvent.click(
      screen.getAllByRole("button")[screen.getAllByRole("button").length - 1]
    );
  });
});
