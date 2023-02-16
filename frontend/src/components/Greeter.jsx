import React from 'react';
import { SETTINGS_ENDPOINT } from '../utils/Protocol';
import Typography from '@mui/material/Typography';

export default class Greeter extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  triggerReload = () => {
    fetch(SETTINGS_ENDPOINT + "name")
      .then((res) => res.json())
      .then((data) => this.setState({ name: data.value }))
      .catch(() => {});
  }

  componentDidMount() {
    this.triggerReload();
  }

  render() {
    const nameIndication = (
      this.state.name ? "" : ` ${this.state.name}`
    );

    return (
      <Typography variant="h6" sx={{
          color: 'white',
          fontSize: 80,
          textAlign: "center"
        }}
      >
        Benvenuto{nameIndication}!
      </Typography>
    );
  }
}
