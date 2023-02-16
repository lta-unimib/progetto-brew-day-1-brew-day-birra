import * as React from 'react';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import { INGREDIENT_NAME_OPTIONS as OPTIONS } from '../utils/Protocol';

export default class IngredientNameInput extends React.Component {
    render() {
        return (<Autocomplete
            id="free-solo-demo"
            freeSolo
            options={OPTIONS}
            renderInput={(params) => <TextField {...params} label="Ingredient Name" />}
            value={this.props.value}
            onInputChange={(e, value) => {
                this.props.onChange({target: {value: value}})}
            }
            data-testid="ingredient-name-input"
        />);
    }
}