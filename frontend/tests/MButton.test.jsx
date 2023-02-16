import "@testing-library/jest-dom/extend-expect";
import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import MButton from '../src/components/MButton';
import { act } from "react-test-renderer";

describe("MButton and its own", () => {
  test("render and click with and within class/id indicator", async () => {
    await act(() => render(<MButton id="theID"/>));
    await act(() => render(<MButton id="theID" className="theClass"/>));
    await act(() => render(<MButton className="theClss"/>));
    await act(() => render(<MButton/>));
    await act(() => screen.getAllByRole("button").map(button => fireEvent.click(button)));
  })

  test("centered and uncentered button", async () => {
    await act(() => render(<MButton center/>));
    await act(() => render(<MButton/>));
    await act(() => screen.getAllByRole("button").map(button => fireEvent.click(button)));
  })
  
  test("button with onClick and click", async () => {
    await act(() => render(<MButton onClick={() => {}}/>));
    await act(() => render(<MButton/>));
    await act(() => screen.getAllByRole("button").map(button => fireEvent.click(button)));
  })
})
