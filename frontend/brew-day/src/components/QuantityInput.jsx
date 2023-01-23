import React from "react";

class QuantityInput extends React.Component {
  constructor() {
    super();
    this.state = { value: '' };
    this.handleValue = this.handleValue.bind(this);
    this.handleBlur = this.handleBlur.bind(this);
    this.comma = null;
    this.max = 999;
  }
  handleValue(event) {
    const string = event.target.value;

    if (string == '.') this.setState({ value: '0.'});
    else if (string.endsWith('.') && !this.comma) this.setState({ value: string });
    else if (string.startsWith('0') && string.endsWith('00') && !string.includes('.')) this.setState({ value: '0' });
    else if (/[0-9]$/.test(string)) {
        if(parseFloat(string) <= 999) this.setState({ value: string });
        else this.setState({ value: this.max });
    }
    else this.setState({ value: string.slice(0, -1) });

    this.comma = string.includes('.');
  }
  handleBlur(event) {
    if(/0\.0+$/.test(event.target.value)) this.setState({ value: '0'});
  }
  render() {
    return (
      <div>
        <input
          id="shoppingItemId"
          name="shoppingItemId"
          value={this.state.value}
          onChange={this.handleValue}
          onBlur={this.handleBlur}
        ></input>
      </div>
    );
  }
}

export default QuantityInput;