import React from "react";
import "@testing-library/jest-dom/extend-expect";
import { act } from "react-test-renderer";
import QuantityInput from "../src/components/QuantityInput";
import { render, screen, fireEvent } from "@testing-library/react";

const deploy = () => (<QuantityInput onChange={() => {}}/>);

describe("QuantityInput tests", () => {
  test("inputs is empty string", async () => {
    await act(() => render(deploy()));
    await act(() => fireEvent.change(screen.getAllByRole("textbox")[0], {target:{value:""}}))
  })
  
  test("inputs is an invalid string", async () => {
    await act(() => render(deploy()));
    await act(() => fireEvent.change(screen.getAllByRole("textbox")[0], {target:{value:"ciao"}}))
    await act(() => fireEvent.change(screen.getAllByRole("textbox")[0], {target:{value:"-9"}}))
  })
  
  test("inputs is a valid string", async () => {
    await act(() => render(deploy()));
    await act(() => fireEvent.change(screen.getAllByRole("textbox")[0], {target:{value:"66"}}))
  })
  
  test("inputs is a perfectable valid string, and there it comes the blur", async () => {
    await act(() => render(deploy()));
    await act(() => fireEvent.blur(screen.getAllByRole("textbox")[0], {target:{value:"6."}}))
    await act(() => fireEvent.blur(screen.getAllByRole("textbox")[0], {target:{value:""}}))
  })
  
  test("inputs is a invalid valid string, and there it comes the blur", async () => {
    await act(() => render(deploy()));
    await act(() => fireEvent.blur(screen.getAllByRole("textbox")[0], {target:{value:"-6."}}))
    await act(() => fireEvent.blur(screen.getAllByRole("textbox")[0], {target:{value:"ciao"}}))
  })
})
