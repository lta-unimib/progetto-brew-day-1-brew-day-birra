import "@testing-library/jest-dom/extend-expect";
import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import Spesa from "../src/pages/Spesa";
import { act } from "react-test-renderer";
import { SETTINGS_ENDPOINT } from "../src/utils/Protocol";

global.fetch = jest.fn().mockImplementation((url) =>
    Promise.resolve({
      json: () => {
        if (url.startsWith(SETTINGS_ENDPOINT))
          return Promise.resolve({value:"default"})
      },
    })
  )

describe("Spesa component", () => {
  test("loads the spesa on mount", async () => {
    await act(() => render(<Spesa />));
    expect(screen.getByText("Nome ingrediente")).toBeInTheDocument();
  });

  test("Correctly sends POST request", async () => {
    await act(() => render(<Spesa />));
    await act(() => fireEvent.change(screen.getByLabelText("Ingredient Name"), {target: { value: "newName" },}));
    await act(() => fireEvent.change(screen.getAllByLabelText("Quantity")[0], {target: { value: 2.0 },}));
    await act(() => fireEvent.click(screen.getAllByLabelText("Aggiungi")[0]));
    await act(() => fireEvent.click(screen.getAllByText("Conferma")[0]));
  });

  test("Correctly deletes ingredient", async () => {
    await act(() => render(<Spesa />));
    await act(() => fireEvent.change(screen.getByLabelText("Ingredient Name"), {target: { value: "newName" },}));
    await act(() => fireEvent.change(screen.getAllByLabelText("Quantity")[0], {target: { value: 2.0 },}));
    await act(() => fireEvent.click(screen.getAllByLabelText("Aggiungi")[0]));
    await act(() => fireEvent.click(screen.getAllByLabelText("Elimina")[0]));
    expect(screen.queryByText("newName")).not.toBeInTheDocument();
  });

  test("Ingredients with same name render as one that has sum of both quantities", async () => {
    await act(() => render(<Spesa />));
    await act(() => fireEvent.change(screen.getByLabelText("Ingredient Name"), {target: { value: "newName" },}));
    await act(() => fireEvent.change(screen.getAllByLabelText("Quantity")[0], {target: { value: 2.0 },}));
    await act(() => fireEvent.click(screen.getAllByLabelText("Aggiungi")[0]));
    await act(() => fireEvent.change(screen.getAllByLabelText("Ingredient Name")[0], {target: { value: "newName" },}));
    await act(() => fireEvent.change(screen.getAllByLabelText("Quantity")[1], {target: { value: 2.0 },}));
    await act(() => fireEvent.click(screen.getAllByLabelText("Aggiungi")[0]));
  });

  test("No POST request if there are no ingredients added", async () => {
    await act(() => render(<Spesa />));
    await act(() => fireEvent.click(screen.getAllByText("Conferma")[0]));
  });

  test("Can't add an ingredient with no name and no quantity", async () => {
    await act(() => render(<Spesa />));
    await act(() => fireEvent.click(screen.getAllByLabelText("Aggiungi")[0]));
  });

  test("Can't add an ingredient with no quantity", async () => {
    await act(() => render(<Spesa />));
    await act(() => fireEvent.change(screen.getByLabelText("Ingredient Name"), {target: { value: "newName" },}));
    await act(() => fireEvent.click(screen.getAllByLabelText("Aggiungi")[0]));
    await act(() => fireEvent.click(screen.getAllByText("Conferma")[0]));
  });
});
