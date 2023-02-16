import { TextField } from "@mui/material";
import React from "react";

const isValidQuantity = (quantity) => {
  return ((!isNaN(quantity)) && (quantity >= 0));
}

const isValidInput = (newValue) => {
  if (newValue === "")
    return true;
  const parsedValue = Number(newValue);
  return isValidQuantity(parsedValue);

}

class QuantityInput extends React.Component {
  handleValue = (event) => {
    const newValue = event.target.value;
    if (isValidInput(newValue))
      this.props.onChange({target: {value: newValue}});
  }

  handleBlur = (event) => {
    let newValue = event.target.value;
    if (isValidInput(newValue))
      this.props.onChange({target: {value: ""+Number(newValue)}});
  }

  render() {
    const theStile = this.props.style || {width: "100%", textAlign:"center"}
    return (
        <TextField
          sx={theStile}
          type="text"
          data-testid="shopping-quantity"
          value={this.props.value}
          onChange={this.handleValue}
          onBlur={this.handleBlur}
          label={this.props.label}
        />
    );
  }
}

export default QuantityInput;