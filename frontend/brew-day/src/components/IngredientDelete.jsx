import React from "react";
import { ThemeProvider } from "@mui/material";
import theme from "../theme/theme";
import MButton from '../components/MButton';

const IngredientDelete = (props) => {
  return (
    <ThemeProvider theme={theme}>
    <div>
      <center>
        <h4>Sei sicuro di voler eliminare questo ingrediente?</h4>
        <MButton text="Conferma" onClick={props.onConfirm} />
      </center>
    </div>
    </ThemeProvider>
  );
};

export default IngredientDelete;