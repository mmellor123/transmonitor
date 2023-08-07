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
        var columns = []
        Object.entries(this.props.data).forEach(([key, value]) => {
            if(key < 1){
                Object.entries(this.props.data[key]).forEach(([key1, value1]) => {
                    if(key1 === "CIF From" && !this.props.isCustomerPage){
                        columns.push({field: key1, headerName: key1, renderCell: (params) => 
                            <Link to={"/customer?cif=" + params.row[`CIF From`] + "&start="+params.row.From + "&end="+params.row.To+"&type="+params.row.type}>
                                {params.row[`CIF From`]}
                            </Link>
                        });
                    }
                    else if(key1 === "whitelist"){
                        columns = this.addRuleEditIcons(columns);
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
                            border: "none",
                            color: "#000"
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