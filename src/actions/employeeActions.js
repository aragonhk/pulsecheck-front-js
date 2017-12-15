import axios from 'axios';
import * as types from './types';
import { API_SEARCH_EMPLOYEE_STATUS } from '../api/apiSource';

export function loadEmployee(inputFirstName, inputMiddleName, inputLastName, inputSelectedDOB) {
    let data = {
        "firstname": inputFirstName,
        "middlename": inputMiddleName,
        "lastname": inputLastName,
        "dateofbirth": inputSelectedDOB,
        "type": 1
    };
    let testdata = {
        "firstname": "James",
        "middlename": "R",
        "lastname": "hawkins",
        "dateofbirth": "1952-11-01",
        "type": 1
    };
    return function(dispatch) { //inside thunk
        return axios({
                method:'post',
                url: API_SEARCH_EMPLOYEE_STATUS,
                headers: { 'Content-Type': 'application/json' },
                data: data
            })
            .then( res => { 
                if (res.data.statuscode == '200'){
                   // console.log("employeeActions"+res.data.response);
                    dispatch(loadEmployeeSuccess(res.data.response));
                } 
            })
            .catch(error => {
                throw(error);
            });
    };
}

export function loadEmployeeSuccess(employee){
    return {type: types.LOAD_EMPLOYEE_SUCCESS, employee};
}

export function clearEmployeeState() {
    return function(dispatch) { //inside thunk
        dispatch(clearEmployeeStateSuccess());
    };
}

export function clearEmployeeStateSuccess(){
    return {type: types.CLEAR_EMPLOYEE_STATE};
}

