import { useSyncExternalStore } from 'react';
import { Typography, useTheme } from '@mui/material';
import {Link} from "react-router-dom";
import {MenuItem} from "react-pro-sidebar";
import {tokens} from "../theme";



export const BASE_URL = "https://s2.transactionmonitor.co.uk";
export const TOKEN = "mytoken";

export function useWindowDimensions() {
  // the 3rd parameter is optional and only needed for server side rendering
  return useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
}

export const Item = ({ title, to, icon, selected, setSelected }) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  return (
    <MenuItem
      active={selected === title}
      style={{
        color: colors.grey[100],
      }}
      onClick={() => setSelected(title)}
      icon={icon}
      component={<Link to={to}/>}
    >
      <Typography>{title}</Typography>
    </MenuItem>
  );
};

function subscribe(callback) {
  window.addEventListener('resize', callback);
  return () => window.removeEventListener('resize', callback);
}

function getSnapshot() {
  return { width: window.innerWidth, height: window.innerHeight };
}

function getServerSnapshot() {
  return {
      width: 0,
      height: 0,
  };
}

export function getStartAndEndDates(numberMonthsAgo) {
        let startDate = new Date();
        let endDate = new Date();

        startDate.setMonth(startDate.getMonth() - ((numberMonthsAgo) + 1));
        endDate.setMonth(endDate.getMonth() - (numberMonthsAgo));
        return [startDate.toISOString().split('T')[0], endDate.toISOString().split('T')[0]];
    }

export function jsonToCSV(dict){
  let fields = ''
  if(dict.length > 0){
    fields = Object.keys(dict[0]).join(',')+'\n';
  }
  
  const rows = Object.keys(dict).map(function(k){
    const p = Object.keys(dict[k]).map(function(j){
      return dict[k][j];
    }).join(',');
    return p;
  }).join('\n');
  return fields + rows;
}

export function sendEmail(email, csv, filename){
    fetch(BASE_URL + "/send-email", 
      {method: "POST", headers: {'token':'mytoken', 'content-type':'application/json'}, 
      body: JSON.stringify({email: email, csv_file: csv, filename: filename})
    })
            .then(res => {
              window.alert("Email sent to ", email)
            });
}

export function monthIndexToString(month){
  const months = ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"];
  return months[month - 1];
}

export function getDates(year, month) {
  let startDate = new Date();
  let endDate = new Date();
  startDate.setFullYear(year);
  endDate.setFullYear(year);

  startDate.setDate(1);
  endDate.setDate(1);

  startDate.setMonth(month-1);
  endDate.setMonth(month);
  return [startDate.toISOString().split('T')[0], endDate.toISOString().split('T')[0]];
}


export async function fetchData(url){
    const response = await fetch(url, {headers: {'token':TOKEN}})
          .then(
            res => res.json()
            )
          .then(
            (results) => {
                    return results;
            },
            (error) => {
              console.log("Error: ", error);
            }
          )
    return response;
}

export async function deleteRule(url, payload){
  const response = await fetch(url, {
    method: "DELETE",
    body: JSON.stringify(payload),
    headers: {
      "Content-type": "application/json; charset=UTF-8",
      'token': TOKEN
    }
  }).then(
    res => res.json()
  )
  .then(
    (results) => {
      window.alert("Rule Deleted Successfully!")
    },
    (error) => {
      window.alert("An error occured. Please try again")
    }
  );
}

export async function postData(url, payload, method){
  console.log("Url: ", url)
  console.log("Data: ", payload)
  const response = await fetch(url, {
    method: method,
    body: JSON.stringify(payload),
    headers: {
      "Content-type": "application/json; charset=UTF-8",
      'token': TOKEN
    }
  }).then(
    res => res.json()
  )
  .then(
    (results) => {
      console.log(results);
      console.log("Rule Created Successfully!")
    },
    (error) => {
      window.alert("An error occured. Please try again")
      console.log(error)
    }
  );
}