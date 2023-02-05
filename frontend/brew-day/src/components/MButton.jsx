import React, { Component } from "react";
import { Button } from '@mui/material';

class MButton extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <Button
        style={{ marginRight: 10, marginLeft: 10, marginTop: 10, marginBottom: 10 }}
        variant="contained"
        color="primary"
        onClick={this.props.onClick}
      >
        {this.props.text}
      </Button>
    );
  }
}

export default MButton;
