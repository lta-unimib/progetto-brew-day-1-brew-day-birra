import React from 'react';
import themes from '../theme/themes';
import { DEFAULT_THEME, LAST_USED_THEME_LOCALSTORAGE_KEY, SETTINGS_ENDPOINT } from '../utils/Protocol';
import { ThemeProvider } from '@mui/material';

export default class ThemeManager extends React.Component {
    constructor(props) {
        super(props);
        this.state = {currentTheme: localStorage.getItem(LAST_USED_THEME_LOCALSTORAGE_KEY) || DEFAULT_THEME};
    }
    
    triggerReload() {
        return new Promise((acc, rej) => {
            fetch(SETTINGS_ENDPOINT + "color")
            .then((response) => {
                if (response.status >= 400 && response.status <= 600) {
                    return {value: DEFAULT_THEME}
                }
                return response.json();
            })
            .then(data => {
                let value = data.value;
                if (themes[value] === undefined)
                    value = DEFAULT_THEME;
                localStorage.setItem(LAST_USED_THEME_LOCALSTORAGE_KEY, value);
                this.setState({currentTheme: value});
                acc();
            })
          .catch(() => acc())
        })
    }
    
    componentDidMount() {
        if (this.props.testThemeCookie) {
            document.cookie = this.props.trigger;
        }
        this.triggerReload()
            .then(this.saveTheme)
    }

    render() {
        if (document.cookie.includes(this.props.trigger)) {
            document.cookie = this.props.escape;
            this.triggerReload();
        }
        return (
            <ThemeProvider
                theme={themes[this.state.currentTheme]}
            >
                {this.props.children}
            </ThemeProvider>
        );
    }
}