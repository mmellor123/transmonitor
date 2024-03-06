import React from 'react';
import TextField from '@mui/material/TextField';
import { Paper } from '@mui/material'
import Autocomplete from '@mui/material/Autocomplete';
import { styled } from "@mui/material/styles";
import { ContactSupportOutlined } from '@mui/icons-material';


const InventoryEntry = ({ entry, index, onDelete }) => {

  return (
    <tr style={{ backgroundColor: index % 2 > 0 ? "white" : "#F3F3F3" }}>
      <td>{entry.cif}</td>
      <td>{entry.name} {entry.sname}</td>
      <td>
        <button className="delete-rule-button" onClick={() => onDelete(entry.cif)}>Remove</button>
      </td>
    </tr>
  );
};

const InventoryApp = ({ validCif, cif, onChange, onAdd, list, listWithName, onDelete, addCustomer, search, onFilter, cifList }) => {
  console.log("listWithname: ", listWithName);
  const filteredArray = listWithName.filter(item => item.cif.indexOf(search) > -1 || (item.name && item.name.includes(search)) || (item.sname && item.sname.includes(search)));

  const StyledAutocomplete = styled(Autocomplete)({
    "& .MuiInputLabel-outlined:not(.MuiInputLabel-shrink)": {
      height: "30px",
      transform: "translate(34px, 20px) scale(1);"
    },
    "&.Mui-focused .MuiInputLabel-outlined": {
      color: "red",
      height: "30px",
    },
    "& .MuiAutocomplete-inputRoot": {
      color: "black",
      padding: "0px!important",
      height: "30px",
      borderWidth: "1px",
      // This matches the specificity of the default styles at https://github.com/mui-org/material-ui/blob/v4.11.3/packages/material-ui-lab/src/Autocomplete/Autocomplete.js#L90
      '&[class*="MuiOutlinedInput-root"] .MuiAutocomplete-input:first-of-type': {
        height: "30px",
      },
      "& .MuiOutlinedInput-notchedOutline": {
        borderColor: "green",
        height: "30px",
      },
      "&:hover .MuiOutlinedInput-notchedOutline": {
        borderColor: "red",
        height: "30px",
      },
      "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
        borderColor: "purple",
        height: "30px",

      },
      "&&& $input": {
        height: "30px",
      },
      "& .MuiOutlinedInput-root": {
        height: "30px",
      },
    }

  });

  const getDisabledButton = (isEnabled) => {
    return isEnabled ? "popup-button-confirm" : "popup-button-disabled";
  }

  const defaultProps = {
    options: cifList,
    getOptionLabel: (option) => option.name + " " + option.sname + " " + option.cif,
  };

  const handleChange = (value) => {
    onChange(value)
  }



  return (
    <div className="inventory-app">

      <div className="add-item">
        <StyledAutocomplete
          {...defaultProps}
          id="search-cif"
          value={cifList.filter(obj => {
            return obj.cif === cif
          })[0]}
          PaperComponent={({ children }) => (
            <Paper style={{ color: "black", background: "white" }}>{children}</Paper>
          )}
          isOptionEqualToValue={(option, value) => option.cif === value.cif}
          renderInput={(params) => (
            <TextField {...params} label="CIF" variant="standard" sx={{ width: "200px", bottom: "15px" }} />
          )}
          onChange={(event, value) => handleChange(value.cif)}
        />

        <button disabled={!validCif ? true : false} className={"popup-button " + getDisabledButton(validCif)} onClick={() => onAdd()}>Add</button>
        <input
          type="text"
          placeholder="Search"
          value={search}
          onChange={(e) => onFilter(e.target.value)}
          className="valid-box"
          style={{ marginRight: "0", marginLeft: "auto" }}
        />
      </div>
      <div className='whitelist-table'>
        <table>
          <thead>
            <tr>
              <th style={{ width: "20%" }}>CIF</th>
              <th style={{ width: "60%" }}>Name</th>
              <th style={{ width: "20%" }}>Action</th>
            </tr>
          </thead>
          <tbody>
            {filteredArray.map((cif, index) => (
              <InventoryEntry key={cif.cif} entry={cif} index={index} onDelete={onDelete} />
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default InventoryApp;
