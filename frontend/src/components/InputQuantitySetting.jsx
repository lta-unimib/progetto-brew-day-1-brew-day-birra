import * as React from 'react';
import JimTable from './JimTable';
import MButton from './MButton';
import QuantityInput from './QuantityInput';

export default class InputQuantitySetting extends React.Component {
    render() {
        return (<JimTable>
            <p style={{textAlign: "center"}}>{this.props.title}</p>
            <QuantityInput
                label={this.props.label}
                style={{width: "90%", margin: "5%", textAlign:"center"}}
                value={this.props.value} onChange={this.props.onChange}
            />
            <MButton center text="Aggiorna" onClick={this.props.onConfirm}/>
        </JimTable>)
    }
}