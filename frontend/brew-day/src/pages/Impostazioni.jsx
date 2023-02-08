import React, { Component } from "react";
import { ThemeProvider } from "@mui/material";
import theme from "../theme/theme";
import MButton from '../components/MButton';

export default class Impostazioni extends Component {

    constructor(props) {
        super(props);
        this.triggerReload = this.triggerReload.bind(this);
        this.updateValue = this.updateValue.bind(this);
        this.state = {settings: [],  newEquipment: ""};
    }

    triggerReload() {
        fetch("/api/settings")
        .then(response => response.json())
        .then(data => this.setState({settings: data, newEquipment: data.filter(i => i.settingID === "equipment")[0].value}));
    }

    setNewEquipment(event){
      let newEquipment = event.target.value;
      this.setState({newEquipment: newEquipment});
    }

    componentDidMount() {
      this.triggerReload();
    }

    render(){
      return (
        <ThemeProvider theme={theme}>
            <div>
                <table className="myTable">
                    <tbody>
                        <tr>
                          <td>Equipaggiamento Disponibile</td>
                          <td><input value={this.state.newEquipment} type="text" style={{width: "90%", textAlign:"center"}} onChange={ (event) => this.setNewEquipment(event)}></input></td>
                          <td><MButton text="Aggiorna" onClick={() => this.updateValue("equipment", this.state.newEquipment)} /></td>
                        </tr>
                    </tbody>
                </table>
            </div>
          </ThemeProvider>
        )

    }

    updateValue(id, newValue) {
    fetch(`/api/settings/${id}`, {
        method: 'PUT',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({value: newValue})
    })
    .then(() => {
      this.triggerReload();
    });
  }

}
