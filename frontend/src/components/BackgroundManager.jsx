import React from 'react';
import backgrounds from '../theme/backgrounds';
import { BACKGROUND_MANAGER_ESCAPE, BACKGROUND_MANAGER_TRIGGER, DEFAULT_BACKGROUND, LAST_USED_BACKGROUND_LOCALSTORAGE_KEY, SETTINGS_ENDPOINT } from '../utils/Protocol';

export default class BackgroundManager extends React.Component {
    triggerReload = () => {
        return new Promise((acc, rej) => {
            fetch(SETTINGS_ENDPOINT + "background")
            .then((response) => {
                if (response.status >= 400 && response.status <= 600) {
                    return {value: DEFAULT_BACKGROUND}
                }
                return response.json();
            })
            .then(data => {
                let value = data.value;
                if (backgrounds[value] === undefined)
                    value = "default";
                localStorage.setItem(LAST_USED_BACKGROUND_LOCALSTORAGE_KEY, value);
                document.body.style.backgroundImage = `url("/backgrounds/${backgrounds[value]}")`;
                acc()
            })
            .catch(() => acc())
        });
    }

    componentDidMount() {
        document.body.style.backgroundImage = `url("/backgrounds/${backgrounds[localStorage.getItem(LAST_USED_BACKGROUND_LOCALSTORAGE_KEY) || DEFAULT_BACKGROUND]}")`;
        document.body.style.backgroundSize = "cover";
        this.triggerReload();
    }

    render() {
        if (document.cookie.includes(BACKGROUND_MANAGER_TRIGGER)) {
            document.cookie = BACKGROUND_MANAGER_ESCAPE;
            this.triggerReload();
        }
        return (
            <div>
                {this.props.children}
            </div>
        );
    }
}
