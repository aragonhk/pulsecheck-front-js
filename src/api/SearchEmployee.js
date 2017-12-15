import axios from 'axios';
import { API_SEARCH_EMPLOYEE_DETAILS } from './apiSource';

export function searchEmployeeDetails(employeeID) {
    let request = axios({
        method:'get',
        url: API_SEARCH_EMPLOYEE_DETAILS+'/'+employeeID,
        headers: {
            'Content-Type': 'application/json'
        }
    });
   
    return request;
}