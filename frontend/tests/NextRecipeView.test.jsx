import React from "react";
import "@testing-library/jest-dom/extend-expect";
import { act } from "react-test-renderer";
import NextRecipeView from "../src/components/NextRecipeView";
import { render } from "@testing-library/react";

var settings = {
  nextRecipeID: "",
  nextRecipeQuantity: "9"
}

var fakeSettings = {
  nextRecipeID: "-9",
  nextRecipeQuantity: "-9"
}

var contentFlicks = {
  nextRecipeID: true,
  nextRecipeQuantity: true
}

var statusFlicks = {
  nextRecipeID: true,
  nextRecipeQuantity: true
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

describe("NextRecipeView tests", () => {
  test("settings are there", async () => {
    contentFlicks.nextRecipeID = true;
    contentFlicks.nextRecipeQuantity = true;
    act(() => render(<NextRecipeView/>))
  })

  test("settings are there 1", async () => {
    contentFlicks.nextRecipeID = true;
    contentFlicks.nextRecipeQuantity = false;
    act(() => render(<NextRecipeView/>))
  })
  
  test("settings are there 2", async () => {
    contentFlicks.nextRecipeID = false;
    contentFlicks.nextRecipeQuantity = true;
    act(() => render(<NextRecipeView/>))
  })
  
  test("settings are there 3", async () => {
    contentFlicks.nextRecipeID = false;
    contentFlicks.nextRecipeQuantity = false;
    act(() => render(<NextRecipeView/>))
  })
})
