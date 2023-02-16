import React, { Component } from "react";
import themes from "../theme/themes";
import backgrounds from '../theme/backgrounds';
import BodyThemeManager from "../components/BodyThemeManager";
import Modal from "../components/Modal";
import MButton from '../components/MButton';
import SettingsReset from "../components/SettingsReset";
import NextRecipeReset from "../components/NextRecipeReset";
import {SETTING_LIST_ENDPOINT, SETTINGS_ENDPOINT, BACKGROUND_MANAGER_TRIGGER, THEME_MANAGER_TRIGGER, NAVBAR_THEME_MANAGER_TRIGGER, LAST_USED_THEME_LOCALSTORAGE_KEY, DEFAULT_BACKGROUND, DEFAULT_THEME, LAST_USED_BACKGROUND_LOCALSTORAGE_KEY, FAKE_NOTIFIER } from '../utils/Protocol';
import InputFieldSetting from "../components/InputFieldSetting";
import InputSelectorSetting from "../components/InputSelectorSetting";
import JimTable from "../components/JimTable";
import JimFlex from "../components/JimFlex";
import InputQuantitySetting from "../components/InputQuantitySetting";

export default class Impostazioni extends Component {
    constructor(props) {
        super(props);
        this.state = {
          currentAction: "",
          showModal:false, settings: [], equipment: "", color: "", name: "", background: "",
          colors: Object.keys(themes).map((key) => { return {name:key, value:key}; }),
          backgrounds: Object.keys(backgrounds).map((key) => { return {name:key, value:key}; })
        };
        this.notifier = this.props.notifier || FAKE_NOTIFIER;
    }

    triggerReload = () => {
      fetch(SETTING_LIST_ENDPOINT)
      .then(response => response.json())
      .then(data => {
        this.setState({settings: data});
        if (data.filter(i => i.settingID === "color").length === 0){
          this.postValue("color", DEFAULT_THEME);
          this.setState({color: DEFAULT_THEME});
        } else {
          this.setState({color: data.filter(i => i.settingID === "color")[0].value});
        }
        if (data.filter(i => i.settingID === "name").length === 0){
          this.postValue("name", "");
          this.setState({name: ""});
        } else {
          this.setState({name: data.filter(i => i.settingID === "name")[0].value});
        }
        if (data.filter(i => i.settingID === "background").length === 0){
          this.postValue("background", DEFAULT_BACKGROUND);
          this.setState({background: DEFAULT_BACKGROUND});
        } else {
          this.setState({background: data.filter(i => i.settingID === "background")[0].value});
        }
        if (data.filter(i => i.settingID === "equipment").length === 0){
          this.postValue("equipment", "30");
          this.setState({equipment: "30"});
        } else {
          this.setState({equipment: data.filter(i => i.settingID === "equipment")[0].value});
        }
        if (data.filter(i => i.settingID === "nextRecipeID").length === 0){
          this.postValue("nextRecipeID", "");
        }
        if (data.filter(i => i.settingID === "nextRecipeQuantity").length === 0){
          this.postValue("nextRecipeQuantity", "0");
        }
      })
      .catch(this.notifier.connectionError)
    }

    setNewEquipment = (event) => {
      let newEquipment = event.target.value;
      this.setState({equipment: newEquipment});
    }

    setNewName = (event) => {
      let newName = event.target.value;
      this.setState({name: newName});
    }

    setNewBackground = (event) => {
      let newBackground = event.target.value;
      this.setState({background: newBackground});
      this.updateValue("background", newBackground)
        .then(() => document.cookie=BACKGROUND_MANAGER_TRIGGER)
        .then(() => localStorage.setItem(LAST_USED_BACKGROUND_LOCALSTORAGE_KEY, newBackground))
        .then(this.triggerReload)
        .catch(() => this.notifier.error("impossibile cambiare lo sfondo"))
    }

    setNewColor = (event) => {
      let newColor = event.target.value;
      this.setState({color: newColor});
      this.updateValue("color", newColor)
        .then(() => document.cookie=THEME_MANAGER_TRIGGER)
        .then(() => document.cookie=NAVBAR_THEME_MANAGER_TRIGGER)
        .then(() => localStorage.setItem(LAST_USED_THEME_LOCALSTORAGE_KEY, newColor))
        .then(this.triggerReload)
        .then(this.notifyMaster)
        .catch(() => this.notifier.error("impossibile il tema"))
    }

    handleSetEquipment = () => {
      this.updateValue("equipment", this.state.equipment)
      .then(this.triggerReload)
      .then(() => this.notifier.success("equipaggiamento aggiornato con successo"))
      .catch(() => this.notifier.error("impossibile cambiare l'equipaggiamento"))
    }

    handleSetName = () => {
      if (this.state.name === "") {
        this.notifier.warning("il nome non deve essere vuoto");
        return this.triggerReload();
      }
      this.updateValue("name", this.state.name)
      .then(this.triggerReload)
      .then(() => this.notifier.success("nome aggiornato con successo"))
      .catch(() => this.notifier.error("impossibile cambiare il nome"))
    }

    notifyMaster = () => {
      if (this.props.masterCall)
        this.props.masterCall();
    }

    componentDidMount = () => {
      this.triggerReload();
    }

    closeModal = () => this.setShowModal(false);
    closeModalAndReload = () => {this.closeModal(); this.triggerReload()};

    handleResetSettings = () => {
      this.setState({currentAction:"resetSettings", showModal:true})
    };  

    handleResetNextRecipeID = () => {
      this.setState({currentAction:"resetRecipeID", showModal:true})
    }; 

    getCurrentComponent = () => {
      let currentAction = this.state.currentAction;
      switch (currentAction) {
        case "resetSettings":
          return <SettingsReset notifier={this.notifier} onConfirm={this.closeModalAndReload}/>;
        case "resetRecipeID":
          return <NextRecipeReset notifier={this.notifier} onConfirm={this.closeModal}/>;
        default:
          return <div></div>;
      }
    }    


    setShowModal = (flag) => {
      if (!flag)
        this.setState({currentAction:""})
      this.setState({showModal:flag})
    }

    render(){
      return (
        <BodyThemeManager>
            <JimFlex>
              <InputQuantitySetting
                value={this.state.equipment}
                title="Equipaggiamento Disponibile"
                label="Equipment"
                onChange={this.setNewEquipment}
                onConfirm={this.handleSetEquipment}
              />
              <InputFieldSetting
                value={this.state.name}
                title="Inserisci qui il tuo nome"
                label="Name"
                onChange={this.setNewName}
                onConfirm={this.handleSetName}
              />
              <InputSelectorSetting
                title="Seleziona il colore del tema"
                label="Color"
                value={this.state.color}
                onChange={this.setNewColor}
                options={this.state.colors}
              />
              <InputSelectorSetting
                title="Seleziona lo sfondo"
                label="Background"
                value={this.state.background}
                onChange={this.setNewBackground}
                options={this.state.backgrounds}
              />
              <JimTable>
                <MButton center text="Elimina tutti i dati" onClick={() => this.handleResetSettings()}/>
              </JimTable>
              <JimTable>
                <MButton center text="Resetta la prossima ricetta da eseguire" onClick={() => this.handleResetNextRecipeID()}/>
              </JimTable>
            </JimFlex>
            <Modal showModal={this.state.showModal} setShowModal={this.setShowModal}>
              {this.getCurrentComponent()}
            </Modal>
          </BodyThemeManager>
        )

    }

    updateValue = (id, newValue) => {
      return new Promise((acc, rej) => {
        fetch(SETTINGS_ENDPOINT+`${id}`, {
            method: 'PUT',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({value: newValue})
        })
        .then(response => {
          if (response.status >= 400 && response.status < 600)
            throw new Error();
        })
        .then(() => acc())
        .catch(() => rej())
      })
    }

    postValue = (id, newValue) => {
      return new Promise((acc, rej) => {
        fetch(SETTING_LIST_ENDPOINT, {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({settingID: id, value: newValue})
        })
        .then(() => acc());
      })
    }

}
