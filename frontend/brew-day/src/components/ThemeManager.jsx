import React from 'react';
import themes from '../theme/themes';
import { SETTINGS_ENDPOINT } from '../Protocol';
import { ThemeProvider } from '@mui/material';
import BackgroundManager from './BackgroundManager';

export default class ThemeManager extends React.Component {
    constructor(props) {
        super(props);
        this.state = {currentTheme: "default", loaded: false};
    }
    triggerReload = () => {
        fetch(SETTINGS_ENDPOINT + "color")
        .then((response) => {
            if (response.status >= 400 && response.status <= 600) {
                throw new Error();
            }
            return response.json();
        })
        .then(data => {
            let value = data.value;
            if (themes[value] === undefined)
                value = "default";
            this.setState({currentTheme: value});
        })
        .catch(() => {
            this.setState({currentTheme: "default"});
        })
    }
    componentDidMount() {
        this.triggerReload();
    }

    render() {
        return (<BackgroundManager>
            <ThemeProvider theme={themes[this.state.currentTheme]}>{this.props.children}</ThemeProvider>
        </BackgroundManager>);
    }
}