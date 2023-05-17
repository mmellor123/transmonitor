import {Box, useTheme} from "@mui/material";
import { DataGrid, GridToolbar} from "@mui/x-data-grid";
import { tokens } from "../theme";
import React, {Component} from "react";



function withMyHook(Component){
    return function WrappedComponent(props){
        const theme = useTheme();
        const colors = tokens(theme.palette.mode);
        return <Component {...props} theme={theme} colors={colors}/>
    }
}

class Table extends Component {

    state = {
    }

    getColumns = () => {
        const columns = []
        Object.entries(this.props.data).forEach(([key, value]) => {
            if(key < 1){
                Object.entries(this.props.data[key]).forEach(([key1, value1]) => {
                    if(key1 === "cif" && !this.props.isCustomerPage){
                        columns.push({field: key1, headerName: key1, renderCell: (params) => <a href={"/customer?cif=" + params.row.cif + "&start="+params.row.start_date + "&end="+params.row.end_date+"&type="+params.row.type}>{params.row.cif}</a>});
                    }
                    else{
                        columns.push({field: key1, headerName: key1});
                    }
                });
            }
            return columns;
         });
        return columns;
    }
    
    render(){
        const theme = this.props.theme;
        const colors = tokens(theme.palette.mode);
        const columns = this.getColumns();

        return (
                <Box
                    m="10px 0 0 0"
                    height="75vh"
                    sx={{
                        "& .MuiDataGrid-root": {
                            border: "none"
                        },
                        "& .MuiDataGrid-cell": {
                            borderBottom: "none"
                        },
                        "& .name-column--cell": {
                            color: colors.greenAccent[300]
                        },
                        "& .MuiDataGrid-columnHeaders": {
                            backgroundColor: colors.blueAccent[700],
                            borderBottom: "none"
                        },
                        "& .MuiDataGrid-virtualScroller": {
                            backgroundColor: colors.primary[400]
                        },
                        "& .MuiDataGrid-footerContainer": {
                            borderTop: "none",
                            backgroundColor: colors.blueAccent[700]
                        },
                        "& .MuiCheckbox-root": {
                            color: `${colors.greenAccent[200]} !important`
                        },
                        "& .MuiDataGrid-toolbarContainer .MuiButton-text": {
                            color: `${colors.grey[100]} !important`
                        }
                    }}
                >
                    <DataGrid
                        // checkboxSelection
                        rows={this.props.data}
                        columns={columns}
                        components={{Toolbar: GridToolbar}}
                    />
                </Box>
        )
    }
}

export default withMyHook(Table);