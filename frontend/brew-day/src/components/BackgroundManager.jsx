import React from 'react';
import backgrounds from '../theme/backgrounds';
import { SETTINGS_ENDPOINT } from '../Protocol';

export default class BackgroundManager extends React.Component {
    triggerReload = () => {
        return new Promise((acc, rej) => {
            fetch(SETTINGS_ENDPOINT + "background")
            .then((response) => {
                if (response.status >= 400 && response.status <= 600) {
                    throw new Error();
                }
                return response.json();
            })
            .then(data => {
                let value = data.value;
                if (backgrounds[value] === undefined)
                    value = "default";
                document.body.style.backgroundImage = `url("/backgrounds/${backgrounds[value]}")`;
                document.body.style.backgroundSize = "cover";
            })
            .catch(() => {
                document.body.style.backgroundImage = `url("/backgrounds/${backgrounds["default"]}")`;
                document.body.style.backgroundSize = "cover";
                acc();
            });
        });
    }

    componentDidMount() {
        this.triggerReload();
    }

    render() {
        if (document.cookie.includes("backgroundReload=true")) {
            document.cookie = document.cookie.replace("backgroundReload=true", "")
            this.triggerReload();
        }
        return (
            <div>
                {this.props.children}
            </div>
        );
    }
}