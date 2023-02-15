import React, { Component }  from "react";
import MButton from '../components/MButton';
import { RESET_ENDPOINT } from '../Protocol';

class SettingsReset extends Component{
  constructor(props) {
    super(props);
    this.resetAllSettings = this.resetAllSettings.bind(this);
  }

  render(){
    return (
        <div>
          <center>
            <p>Sei sicuro di voler rimuovere tutti i tuoi dati?</p>
            <MButton text="Conferma" onClick={() => this.resetAllSettings()} />
          </center>
        </div>
    );
  }

    resetAllSettings() {
      fetch(RESET_ENDPOINT, {
          method: 'POST',
          headers: {
              'Accept': 'application/json',
              'Content-Type': 'application/json'
          },
      }).then(() => this.props.onConfirm());
    }
}

export default SettingsReset;
