import * as React from 'react';

export default class JimTable extends React.Component {
    render() {
        return (<div style={{
            width: "90%",
            backgroundColor: "rgba(255, 255, 255, 0.9)",
            boxShadow: "0 0 10px rgba(0, 0, 0, 0.3)",
            marginLeft: "auto",
            marginRight: "auto",
            marginTop: "30px",
            border: "5px",
            padding: "1.5%"
        }}>
            {this.props.children}
        </div>);
    }
}