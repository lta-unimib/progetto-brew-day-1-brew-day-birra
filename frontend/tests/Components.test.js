import React from "react";
import "@testing-library/jest-dom/extend-expect";
import { render, fireEvent, screen } from "@testing-library/react";
import Modal from "../src/components/Modal";
import { act } from "react-test-renderer";
import MButton from "../src/components/MButton";

global.fetch = jest.fn().mockImplementation((url) =>
  Promise.resolve({
    json: () => {
      if (url === "/api/advice")
        return Promise.resolve(null);
        if (url === "/api/settings/nextRecipeID")
        return Promise.resolve({value:""});
        if (url === "/api/settings/nextRecipeQuantity")
        return Promise.resolve({value:""});
      return Promise.resolve({});
    },
  })
);

describe("Modal component", () => {
  test("should render correctly", async () => {
    let theContainer;
    await act(() => {
      const { container } = render(<Modal showModal={true} setShowModal={() => {}}/>);
      theContainer = container;
    });
    expect(theContainer.firstChild).toMatchSnapshot();
    await act(() => fireEvent.keyDown(screen.getByRole("dialog"), {
      key: "Escape",
      code: "Escape",
      keyCode: 27,
      charCode: 27
    }));
  });

  test("handleModalClick should stopPropagation", async () => {
    let theGetByTestId;
    await act(() => {
      const { getByTestId } = render(
        <Modal showModal={true} setShowModal={() => {}}>
          <div data-testid="modal-content"></div>
        </Modal>
      );
      theGetByTestId = getByTestId;
    });
    const modalContent = theGetByTestId("modal-content");
    await act(() => fireEvent.click(modalContent));
    expect(modalContent).toBeInTheDocument();
  });

  test("create a MButton with custom class and id", async () => {
    await act(() => render(<MButton id="theID" className="theClassName"/>));
    await act(() => render(<MButton className="theClassName"/>));
    await act(() => render(<MButton id="theID"/>));
    await act(() => render(<MButton />));
  });
});