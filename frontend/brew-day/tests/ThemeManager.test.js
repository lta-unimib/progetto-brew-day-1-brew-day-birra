import React from "react";
import "@testing-library/jest-dom/extend-expect";
import { act } from "react-test-renderer";
import ThemeManager from "../src/components/ThemeManager";
import { render } from "@testing-library/react";
import { BACKGROUND_MANAGER_TRIGGER, THEME_MANAGER_TRIGGER } from "../src/Protocol";

var settings = {
    color: {
        settingID: "color",
        value: "default"
    },
    background: {
        settingID: "background",
        value: "default"
    }
}

var fakeSettings = {
    color: {
        settingID: "color",
        value: "fake"
    },
    background: {
        settingID: "background",
        value: "fake"
    }
}

var contentFlicks = {
    color: true,
    background: true
}

var statusFlicks = {
    color: true,
    background: true
}

const getStatus = (settingID) => {
    if (statusFlicks[settingID])
        return 200
    else
        return 404
}

const getSetting = (settingID) => {
    if (contentFlicks[settingID])
        return settings[settingID]
    return fakeSettings[settingID]
}

global.fetch = jest.fn().mockImplementation((url) => {
    let settingID = url.replace("/api/settings/", "");
    return Promise.resolve({
        status: getStatus(settingID),
        json: () => Promise.resolve(getSetting(settingID))
    })
});

describe("ThemeManager behave correctly", () => {
    test("theme manager request settings and all is there", async () => {
        await act(() => render(<ThemeManager/>))
    })
    
    test("theme manager request settings but values are invalid", async () => {
        contentFlicks.color = false;
        contentFlicks.background = false;
        await act(() => render(<ThemeManager/>))
    })
    
    test("theme manager request settings but nothing is there", async () => {
        statusFlicks.color = false;
        statusFlicks.background = false;
        await act(() => render(<ThemeManager/>))
    })
    
    test("theme manager get triggered", async () => {
        await act(() => render(<ThemeManager testThemeCookie/>))
    })
    
    test("background manager get triggered", async () => {
        await act(() => render(<ThemeManager testBackgroundCookie/>))
    })
})