import React, { Component }  from "react";
import MButton from '../components/MButton';
import { BACKGROUND_MANAGER_TRIGGER, FAKE_NOTIFIER, NAVBAR_THEME_MANAGER_TRIGGER, RESET_ENDPOINT, THEME_MANAGER_TRIGGER } from '../utils/Protocol';

class SettingsReset extends Component{
  constructor(props) {
    super(props);
    this.notifier = this.props.notifier || FAKE_NOTIFIER;
  }

  notifyMaster = () => {
    if (this.props.masterCall)
      this.props.masterCall();
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
    .then(this.notifier.onRequestSuccessResolvePromise(() => {
      document.cookie=BACKGROUND_MANAGER_TRIGGER;
      document.cookie=THEME_MANAGER_TRIGGER;
      document.cookie=NAVBAR_THEME_MANAGER_TRIGGER;
      localStorage.clear();
      this.notifyMaster();
      this.notifier.success("dati cancellati con successo");
    }))
    .then(() => this.props.onConfirm());
  }
}

export default SettingsReset;