import React from 'react';
import { NAVBAR_THEME_MANAGER_ESCAPE, NAVBAR_THEME_MANAGER_TRIGGER } from '../utils/Protocol';
import ThemeManager from './ThemeManager';

export default class NavBarThemeManager extends React.Component {
    render() {
        return (
            <ThemeManager
                testThemeCookie={this.props.testThemeCookie}
                trigger={NAVBAR_THEME_MANAGER_TRIGGER}
                escape={NAVBAR_THEME_MANAGER_ESCAPE}
            >
                {this.props.children}
            </ThemeManager>
        );
    }
}