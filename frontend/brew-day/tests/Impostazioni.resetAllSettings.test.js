import "@testing-library/jest-dom/extend-expect";
import React from "react";
import { render, screen, fireEvent, waitFor, getByRole } from "@testing-library/react";
import Impostazioni from "../src/pages/Impostazioni";
import { act } from "react-test-renderer";


describe('Impostazioni.jsx can reset Settings', () => {
    test('open resetNextRecipeID but dont reset', async () => {
        await act(() => {render(<Impostazioni/>);});
        await act(() => {fireEvent.click(screen.getAllByText("Resetta la prossima ricetta da eseguire")[0])});
        expect(screen.getByText("Sei sicuro di voler rimuovere tutti i tuoi dati?", {exact: false})).toBeInTheDocument();
        await act(() => {fireEvent.click(screen.getAllByText("Cancel")[0])});
    })
    
    test('open resetNextRecipeID and reset', async () => {
        await act(() => {render(<Impostazioni/>);});
        await act(() => {fireEvent.click(screen.getAllByText("Sei sicuro di voler rimuovere tutti i tuoi dati?")[0])});
        //delete recipes.recipeID;
        await act(() => {fireEvent.click(screen.getByText("Conferma"))});
        expect(screen.queryByText("70")).toBeNull();
    })
})