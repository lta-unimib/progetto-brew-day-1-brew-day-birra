import { Box } from "@mui/material";
import * as React from "react";

export default class JimFlex extends React.Component {
    render() {
        return (<Box sx={{
            display: {md: "grid", sx: "flex"},
            gridTemplateColumns: "50% 50%",
            gap: ""
          }}>
            {this.props.children}
        </Box>);
    }
}