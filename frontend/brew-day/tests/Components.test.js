import React from "react";
import "@testing-library/jest-dom/extend-expect";
import { render, screen, fireEvent, getByRole } from "@testing-library/react";
import NavBar from "../src/components/NavBar";
import QuantityInput from "../src/components/QuantityInput";
import Modal from "../src/components/Modal";
import { act } from "react-test-renderer";

const testIngredient = [
  { name: "boh", quantity: "0" },
  { name: "luppoli", quantity: "1" },
];

global.fetch = jest.fn().mockImplementation(() =>
  Promise.resolve({
    json: () => {},
  })
);

describe("NavBar component", () => {
  test("should render correctly", () => {
    const { container } = render(<NavBar />);
    expect(container.firstChild).toMatchSnapshot();
  });
});

describe("QuantityInput component", () => {
  test("should render correctly", () => {
    const { container } = render(<QuantityInput />);
    expect(container.firstChild).toMatchSnapshot();
  });

  test("correctly sets the value of the input element", async () => {
    const { container } = render(<QuantityInput />);
    const input = container.querySelector("input");

    await act(() => fireEvent.change(input, { target: { value: "100" } }));
    expect(input.value).toBe("100");

    await act(() => fireEvent.change(input, { target: { value: "1000" } }));
    expect(input.value).toBe("999");

    await act(() => fireEvent.change(input, { target: { value: "100.5" } }));
    expect(input.value).toBe("100.5");
  });

  test("correctly sets the value of the input element on blur", async () => {
    const { container } = render(<QuantityInput />);
    const input = container.querySelector("input");

    await act(() => fireEvent.change(input, { target: { value: "0.00" } }));
    await act(() => fireEvent.blur(input));
    expect(input.value).toBe("0");
  });

  test("Input only accepts numbers", async () => {
    const component = render(<QuantityInput />);
    await act(() => fireEvent.change(component.getByTestId("quantity-input"), {
      target: { value: "a" },
    }));
    expect(component.getByTestId("quantity-input").value).toBe("");
  });

  test("Input does not allow minus sign, so negative numbers", async () => {
    const component = render(<QuantityInput />);
    await act(() => fireEvent.change(component.getByTestId("quantity-input"), {
      target: { value: "-" },
    }));
    expect(component.getByTestId("quantity-input").value).toBe("");
  });

  test("If input starts with . it automatically returns 0.", async () => {
    const component = render(<QuantityInput />);
    await act(() => fireEvent.change(component.getByTestId("quantity-input"), {
      target: { value: "." },
    }));
    expect(component.getByTestId("quantity-input").value).toBe("0.");
  });

  test("999 is the max input", async () => {
    const component = render(<QuantityInput />);
    await act(() => fireEvent.change(component.getByTestId("quantity-input"), {
      target: { value: "1000" },
    }));
    expect(component.getByTestId("quantity-input").value).toBe("999");
  });

  test("00 is rendered to 0", async () => {
    const component = render(<QuantityInput />);
    await act(() => fireEvent.change(component.getByTestId("quantity-input"), {
      target: { value: "00" },
    }));
    expect(component.getByTestId("quantity-input").value).toBe("0");
  });

  test("If the first comma comes after a digit or more, keep the number", async () => {
    const component = render(<QuantityInput />);
    await act(() => fireEvent.change(component.getByTestId("quantity-input"), {
      target: { value: "0." },
    }));
    expect(component.getByTestId("quantity-input").value).toBe("0.");
  });

  test("0.0 renders to 0", async () => {
    const component = render(<QuantityInput />);
    await act(() => fireEvent.change(component.getByTestId("quantity-input"), {
      target: { value: "0.0" },
    }));
    await act(() => fireEvent.blur(component.getByTestId("quantity-input")));
    expect(component.getByTestId("quantity-input").value).toBe("0");
  });
});

describe("Modal component", () => {
  test("should render correctly", () => {
    const { container } = render(<Modal showModal={true} setShowModal={() => {}}/>);
    expect(container.firstChild).toMatchSnapshot();
  });

  test("handleModalClick should stopPropagation", async () => {
    const { getByTestId } = render(
      <Modal showModal={true} setShowModal={() => {}}>
        <div data-testid="modal-content"></div>
      </Modal>
    );
    const modalContent = getByTestId("modal-content");
    await act(() => fireEvent.click(modalContent));
    expect(modalContent).toBeInTheDocument();
  });
});