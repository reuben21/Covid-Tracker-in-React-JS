import * as React from 'react';
import {DataGrid} from '@material-ui/data-grid';

const columns = [
    {
        field: 'Country',
        headerName: 'Country',
        width: 400,
        color: "white",
        headerAlign: 'center',
        headerClassName: "table_header_color",
        cellClassName: 'table_cell_color',
    },

    {
        field: 'Recovered',
        cellClassName: 'table_cell_color_recovered',
        headerName: 'Recovered',
        width: 200,
        headerAlign: 'center',
        headerClassName: "table_header_color"
    },
    {
        field: 'Confirmed',
        cellClassName: 'table_cell_color',
        headerName: 'Confirmed',
        width: 200,
        headerAlign: 'center',
        headerClassName: "table_header_color"
    },
    {
        field: 'Deaths',
        cellClassName: 'table_cell_color_Deaths',
        headerName: 'Deaths',
        width: 200,
        headerAlign: 'center',
        headerClassName: "table_header_color"
    },
    {
        field: 'newConfirmed',
        cellClassName: 'table_cell_color',
        headerName: 'New Confirmed',
        width: 200,
        headerAlign: 'center',
        headerClassName: "table_header_color"
    },
    {
        field: 'newRecovered',
        cellClassName: 'table_cell_color',
        headerName: 'Newly Recovered',
        width: 200,
        headerAlign: 'center',
        headerClassName: "table_header_color"
    },
    {
        field: 'newDeaths',
        cellClassName: 'table_cell_color',
        headerName: 'New Deaths',
        width: 200,
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
        <div style={{height: 1000, width: '100%', backgroundColor: "#323232", color: "white !important"}}>
            <DataGrid style={{
                color: "white !important",
                backgroundColor: "red"
            }} rows={props.row} columns={columns} pageSize={20}/>
        </div>
    );
}

export default DataGridDemo;
