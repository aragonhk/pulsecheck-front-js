import axios from 'axios';
import { API_UPLOAD_MULTIPLE_EMPLOYEES } from './apiSource';

export function importCSV(data) {
/*    let data2 = [
                    {
                        "firstname": "Gordon",
                        "middlename": "James",
                        "lastname": "Ramsey",
                        "dateofbirth": "1951-05-21",
                        "type": 1
                    },
                    {
                        "firstname": "Teresa",
                        "middlename": "",
                        "lastname": "Watson",
                        "dateofbirth": "1999-07-23",
                        "type": 1
                    }];
    
    console.log("JSON: data" + data);
    console.log("JSON data2: " + JSON.stringify(data2));
*/    
    let request = axios({
        method:'post',
        url: API_UPLOAD_MULTIPLE_EMPLOYEES,
        headers: {
            'Content-Type': 'application/json'
        },
        data: data
    })
    .then( res => { 
        console.log(res);
        if (res.data.statuscode == '200'){
            console.log(res.data.response);
        }
        else
            throw new Error();
    });
   return request;
}
