import React from "react";
import "@testing-library/jest-dom/extend-expect";
import { render, fireEvent } from "@testing-library/react";
import RecipeEdit from "../src/components/RecipeEdit";

const testIngredient = [{ name: "name", quantity: "0" }, { name: "luppoli", quantity: "1"}];

global.fetch = jest.fn().mockImplementation(() =>
  Promise.resolve({
    json: () => {},
  })
)

describe("RecipeEdit component", () => {
    test("should render correctly", () => {
        const { container } = render(
            <RecipeEdit
            name="name"
            description="description"
            ingredients={testIngredient}
            />
        );
        const inputs = container.querySelectorAll("input");
        fireEvent.change(inputs[0], { target: { value: "newName" } });
        for (let i = 1; i < inputs.length; i+=2) {
            fireEvent.change(inputs[i], { target: { value: "newIngredientName" } });
            fireEvent.change(inputs[i+1], { target: { value: "17" } });
        }
        const buttons = container.querySelectorAll("button");
        for (let i = 0; i < buttons.length; i++) {
            fireEvent.click(buttons[i]);
        }
    });
});