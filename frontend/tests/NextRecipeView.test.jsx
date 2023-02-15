import React from "react";
import "@testing-library/jest-dom/extend-expect";
import { act } from "react-test-renderer";
import NextRecipeView from "../src/components/NextRecipeView";
import { render } from "@testing-library/react";

var settings = {
  nextRecipeID: "",
  nextRecipeQuantity: "9",
  equipment: "30"
}

var contentFlicks = {
  nextRecipeID: true,
  nextRecipeQuantity: true,
  equipment: true
}

var statusFlicks = {
  nextRecipeID: true,
  nextRecipeQuantity: true,
  equipment: true
}

const getStatus = (settingID) => {
    if (statusFlicks[settingID])
        return 200
    else
        return 404
}

global.fetch = jest.fn().mockImplementation((url) => {
    let settingID = url.replace("/api/settings/", "");
    if (contentFlicks[settingID])
      return Promise.resolve({
          status: getStatus(settingID),
          json: () => Promise.resolve(settings[settingID])
      })
    else
      return Promise.resolve({})
});

describe("NextRecipeView tests", () => {
  test("settings are there", async () => {
    contentFlicks.nextRecipeID = true;
    contentFlicks.nextRecipeQuantity = true;
    contentFlicks.equipment = true;
    act(() => render(<NextRecipeView/>))
  })

  test("settings are there 1", async () => {
    contentFlicks.nextRecipeID = true;
    contentFlicks.nextRecipeQuantity = true;
    contentFlicks.equipment = false;
    act(() => render(<NextRecipeView/>))
  })
  
  test("settings are there 2", async () => {
    contentFlicks.nextRecipeID = false;
    contentFlicks.nextRecipeQuantity = false;
    contentFlicks.equipment = true;
    act(() => render(<NextRecipeView/>))
  })
  
  test("settings are there 3", async () => {
    contentFlicks.nextRecipeID = false;
    contentFlicks.nextRecipeQuantity = false;
    contentFlicks.equipment = false;
    act(() => render(<NextRecipeView/>))
  })
})
