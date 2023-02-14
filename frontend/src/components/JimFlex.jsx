import * as React from "react";

export default class JimFlex extends React.Component {
    render() {
        return (<div style={{
            display: "grid",
            gridTemplateColumns: "repeat(2, 50%)"
          }}>
            {this.props.children}
        </div>);
    }
}