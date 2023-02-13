import * as React from 'react';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';

export default class IngredientNameInput extends React.Component {
    render() {
        return (<Autocomplete
            id="free-solo-demo"
            freeSolo
            options={["vino", "birra"]}
            renderInput={(params) => <TextField {...params} label="name" />}
            value={this.props.value}
            onChange={console.log("helo")}
        />);
    }
}