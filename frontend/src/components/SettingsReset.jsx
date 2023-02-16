import React, { Component }  from "react";
import MButton from '../components/MButton';
import { FAKE_NOTIFIER, RESET_ENDPOINT } from '../utils/Protocol';

class SettingsReset extends Component{
  constructor(props) {
    super(props);
    this.notifier = this.props.notifier || FAKE_NOTIFIER;
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

  resetAllSettings = () => {
    fetch(RESET_ENDPOINT, {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
    })
    .then(this.notifier.onRequestError("impossibile cancellare i dati"))
    .then(this.notifier.onRequestSuccess("dati cancellati con successo"))
    .then(() => this.props.onConfirm());
  }
}

export default SettingsReset;
