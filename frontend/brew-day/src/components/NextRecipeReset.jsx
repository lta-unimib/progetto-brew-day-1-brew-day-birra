import React, { Component }  from "react";
import { ThemeProvider } from "@mui/material";
import theme from "../theme/theme";
import MButton from '../components/MButton';
import { SETTINGS_ENDPOINT } from '../Protocol';

class NextRecipeReset extends Component{
  constructor(props) {
    super(props);
    this.resetNextRecipeID = this.resetNextRecipeID.bind(this);
  }

  render(){
    return (
      <ThemeProvider theme={theme}>
        <div>
          <center>
            <p>Sei sicuro di voler rimuovere la ricetta?</p>
            <MButton text="Conferma" onClick={() => this.resetNextRecipeID()} />
          </center>
        </div>
      </ThemeProvider>
    );
  }

    resetNextRecipeID() {
      fetch(SETTINGS_ENDPOINT + `nextRecipeID`, {
          method: 'DELETE',
          headers: {
              'Accept': 'application/json',
              'Content-Type': 'application/json'
          },
      }).then(() => this.props.onConfirm());
    }

}

export default NextRecipeReset;
