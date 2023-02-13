import * as React from 'react';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';

export default class ContentCard extends React.Component {
    render() {
        return (
            <Box style={{ margin: "2%"}}>
                <Card variant="outlined" style={{borderRadius: 15}}>
                    <CardContent>{this.props.children}</CardContent>
                </Card>
            </Box>
        );
    }
}