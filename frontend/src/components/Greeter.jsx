import React from 'react';
import Typography from '@mui/material/Typography';
import TitleCard from './TitleCard';
import SettingsManager from '../utils/SettingsManager';

export default class Greeter extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
    this.settingsManager = new SettingsManager();
  }

  triggerReload = () => {
    this.settingsManager.getSetting("name")
      .then((data) => this.setState({ name: data.value }))
      .catch(() => {});
  }

  componentDidMount() {
    this.triggerReload();
  }

  render() {
    const nameIndication = (
      this.state.name ? ` ${this.state.name}` : ""
    );

    return (
      <TitleCard>
        <Typography variant="h6" sx={{
            color: 'black',
            fontSize: 80,
            textAlign: "center"
          }}
        >
          Benvenuto{nameIndication}!
        </Typography>
      </TitleCard>
    );
  }
}
