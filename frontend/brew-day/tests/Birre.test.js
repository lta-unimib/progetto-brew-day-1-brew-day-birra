import "@testing-library/jest-dom/extend-expect";
import React from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import Birre from "../src/pages/Birre";

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
    fireEvent.click(getAllByText("Modifica Nome")[0]);
    fireEvent.click(getAllByText("Aggiungi Nota")[0]);
    fireEvent.click(getAllByText("Modifica Nota")[0]);
    fireEvent.click(getAllByText("Elimina Nota")[0]);
  });

  test("should render delete correctly", () => {
    const { container, getAllByText } = render(<Birre />);
    fireEvent.click(getAllByText("Elimina")[0]);
    fireEvent.click(lastElement(getAllByText("Elimina")));
  });
});
