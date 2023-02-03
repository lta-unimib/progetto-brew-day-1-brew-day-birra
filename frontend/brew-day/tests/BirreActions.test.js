import React from "react";
import { render, screen, waitFor, fireEvent } from "@testing-library/react";
import Birre from "../src/pages/Birre";
import BeerEdit from "../src/components/BeerEdit";
import { existsSync, readFileSync, writeFileSync } from "fs";

const log = (string) => {
  if (!existsSync("./log.log")) writeFileSync("./log.log", "");
  let text = readFileSync("./log.log").toString();
  text += "\n" + string;
  writeFileSync("./log.log", text);
};

const testBeer = {
  beerID: "1",
  name: "Beer 1",
  recipeID: "recipeID",
  notes: [
    {
      beerID: "1",
      noteID: "noteID1",
      noteType: "generic",
      description: "Description 1",
    },
    {
      beerID: "1",
      noteID: "noteID3",
      noteType: "taste",
      description: "Description 3",
    },
  ],
};

global.fetch = jest.fn().mockImplementation((url) => {
  if (url.endsWith("1")) {
    return Promise.resolve({
      json: () =>
        Promise.resolve({
          beerID: "1",
          name: "Beer 1",
          recipeID: "recipeID",
          notes: [
            {
              beerID: "1",
              noteID: "noteID1",
              noteType: "generic",
              description: "Description 1",
            },
          ],
        }),
    });
  } else if (url.endsWith("2")) {
    return Promise.resolve({
      json: () =>
        Promise.resolve({
          beerID: "2",
          name: "Beer 2",
          recipeID: "recipeID",
          notes: [
            {
              beerID: "2",
              noteID: "noteID2",
              noteType: "generic",
              description: "Description 2",
            },
          ],
        }),
    });
  } else
    return Promise.resolve({
      json: () => Promise.resolve(["1", "2"]),
    });
});

describe("Birre component", () => {
  test("renders all beers", async () => {
    const { container } = render(<Birre />);
    expect(container.firstChild).toMatchSnapshot();
  });

  test("renders beer details", async () => {
    render(<Birre />);
    await waitFor(() => screen.getAllByText("Dettagli")[0]);
    const detailsButton = screen.getAllByText("Dettagli")[0];
    fireEvent.click(detailsButton);
    await waitFor(() => screen.getByText("• Description 1"));
    expect(screen.getByText("• Description 1"));
  });

  test("renders beer edit", async () => {
    render(<Birre />);
    await waitFor(() => screen.getAllByText("Modifica")[0]);
    const editButton = screen.getAllByText("Modifica")[0];
    fireEvent.click(editButton);
    await waitFor(() => screen.getByText("Description 1"));
    expect(screen.getByText("Description 1"));
  });

  test("renders beer delete", async () => {
    render(<Birre />);
    await waitFor(() => screen.getAllByText("Elimina")[0]);
    const deleteButton = screen.getAllByText("Elimina")[0];
    fireEvent.click(deleteButton);
    await waitFor(() =>
      screen.getByText("Sei sicuro di voler eliminare questa birra?")
    );
    expect(screen.getByText("Sei sicuro di voler eliminare questa birra?"));
  });

  test("deletes beer", async () => {
    render(<Birre />);
    await waitFor(() => screen.getAllByText("Elimina")[1]);
    const deleteButton = screen.getAllByText("Elimina")[1];
    fireEvent.click(deleteButton);
    await waitFor(() => screen.getAllByText("Elimina")[2]);
    const confirmDeleteButton = screen.getAllByText("Elimina")[2];
    fireEvent.click(confirmDeleteButton);
    expect(screen.queryByText("Beer 2")).toBeNull();
  });

  test("deletes note", async () => {
    render(
      <BeerEdit beerID={testBeer.beerID} name={testBeer.name} notes={testBeer.notes} />
    );
    await waitFor(() => screen.getAllByText("Elimina nota")[0]);
    const deleteButton = screen.getAllByText("Elimina nota")[0];
    fireEvent.click(deleteButton);
    expect(screen.queryByText("Description 2")).toBeNull();
  });

  test("deletes note", async () => {
    render(
      <BeerEdit beerID={testBeer.beerID} name={testBeer.name} notes={testBeer.notes} />
    );
    await waitFor(() => screen.getAllByText("Elimina nota")[0]);
    const deleteButton = screen.getAllByText("Elimina nota")[0];
    fireEvent.click(deleteButton);
    expect(screen.queryByText("generic")).toBeNull();
  });

  test("add note", async () => {
    render(
      <BeerEdit beerID={testBeer.beerID} name={testBeer.name} notes={testBeer.notes} />
    );
    await waitFor(() => screen.getAllByText("Aggiungi nota")[0]);
    const addButton = screen.getAllByText("Aggiungi nota")[0];
    const descriptionTextArea = screen.getAllByTestId("description-textarea")[0];
    const noteTypeTextArea = screen.getAllByTestId("note-type-textarea")[0];
    fireEvent.change(descriptionTextArea, { target: { value: 'test description' }});
    fireEvent.change(noteTypeTextArea, { target: { value: 'generic' }});
    fireEvent.click(addButton);
    render(<Birre />);
    await waitFor(() => screen.getAllByText("Modifica")[0]);
    const editButton = screen.getAllByText("Modifica")[0];
    fireEvent.click(editButton);
    await waitFor(() => screen.getByText("test description"));
    expect(screen.getByText("test description"));
  });
});
