export const BASE_URL = "https://transactionmonitor.co.uk";

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
  console.log("Send Email: ", csv, ", EMAIL: ", email);
    let data = {email: email, csv_file: csv, filename: filename};
    fetch(BASE_URL + "/send-email", {method: "POST", headers: {'token':'mytoken', 'content-type':'application/json'}, body: JSON.stringify(data)})
            .then(res => {
              console.log("Email Sent!")
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
    const response = await fetch(url, {headers: {'token':'mytoken'}})
          .then(res => res.json())
          .then(
            (results) => {
                    return results;
            },
            (error) => {
              console.log(error)
            }
          )
    return response;
}
