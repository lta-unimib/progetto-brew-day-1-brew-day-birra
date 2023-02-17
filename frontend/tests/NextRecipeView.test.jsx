import React from "react";
import "@testing-library/jest-dom/extend-expect";
import { act } from "react-test-renderer";
import NextRecipeView from "../src/components/NextRecipeView";
import { fireEvent, render, screen } from "@testing-library/react";
import { BEER_LIST_ENDPOINT, RECIPE_ENDPOINT, RECIPE_LIST_ENDPOINT, SETTINGS_ENDPOINT, SHOPPING_ENDPOINT } from "../src/utils/Protocol";

var settings = {
  nextRecipeQuantity: "30",
  nextRecipeID: "recipeID"
}

var recipes = {
  "recipeID": {
    recipeID: "recipeID", name: "recipeName",
    description: "recipeDescription", ingredients: []
  }
}

var contentFlicks = {
  nextRecipeID: true,
  nextRecipeQuantity: true,
  equipment: true,
  recipe: true,
  beer: true
};

var statusFlicks = {
  nextRecipeID: 200,
  nextRecipeQuantity: 200,
  equipment: 200,
  recipe: 200,
  beer: 200
};

function getStatus(url) {
  if (url.startsWith(SETTINGS_ENDPOINT + "equipment"))
  return statusFlicks.equipment;
  if (url.startsWith(RECIPE_ENDPOINT))
  return statusFlicks.recipe;
  if (url.startsWith(BEER_LIST_ENDPOINT))
  return statusFlicks.beer;
  return 200;
};

global.fetch = jest.fn().mockImplementation((url) => {
  if (url.startsWith(SETTINGS_ENDPOINT + "equipment") && (!contentFlicks.equipment))
  return Promise.resolve({});
  if (url.startsWith(RECIPE_ENDPOINT) && (!contentFlicks.recipe))
  return Promise.resolve({});
  if (url.startsWith(BEER_LIST_ENDPOINT) && (!contentFlicks.beer))
  return Promise.resolve({});
  return Promise.resolve({
    status: getStatus(url),
    json: () => {
      if (url.startsWith(SETTINGS_ENDPOINT + "nextRecipeID"))
      return Promise.resolve({value:settings.nextRecipeID})
      if (url.startsWith(SETTINGS_ENDPOINT + "nextRecipeQuantity"))
      return Promise.resolve({value:settings.nextRecipeQuantity})
      if (url.startsWith(SETTINGS_ENDPOINT + "equipment"))
      return Promise.resolve({value:"30"})
      if (url.startsWith(SETTINGS_ENDPOINT))
      return Promise.resolve({value:"default"})
      if (url === RECIPE_LIST_ENDPOINT)
      return Promise.resolve(Object.keys(recipes));
      else {
        if (url.startsWith(RECIPE_ENDPOINT)) {
          let recipeID = url.replace(RECIPE_ENDPOINT, "");
          return Promise.resolve(recipes[recipeID]);
        } else if (url.startsWith(SHOPPING_ENDPOINT)) {
          let recipeID = url.replace(SHOPPING_ENDPOINT, "");
          return Promise.resolve(recipes[recipeID].ingredients);
        } else {
          return Promise.resolve(null);
        }
      }
    },
  })
}
)

describe("NextRecipeView tests", () => {
  test("settings are there", async () => {
    contentFlicks.nextRecipeID = true;
    contentFlicks.nextRecipeQuantity = true;
    contentFlicks.equipment = true;
    await act(() => render(<NextRecipeView/>))
  })
  
  test("settings are there 1", async () => {
    contentFlicks.nextRecipeID = true;
    contentFlicks.nextRecipeQuantity = true;
    contentFlicks.equipment = false;
    await act(() => render(<NextRecipeView/>))
  })
  
  test("settings are there 2", async () => {
    contentFlicks.nextRecipeID = false;
    contentFlicks.nextRecipeQuantity = false;
    contentFlicks.equipment = true;
    await act(() => render(<NextRecipeView/>))
  })
  
  test("settings are there 3", async () => {
    contentFlicks.nextRecipeID = false;
    contentFlicks.nextRecipeQuantity = false;
    contentFlicks.equipment = false;
    await act(() => render(<NextRecipeView/>))
  })

  test("adding a beer but name is invalid", async () => {
    contentFlicks.nextRecipeID = true;
    contentFlicks.nextRecipeQuantity = true;
    contentFlicks.equipment = true;
    await act(() => render(<NextRecipeView/>))
    await act(() => {fireEvent.change(screen.getByLabelText("Beer Name"), {target: {value: ""}})});
    await act(() => {fireEvent.click(screen.getAllByText("Crea")[0])});
  })

  test("adding a beer but quantity is too much", async () => {
    contentFlicks.nextRecipeID = true;
    contentFlicks.nextRecipeQuantity = true;
    contentFlicks.equipment = true;
    settings.nextRecipeQuantity = "90";
    await act(() => render(<NextRecipeView/>))
  })

  test("adding a beer but not enough ingreditents", async () => {
    contentFlicks.nextRecipeID = true;
    contentFlicks.nextRecipeQuantity = true;
    contentFlicks.equipment = true;
    settings.nextRecipeQuantity = "30";
    await act(() => render(<NextRecipeView/>))
    statusFlicks.beer = 400;
    await act(() => {fireEvent.change(screen.getByLabelText("Beer Name"), {target: {value: "newBeerName"}})});
    await act(() => {fireEvent.click(screen.getAllByText("Crea")[0])});
  })

  test("adding a beer", async () => {
    contentFlicks.nextRecipeID = true;
    contentFlicks.nextRecipeQuantity = true;
    contentFlicks.equipment = true;
    await act(() => render(<NextRecipeView/>))
    statusFlicks.beer = 200;
    await act(() => {fireEvent.change(screen.getByLabelText("Beer Name"), {target: {value: "newBeerName"}})});
    await act(() => {fireEvent.click(screen.getAllByText("Crea")[0])});
  })
})
