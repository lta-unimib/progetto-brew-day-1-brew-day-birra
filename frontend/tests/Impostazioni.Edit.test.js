import "@testing-library/jest-dom/extend-expect";
import React from "react";
import { render, screen, fireEvent, within } from "@testing-library/react";
import Impostazioni from "../src/pages/Impostazioni";
import { act } from "react-test-renderer";
import { SETTINGS_ENDPOINT, SETTING_LIST_ENDPOINT } from "../src/utils/Protocol";

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

var statusFlick = {
    settings: true,
    setting: true
}

function getStatus(url) {
    if (url === SETTING_LIST_ENDPOINT && !statusFlick.settings)
        return 400
    if (url.startsWith(SETTINGS_ENDPOINT) && !statusFlick.setting)
        return 400
    return 200
}

global.fetch = jest.fn().mockImplementation((url) =>
  Promise.resolve({
    status: getStatus(url),
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
    test('can update name', async () => {
        await act(() => {render(<Impostazioni/>);});
        await act(() => fireEvent.change(screen.getAllByRole("textbox")[1], {target: {value: "Paolina"}}));
        await act(() => fireEvent.click(screen.getAllByText("Aggiorna")[1]));
    })

    
    test('can update equipment', async () => {
        await act(() => {render(<Impostazioni/>);});
        await act(() => fireEvent.change(screen.getAllByRole("textbox")[0], {target: {value: "10"}}));
        await act(() => fireEvent.click(screen.getAllByText("Aggiorna")[0]));
    })
    test('cannot update name', async () => {
        statusFlick.setting = true;
        await act(() => {render(<Impostazioni/>);});
        statusFlick.setting = false;
        await act(() => fireEvent.change(screen.getAllByRole("textbox")[1], {target: {value: "Paolina"}}));
        await act(() => fireEvent.click(screen.getAllByText("Aggiorna")[1]));
    })

    
    test('cannot update equipment', async () => {
        statusFlick.setting = true;
        await act(() => {render(<Impostazioni/>);});
        statusFlick.setting = false;
        await act(() => fireEvent.change(screen.getAllByRole("textbox")[0], {target: {value: "10"}}));
        await act(() => fireEvent.click(screen.getAllByText("Aggiorna")[0]));
    })
    
    test('cannot update color', async () => {
        statusFlick.setting = true;
        await act(() => {render(<Impostazioni/>);});
        statusFlick.setting = false;
        fireEvent.mouseDown(screen.getByLabelText("Color"));
        fireEvent.click(within(screen.getByRole("listbox", {name: "Color"})).getByText("dark"));
    })

    test('cannot update background', async () => {
        statusFlick.setting = true;
        await act(() => {render(<Impostazioni/>);});
        statusFlick.setting = false;
        fireEvent.mouseDown(screen.getByLabelText("Background"));
        fireEvent.click(within(screen.getByRole("listbox", {name: "Background"})).getByText("strange"));
    })
    
    test('can update color and has a masterCall', async () => {
        statusFlick.setting = true;
        await act(() => {render(<Impostazioni masterCall={() => {}}/>);});
        fireEvent.mouseDown(screen.getByLabelText("Color"));
        fireEvent.click(within(screen.getByRole("listbox", {name: "Color"})).getByText("dark"));
    })

    test('can update background', async () => {
        statusFlick.setting = true;
        await act(() => {render(<Impostazioni/>);});
        fireEvent.mouseDown(screen.getByLabelText("Background"));
        fireEvent.click(within(screen.getByRole("listbox", {name: "Background"})).getByText("strange"));
    })
    
    test('can update color with a twin', async () => {
        statusFlick.setting = true;
        await act(() => {render(<Impostazioni/>);});
        fireEvent.mouseDown(screen.getByLabelText("Color"));
        fireEvent.click(within(screen.getByRole("listbox", {name: "Color"})).getByText("twin-dark"));
    })

    test('can update backgroun with a twin', async () => {
        statusFlick.setting = true;
        await act(() => {render(<Impostazioni/>);});
        fireEvent.mouseDown(screen.getByLabelText("Background"));
        fireEvent.click(within(screen.getByRole("listbox", {name: "Background"})).getByText("twin-dark"));
    })
})