import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';

export default class DedicatedTable extends React.Component {
    constructor(props) {
        super(props);
        this.columns = this.props.columns.map((column) => {
            if (column.align === undefined)
                column.align = "center";
            return column;
        })
    }
    render() {
        const columnRow = this.columns.map((column) => {
            return (<TableCell sx={{ fontSize: 30 }} key={column.key} align={column.align}>{column.title}</TableCell>);
        })

        const tableRows = this.props.rows.map((row, rowIndex) => {
            return (<TableRow key={`row-${rowIndex}`}>
                {this.columns.map((column) => {
                    return (<TableCell key={column.key} align={column.align}>{row[column.key]}</TableCell>);
                })}
            </TableRow>);
        })

        return (
            <TableContainer sx={{ 
                margin: "2%",
                width: "90%",
                backgroundColor: "rgba(255, 255, 255, 0.9)",
                boxShadow: "0 0 10px rgba(0, 0, 0, 0.3)",
                marginLeft: "auto",
                marginRight: "auto",
                marginTop: 3,
                border: 0
            }}>
                <Table sx={{ margin: 0 }} aria-label="simple table">
                    <TableHead>
                        <TableRow>
                            {columnRow}
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {tableRows}
                    </TableBody>
                </Table>
            </TableContainer>
        );
    }
}