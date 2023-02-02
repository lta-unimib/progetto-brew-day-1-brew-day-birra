import React from "react";
import "@testing-library/jest-dom/extend-expect";
import { render, fireEvent } from "@testing-library/react";
import NavBar from "../src/components/NavBar";
import QuantityInput from "../src/components/QuantityInput";
import Modal from "../src/components/Modal";
import RecipeView from "../src/components/RecipeView";
import RecipeDelete from "../src/components/RecipeDelete";
import RecipeExecute from "../src/components/RecipeExecute";

const testIngredient = [{ name: "boh", quantity: "0" }, { name: "luppoli", quantity: "1"}];

global.fetch = jest.fn().mockImplementation(() =>
  Promise.resolve({
    json: () => {},
  })
)

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

  test("correctly sets the value of the input element", () => {
    const { container } = render(<QuantityInput />);
    const input = container.querySelector("input");

    fireEvent.change(input, { target: { value: "100" } });
    expect(input.value).toBe("100");

    fireEvent.change(input, { target: { value: "1000" } });
    expect(input.value).toBe("999");

    fireEvent.change(input, { target: { value: "100.5" } });
    expect(input.value).toBe("100.5");
  });

  test("correctly sets the value of the input element on blur", () => {
    const { container } = render(<QuantityInput />);
    const input = container.querySelector("input");

    fireEvent.change(input, { target: { value: "0.00" } });
    fireEvent.blur(input);
    expect(input.value).toBe("0");
  });

  test("Input only accepts numbers", () => {
    const component = render(<QuantityInput />);
    fireEvent.change(component.getByTestId("quantity-input"), {
      target: { value: "a" },
    });
    expect(component.getByTestId("quantity-input").value).toBe("");
  });

  test("Input does not allow minus sign, so negative numbers", () => {
    const component = render(<QuantityInput />);
    fireEvent.change(component.getByTestId("quantity-input"), {
      target: { value: "-" },
    });
    expect(component.getByTestId("quantity-input").value).toBe("");
  });

  test("If input starts with . it automatically returns 0.", () => {
    const component = render(<QuantityInput />);
    fireEvent.change(component.getByTestId("quantity-input"), {
      target: { value: "." },
    });
    expect(component.getByTestId("quantity-input").value).toBe("0.");
  });

  test("999 is the max input", () => {
    const component = render(<QuantityInput />);
    fireEvent.change(component.getByTestId("quantity-input"), {
      target: { value: "1000" },
    });
    expect(component.getByTestId("quantity-input").value).toBe("999");
  });

  test("00 is rendered to 0", () => {
    const component = render(<QuantityInput />);
    fireEvent.change(component.getByTestId("quantity-input"), {
      target: { value: "00" },
    });
    expect(component.getByTestId("quantity-input").value).toBe("0");
  });

  test("If the first comma comes after a digit or more, keep the number", () => {
    const component = render(<QuantityInput />);
    fireEvent.change(component.getByTestId("quantity-input"), {
      target: { value: "0." },
    });
    expect(component.getByTestId("quantity-input").value).toBe("0.");
  });

  test("0.0 renders to 0", () => {
    const component = render(<QuantityInput />);
    fireEvent.change(component.getByTestId("quantity-input"), {
      target: { value: "0.0" },
    });
    fireEvent.blur(component.getByTestId("quantity-input"));
    expect(component.getByTestId("quantity-input").value).toBe("0");
  });
});

describe("RecipeDelete component", () => {
  test("should render correctly", () => {
    const { container } = render(
      <RecipeDelete
        name="name"
        description="description"
        ingredients={testIngredient}
      />
    );
    expect(container.firstChild).toMatchSnapshot();
  });

  test("calls fetch when delete button is clicked", () => {
    const props = { name: "Recipe 1", description: "This is a test recipe", recipeID: 1 };
    const { getByText } = render(<RecipeDelete {...props} />);
    fireEvent.click(getByText("Sei sicuro di voler rimuovere la ricetta?"));
    expect(fetch).toHaveBeenCalledWith(`/api/recipes/${props.recipeID}`, {
        method: 'DELETE',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        }
    });
  });
});

describe("RecipeExecute component", () => {
  test("should render correctly", () => {
    const { container } = render(
      <RecipeExecute
        name="name"
        description="description"
        ingredients={testIngredient}
      />
    );
    expect(container.firstChild).toMatchSnapshot();
  });
});

describe("RecipeView component", () => {
  test("should render correctly", () => {
    const { container } = render(
      <RecipeView
        name="name"
        description="description"
        ingredients={testIngredient}
      />
    );
    expect(container.firstChild).toMatchSnapshot();
  });
});

describe("Modal component", () => {
  test("should render correctly", () => {
    const { container } = render(<Modal />);
    expect(container.firstChild).toMatchSnapshot();
  });

  test("handleModalClick should stopPropagation", () => {
    const { getByTestId } = render(
      <Modal showModal={true} setShowModal={() => {}}>
        <div data-testid="modal-content"></div>
      </Modal>
    );
    const modalContent = getByTestId("modal-content");

    fireEvent.click(modalContent);

    expect(modalContent).toBeInTheDocument();
  });

  test("clicking on the modal sets showModal to false", () => {
    const setShowModal = jest.fn();
    const { getByTestId } = render(
      <Modal showModal={true} setShowModal={setShowModal}>
        <div data-testid="modal-content"></div>
      </Modal>
    );
    fireEvent.click(getByTestId("modal"));
    expect(setShowModal).toHaveBeenCalledWith(false);
  });

  test("clicking on the modal sets showModal to false", () => {
    const setShowModal = jest.fn();
    const { getByTestId } = render(
      <Modal showModal={false} setShowModal={setShowModal}>
        <div data-testid="modal-content"></div>
      </Modal>
    );
    fireEvent.click(getByTestId("modal"));
    expect(setShowModal).toHaveBeenCalledWith(false);
  });
});

