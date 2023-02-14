import React, { Component } from "react";
import { Button } from "@mui/material";
import { Box } from "@mui/system";

class MButton extends Component {
  render() {
    const button = this.props.center === undefined
      ? (
        <Button
          style={{
            margin: 10
          }}
          variant="contained"
          color="primary"
          onClick={this.props.onClick ?? (() => {})}
        >
          {this.props.text}
        </Button>
      ) : (
        <Box textAlign='center'>
          <Button
            variant="contained"
            color="primary"
            onClick={this.props.onClick ?? (() => {})}
          >
            {this.props.text}
          </Button>
        </Box>
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