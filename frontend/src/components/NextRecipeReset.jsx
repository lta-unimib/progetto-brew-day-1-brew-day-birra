import React, { Component }  from "react";
import MButton from '../components/MButton';
import { FAKE_NOTIFIER } from '../utils/Protocol';
import SettingsManager from '../utils/SettingsManager'

class NextRecipeReset extends Component{
  constructor(props) {
    super(props);
    this.notifier = this.props.notifier || FAKE_NOTIFIER;
    this.settingsManager = new SettingsManager();
  }

  render(){
    return (
        <div>
          <center>
            <p>Sei sicuro di voler rimuovere la ricetta?</p>
            <MButton text="Conferma" onClick={this.resetNextRecipeSettings} />
          </center>
        </div>
    );
  }

  resetNextRecipeSettings = () => {
    this.settingsManager.putSetting("nextRecipeID", "")
    .then(() => this.settingsManager.putSetting("nextRecipeQuantity", "0"))
    .then(() => this.notifier.success("programmazione cancellata con successo"))
    .then(() => this.props.onConfirm())
    .catch((err) => console.log(err))
    .catch(() => this.notifier.error("impossibile cancellare la programmazione"))
  }
}

export default NextRecipeReset;
