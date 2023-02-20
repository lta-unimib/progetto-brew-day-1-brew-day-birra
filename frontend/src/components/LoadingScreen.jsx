import { Backdrop, CircularProgress } from '@mui/material';
import React, { Component } from 'react';

class LoadingScreen extends Component {
    render() {
        return (
            <Backdrop
                sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
                open={this.props.isLoading}
            >
                <center>
                    <p>caricamento ...</p>
                    <CircularProgress color="inherit" />
                </center>
            </Backdrop>
        );
    }
}

export default LoadingScreen;