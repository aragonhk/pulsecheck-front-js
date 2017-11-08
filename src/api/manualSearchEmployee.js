import axios from 'axios';
import { API_SEARCH_EMPLOYEE_STATUS } from './apiSource';

export function searchEmployeeDetails(data) {
    let request = axios({
        method:'post',
        url: API_SEARCH_EMPLOYEE_STATUS,
        headers: {
            'Content-Type': 'application/json'
        },
        data: data
    })
    .then( res => { 
        if (res.data.statuscode == '200'){
            console.log(res.data.response);
            return res.data.response;
        }
        else
            throw new Error();
    });
   return request;
}
