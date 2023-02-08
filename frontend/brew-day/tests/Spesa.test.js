import "@testing-library/jest-dom/extend-expect";
import React from "react";
import { render, screen, act, fireEvent } from "@testing-library/react";
import Spesa from "../src/pages/Spesa";

global.fetch = jest.fn().mockImplementation(() =>
    Promise.resolve({
      json: () => {},
    })
  )

describe("Spesa component", () => {
  test("loads the spesa on mount", async () => {
    await act(() => render(<Spesa />));
    expect(screen.getByText("Nome ingrediente")).toBeInTheDocument();
  });

  test("Correctly sends POST request", async () => {
    await act(() => render(<Spesa />));
    await act(() => {fireEvent.change(screen.getAllByTestId("shopping-name")[0], {target: { value: "newName" },});});
    await act(() => {fireEvent.change(screen.getAllByTestId("shopping-quantity")[0], {target: { value: 2.0 },});});
    await act(() => {fireEvent.click(screen.getAllByText("Aggiungi")[0]);});
    await act(() => {fireEvent.click(screen.getAllByText("Conferma")[0]);});
  });
});
