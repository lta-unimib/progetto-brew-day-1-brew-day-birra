import "@testing-library/jest-dom/extend-expect";
import React from "react";
import { render, screen, act } from "@testing-library/react";
import Spesa from "../src/pages/Spesa";

describe("Spesa component", () => {
  test("loads the spesa on mount", async () => {
    await act(() => render(<Spesa />));
    expect(screen.getByText("Nome ingrediente")).toBeInTheDocument();
  });
});