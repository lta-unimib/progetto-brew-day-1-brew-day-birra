import * as React from 'react';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import { NOTE_TYPE_OPTIONS as OPTIONS } from '../Protocol';

export default class NoteTypeInput extends React.Component {
    render() {
        return (<Autocomplete
            id="free-solo-demo"
            disableClearable
            options={OPTIONS}
            renderInput={(params) => <TextField {...params} label="notetype" />}
            value={this.props.value}
            onInputChange={(e, value) => {
                if (OPTIONS.includes(value))
                    this.props.onChange({target: {value: value}})}
            }
            data-testid="note-type-input"
        />);
    }
}