import React from 'react';
import themes from '../theme/themes';
import { SETTINGS_ENDPOINT, NAVBAR_THEME_MANAGER_ESCAPE, NAVBAR_THEME_MANAGER_TRIGGER } from '../Protocol';
import { ThemeProvider } from '@mui/material';

export default class NavBarThemeManager extends React.Component {
    constructor(props) {
        super(props);
        this.state = {currentTheme: "default"};
    }
    
    triggerReload = () => {
        return new Promise((acc, rej) => {
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
                acc();
            })
            .catch(() => {
                this.setState({currentTheme: "default"});
                acc();
            })
        })
    }
    componentDidMount() {
        if (this.props.testThemeCookie) {
            document.cookie = NAVBAR_THEME_MANAGER_TRIGGER;
        }
        this.triggerReload();
    }

    render() {
        if (document.cookie.includes(NAVBAR_THEME_MANAGER_TRIGGER)) {
            document.cookie = NAVBAR_THEME_MANAGER_ESCAPE;
            this.triggerReload();
        }
        return (<ThemeProvider theme={themes[this.state.currentTheme]}>{this.props.children}</ThemeProvider>);
    }
}