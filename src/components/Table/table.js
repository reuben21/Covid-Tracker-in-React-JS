import * as React from 'react';
import {DataGrid} from '@material-ui/data-grid';

const columns = [
    {
        field: 'State',
        headerName: 'State',
        width: 250,
        color: "white",
        headerAlign: 'center',
        headerClassName: "table_header_color",
        cellClassName: 'table_cell_color',
    },
    {
        field: 'Active',
        cellClassName: 'table_cell_color',
        headerName: 'Active',
        width: 130,
        headerAlign: 'center',
        headerClassName: "table_header_color"
    },
    {
        field: 'Confirmed',
        cellClassName: 'table_cell_color',
        headerName: 'Confirmed',
        width: 130,
        headerAlign: 'center',
        headerClassName: "table_header_color"
    },
    {
        field: 'Deaths',
        cellClassName: 'table_cell_color',
        headerName: 'Deaths',
        width: 130,
        headerAlign: 'center',
        headerClassName: "table_header_color"
    },
    // {
    //     field: 'age',
    //     headerName: 'Age',
    //     type: 'number',
    //     width: 90,
    // },
    // {
    //     field: 'fullName',
    //     headerName: 'Full name',
    //     description: 'This column has a value getter and is not sortable.',
    //     sortable: false,
    //     width: 160,
    //     valueGetter: (params) =>
    //         `${params.getValue('firstName') || ''} ${params.getValue('lastName') || ''}`,
    // },
];


const DataGridDemo = (props) => {
    return (
        <div style={{height: 500, width: '100%', backgroundColor: "#323232", color: "white !important"}}>
            <DataGrid style={{
                color: "white !important",
                backgroundColor: "red"
            }} rows={props.row} columns={columns} pageSize={7}/>
        </div>
    );
}

export default DataGridDemo;
