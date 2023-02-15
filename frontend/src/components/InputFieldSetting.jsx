import * as React from 'react';
import JimTable from './JimTable';
import MButton from './MButton';

export default class InputFieldSetting extends React.Component {
    render() {
        return (<JimTable>
            <p style={{textAlign: "center"}}>{this.props.title}</p>
            <input
                style={{width: "90%", margin: "5%", textAlign:"center"}}
                value={this.props.value}
                type="text" onChange={this.props.onChange}
            />
            <MButton center text="Aggiorna" onClick={this.props.onConfirm}/>
        </JimTable>)
    }
}