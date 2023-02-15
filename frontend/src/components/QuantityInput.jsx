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
    return (
        <input
          style={{ height: "100%", width: "100%", textAlign: "center" }}
          type="text"
          data-testid="shopping-quantity"
          value={this.props.value}
          onChange={this.handleValue}
          onBlur={this.handleBlur}
        />
    );
  }
}

export default QuantityInput;