import "@testing-library/jest-dom/extend-expect";
import React from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import Birre from "../src/pages/Birre";
import BeerEdit from "../src/components/BeerEdit";

global.fetch = jest.fn().mockImplementation((url) =>
  Promise.resolve({
    json: () => {
        if (url == "/api/beers")
          return Promise.resolve(["beerID"]);
        return Promise.resolve({beerID: "beerID", recipeID: "recipeID", name: "beerName",
                                ingredients: [], notes: []});
    },
  })
)

const lastElement = (arr) => arr[arr.length-1];

describe("Birre component", () => {
  test("should render correctly", () => {
    const { container, getAllByText } = render(<Birre />);
    expect(container.firstChild).toMatchSnapshot();
  });
  
  test("should render view correctly", () => {
    const { container, getAllByText } = render(<Birre />);
    fireEvent.click(getAllByText("Dettagli")[0]);
    fireEvent.click(getAllByText("Visualizza ricetta")[0]);
  });

  test("should render edit correctly", () => {
    const { container, getAllByText } = render(<Birre />);
    fireEvent.click(getAllByText("Modifica")[0]);
    fireEvent.click(getAllByText("Modifica nome")[0]);
    fireEvent.click(getAllByText("Aggiungi nota")[0]);
    fireEvent.click(getAllByText("Modifica nota")[0]);
    fireEvent.click(getAllByText("Elimina nota")[0]);
  });

  test("should render delete correctly", () => {
    const { container, getAllByText } = render(<Birre />);
    fireEvent.click(getAllByText("Elimina")[0]);
    fireEvent.click(lastElement(getAllByText("Elimina")));
  });
});

describe('BeerEdit component', () => {
  test('renders the name input with default value', () => {
    const { getByTestId } = render(<BeerEdit />);
    const input = getByTestId('inputBeerEdit');
    expect(input.value).toBe('');
  });

  test('updates the name in state when the input is changed', () => {
    const { getByTestId } = render(<BeerEdit />);
    const input = getByTestId('inputBeerEdit');
    fireEvent.change(input, { target: { value: 'TestBeer' } });
    expect(input.value).toBe('TestBeer');
  });

  test("handles note type change", () => {
    const notes = [{ noteType: "", description: "" }];
    const { getByText, getByTestId } = render(
      <BeerEdit notes={notes} />
    );

    const noteTypeTextarea = getByTestId("note-type-textarea");
    fireEvent.change(noteTypeTextarea, { target: { value: "Taste" } });

    expect(noteTypeTextarea.value).toBe("Taste");
  });

  test("handles description change", () => {
    const notes = [{ noteType: "", description: "" }];
    const { getByText, getByTestId } = render(
      <BeerEdit notes={notes} />
    );

    const descriptionTextarea = getByTestId("description-textarea");
    fireEvent.change(descriptionTextarea, {
      target: { value: "Dented glass" },
    });

    expect(descriptionTextarea.value).toBe("Dented glass");
  });
});