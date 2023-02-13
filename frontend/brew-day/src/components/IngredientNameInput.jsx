import * as React from 'react';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';

const OPTIONS = [
    "acqua", "additivi", "lievito", "luppoli", "malto", "zuccheri"
];
export default class IngredientNameInput extends React.Component {
    render() {
        return (<Autocomplete
            id="free-solo-demo"
            freeSolo
            options={OPTIONS}
            renderInput={(params) => <TextField {...params} label="name" />}
            value={this.props.value}
            onInputChange={(e, value) => {
                this.props.onChange({target: {value: value}})}
            }
            data-testid="ingredient-name-input"
        />);
    }
}