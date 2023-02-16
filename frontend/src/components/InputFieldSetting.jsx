import { TextField } from '@mui/material';
import * as React from 'react';
import JimTable from './JimTable';
import MButton from './MButton';

export default class InputFieldSetting extends React.Component {
    render() {
        return (<JimTable>
            <p style={{textAlign: "center"}}>{this.props.title}</p>
            <TextField
                sx={{width: "90%", margin: "5%", textAlign:"center"}}
                value={this.props.value} onChange={this.props.onChange}
                id="outlined-basic" label={this.props.label} variant="outlined"/>
            <MButton center text="Aggiorna" onClick={this.props.onConfirm}/>
        </JimTable>)
    }
}