import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';

class DedicatedTableData extends React.Component {
    render() {
        return (<TableCell
                align={this.props.align}
            >
                {this.props.children}
        </TableCell>);
    }
}

class DedicatedTableHeader extends React.Component {
    render() {
        return (<TableCell
                align={this.props.align}
                sx={{ fontSize: 30 }}
            >
                {this.props.children}
        </TableCell>);
    }
}

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
            return (<DedicatedTableHeader align={column.align}>{column.title}</DedicatedTableHeader>);
        })

        const tableRows = this.props.rows.map((row, index) => {
            return (<TableRow key={index}>
                {this.columns.map((column) => {
                    return (<DedicatedTableData align={column.align}>{row[column.key]}</DedicatedTableData>);
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