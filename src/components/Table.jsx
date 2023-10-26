import {Box, IconButton, useTheme} from "@mui/material";
import { DataGrid, GridToolbar} from "@mui/x-data-grid";
import { tokens } from "../theme";
import React, {Component, useState} from "react";
import {Link} from "react-router-dom";
import EditIcon from '@mui/icons-material/Edit';
import ClearIcon from '@mui/icons-material/Clear';
import CustomConfirmPopup from './CustomConfirmPopup'; // Assuming the file path for CustomConfirmPopup




function withMyHook(Component){
    return function WrappedComponent(props){
        const theme = useTheme();
        const colors = tokens(theme.palette.mode);
        const [selected, setSelected] = useState("Dashboard");
        return <Component {...props} theme={theme} colors={colors} selected={selected} setSelected={setSelected}/>
    }
}

class Table extends Component {

    state = {
        showPopup: false
    }

    handleConfirm = () => {
        // Triggered when the user confirms the selection
        // Implement your logic here
        console.log('Selection confirmed!');
        this.props.handleDelete(this.state.selectedRule);
        this.setState({ showPopup: false }); // Close the popup after confirmation
      };
    
      handleCancel = () => {
        // Triggered when the user cancels the selection
        // Implement your logic here
        console.log('Selection canceled!');
        this.setState({ showPopup: false }); // Close the popup after cancellation
      };

    addRuleEditIcons = (columns) => {
        if(this.props.isViewRules){
            columns.push({field: "Edit", headerName: "Edit", renderCell: (params) => 
                <Link to={"/edit-rule?id="+params.row.id}>
                    <EditIcon/>
                </Link>
            });
            columns.push({field: "Delete", headerName: "Delete", renderCell: (params) => 
                <IconButton onClick={() => this.setState({ showPopup: true, selectedRule: params.row.id})} style={{color: "#ff0033"}}>
                    <ClearIcon/>          
                </IconButton>
            });
        }
        return columns;
    }

    getColumns = () => {
        //TODO Add type to backend response
        var columns = []
        Object.entries(this.props.data).forEach(([key, value]) => {
            if(key < 1){
                if(this.props.data[key].hasOwnProperty('Start Date') && this.props.data[key].hasOwnProperty('End Date')){
                    var start = this.props.data[key]['Start Date'].replace(" ", 'T');
                    var end = this.props.data[key]['End Date'].replace(" ", 'T');
                }
                Object.entries(this.props.data[key]).forEach(([key1, value1]) => {
                    if(key1 === "Customer CIF" && !this.props.isCustomerPage){
                        columns.push({field: key1, headerName: key1, renderCell: (params) => 
                            <Link to={"/customer?cif=" + params.row[`Customer CIF`] + "&start="+start + "&end="+end+"&type="+params.row.Type}>
                                {params.row[`Customer CIF`]}
                            </Link>
                        });
                    }
                    else if(key1 === "whitelist"){
                        columns = this.addRuleEditIcons(columns);
                    }
                    else{
                        columns.push({field: key1, headerName: key1, minWidth: 150});
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
                        "border": 1,
                        "& .MuiDataGrid-root": {
                            color: "#000",
                            border: 'none',
                            borderWidth: 0,
                            borderColor: "#93AE73"
                        },
                        '.MuiDataGrid-columnSeparator': {
                            display: 'none',
                          },
                        "& .MuiDataGrid-cell": {
                            borderBottomColor: "#d4d4d4"
                        },
                        "& .name-column--cell": {
                            color: colors.greenAccent[300]
                        },
                        "& .MuiDataGrid-columnHeaders": {
                            backgroundColor: "#93AE73",
                            fontWeight: "bold"
                        },
                        "& .MuiDataGrid-columnHeaderTitle": {
                            fontWeight: "400",
                            fontSize: "15px",
                            color: "white"
                        },
                        "& .MuiDataGrid-cellContent": {
                            fontSize: "15px"
                        },
                        "& .MuiDataGrid-footerContainer": {
                            borderTop: "none",
                            backgroundColor: "#93AE73"
                        },
                        "& .MuiCheckbox-root": {
                            color: `${colors.greenAccent[200]} !important`
                        },
                        "& .MuiDataGrid-toolbarContainer .MuiButton-text": {
                            color: `${colors.grey[200]} !important`
                        }
                    }}
                >
                    <DataGrid
                        // checkboxSelection
                        rows={this.props.data}
                        columns={columns}
                        components={{Toolbar: GridToolbar}}
                    />
                    {this.state.showPopup && (
                    <CustomConfirmPopup
                        onConfirm={this.handleConfirm}
                        onCancel={this.handleCancel}
                        messageTitle="Confirm Delete?"
                        messageSubtitle="Are you sure you want to delete this rule?"
                    />
                    )}
                </Box>
        )
    }
}

export default withMyHook(Table);