import React from 'react';
import { BACKGROUND_MANAGER_TRIGGER, THEME_MANAGER_ESCAPE, THEME_MANAGER_TRIGGER } from '../utils/Protocol';
import BackgroundManager from './BackgroundManager';
import ThemeManager from './ThemeManager';

export default class BodyThemeManager extends React.Component {
    componentDidMount() {
        if (this.props.testBackgroundCookie) {
            document.cookie = BACKGROUND_MANAGER_TRIGGER;
        }
    }

    render() {
        return (
            <ThemeManager
                testThemeCookie={this.props.testThemeCookie}
                trigger={THEME_MANAGER_TRIGGER}
                escape={THEME_MANAGER_ESCAPE}
            >
                <BackgroundManager>
                    {this.props.children}
                </BackgroundManager>
            </ThemeManager>
        );
    }
}