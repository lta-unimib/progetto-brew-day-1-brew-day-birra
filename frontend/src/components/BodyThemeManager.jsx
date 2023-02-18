import React from 'react';
import { THEME_MANAGER_ESCAPE, THEME_MANAGER_TRIGGER } from '../utils/Protocol';
import BackgroundManager from './BackgroundManager';
import ThemeManager from './ThemeManager';

export default class BodyThemeManager extends React.Component {
    render() {
        return (
            <ThemeManager
                testThemeCookie={this.props.testThemeCookie}
                trigger={THEME_MANAGER_TRIGGER}
                escape={THEME_MANAGER_ESCAPE}
            >
                <BackgroundManager
                    testBackgroundCookie={this.props.testBackgroundCookie}
                >
                    {this.props.children}
                </BackgroundManager>
            </ThemeManager>
        );
    }
}