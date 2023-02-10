import React, { Component }  from "react";
import { ThemeProvider } from "@mui/material";
import theme from "../theme/theme";
import MButton from '../components/MButton';

class SettingsReset extends Component{
  constructor(props) {
    super(props);
    this.resetAllSettings = this.resetAllSettings.bind(this);
  }

  render(){
    return (
      <ThemeProvider theme={theme}>
        <div>
          <center>
            <p>Sei sicuro di voler rimuovere tutti i tuoi dati?</p>
            <MButton text="Conferma" onClick={() => this.resetAllSettings()} />
          </center>
        </div>
      </ThemeProvider>
    );
  }

    resetAllSettings() {
      fetch(`/api/reset`, {
          method: 'POST',
          headers: {
              'Accept': 'application/json',
              'Content-Type': 'application/json'
          },
      }).then(() => this.props.onConfirm());
    }
}

export default SettingsReset;
