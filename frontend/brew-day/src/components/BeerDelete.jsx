import React from "react";
import { Button, ThemeProvider } from "@mui/material";
import theme from "../theme/theme";

const BeerDelete = (props) => {
  return (
    <ThemeProvider theme={theme}>
    <div>
      <center>
        <h4>Sei sicuro di voler eliminare questa birra?</h4>
        <Button style={{ marginRight: 10, marginTop: 10, marginBottom: 10 }} 
                variant="contained" color="primary" 
                onClick={props.onConfirm}>Elimina</Button>
      </center>
    </div>
    </ThemeProvider>
  );
};

export default BeerDelete;
