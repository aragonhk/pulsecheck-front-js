import axios from 'axios';
import * as types from './types';
import { API_SEARCH_EMPLOYEE_DETAILS } from '../api/apiSource';

export function loadEmployeeDetails(employeeID) {
    return function(dispatch) { //inside thunk
        return axios({
                method:'get',
                url: API_SEARCH_EMPLOYEE_DETAILS+"/"+employeeID,
                headers: { 'Content-Type': 'application/json' }
            })
            .then( res => { 
                  //console.log(res);
                if (res.data.statuscode == '200'){
                    console.log("employeeActions"+res.data.response);
                    dispatch(loadEmployeeDetailSuccess(res.data.response));
                } 
            })
            .catch(error => {
                console.log("ERROR"+error);
                throw(error);
            });
    };
}

export function loadEmployeeDetailSuccess(employee){
    return {type: types.LOAD_EMPLOYEE_DETAIL_SUCCESS, employee};
}

export function clearEmployeeDetailState() {
    return function(dispatch) { //inside thunk
        dispatch(clearEmployeeStateSuccess());
    };
}

export function clearEmployeeStateSuccess(){
    return {type: types.CLEAR_EMPLOYEE_STATE};
}

