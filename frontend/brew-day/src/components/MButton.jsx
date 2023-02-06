import React, { Component } from "react";
import { Button } from "@mui/material";

class MButton extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    const button = (
      <Button
        style={{
          marginRight: 10,
          marginLeft: 10,
          marginTop: 10,
          marginBottom: 10,
        }}
        variant="contained"
        color="primary"
        onClick={this.props.onClick ?? (() => {})}
      >
        {this.props.text}
      </Button>
    );
    if(this.props.id || this.props.className) {
      return (
        <div className={this.props.className ?? ""} id={this.props.id ?? ""}>
          {button}
        </div>
      );
    }
    return (button);
  }
}

export default MButton;
