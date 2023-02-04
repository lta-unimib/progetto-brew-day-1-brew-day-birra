import React from "react";
import { Button, ThemeProvider } from "@mui/material";
import theme from "../theme/theme";

const IngredientDelete = (props) => {
  return (
    <ThemeProvider theme={theme}>
    <div>
      <center>
        <h4>Sei sicuro di voler eliminare questo ingrediente?</h4>
        <Button style={{ marginRight: 10, marginTop: 10, marginBottom: 10 }} 
                variant="contained" color="primary" 
                onClick={props.onConfirm}>Elimina</Button>
      </center>
    </div>
    </ThemeProvider>
  );
};

export default IngredientDelete;