import "@testing-library/jest-dom/extend-expect";
import React from "react";
import { render, screen, fireEvent, within } from "@testing-library/react";
import Impostazioni from "../src/pages/Impostazioni";
import { act } from "react-test-renderer";

var settings = [
    {
        settingID: "equipment", value: "30",
    }, {
        settingID: "color", value: "default",
    }, {
        settingID: "background", value: "default",
    }, {
        settingID: "name", value: "Pierino"
    }
]

const findSetting = (settingID) => {
    for (let index in settings) {
        if (settings[index].settingID === settingID)
            return settings[index];
    }
}

global.fetch = jest.fn().mockImplementation((url) =>
  Promise.resolve({
    json: () => {
        if (url === "/api/settings")
          return Promise.resolve(settings);
        else {
            if (url.startsWith("/api/settings/")) {
                let settingID = url.replace("/api/settings/", "");
                return Promise.resolve(findSetting(settingID));
            } else {
                return Promise.resolve(null);
            }
        }
    },
  })
)

describe('Impostazioni.jsx can correctly update equipement and name', () => {
    test('can update equipment and name', async () => {
        await act(() => {render(<Impostazioni/>);});
        await act(() => fireEvent.change(screen.getAllByRole("textbox")[0], {target: {value: "10"}}));
        await act(() => fireEvent.click(screen.getAllByText("Aggiorna")[0]));
        await act(() => fireEvent.change(screen.getAllByRole("textbox")[1], {target: {value: "Paolina"}}));
        await act(() => fireEvent.click(screen.getAllByText("Aggiorna")[1]));
    })
    
    test('can update color', async () => {
        await act(() => {render(<Impostazioni/>);});
        fireEvent.mouseDown(screen.getByLabelText("Color"));
        fireEvent.click(within(screen.getByRole("listbox", {name: "Color"})).getByText("dark"));
    })

    test('can update background', async () => {
        await act(() => {render(<Impostazioni/>);});
        fireEvent.mouseDown(screen.getByLabelText("Background"));
        fireEvent.click(within(screen.getByRole("listbox", {name: "Background"})).getByText("strange"));
    })
    
    test('can update color with a twin', async () => {
        await act(() => {render(<Impostazioni/>);});
        fireEvent.mouseDown(screen.getByLabelText("Color"));
        fireEvent.click(within(screen.getByRole("listbox", {name: "Color"})).getByText("twin-dark"));
    })

    test('can update backgroun with a twind', async () => {
        await act(() => {render(<Impostazioni/>);});
        fireEvent.mouseDown(screen.getByLabelText("Background"));
        fireEvent.click(within(screen.getByRole("listbox", {name: "Background"})).getByText("twin-dark"));
    })
})
