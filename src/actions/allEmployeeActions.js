import axios from 'axios';
import * as types from './types';
import { API_GET_ALL_EMPLOYEES } from '../api/apiSource';

export function loadAllEmployees() {
    return function(dispatch) { //inside thunk
        return axios
            .get(API_GET_ALL_EMPLOYEES, '')
            .then( res => { 
                //console.log(res);
                if (res.data.statuscode == '200'){
                    //console.log(res.data.response);
                    dispatch(loadAllEmployeeSuccess(res.data.response));
                } 
            })
            .catch(error => {
                throw(error);
            });
    };
}

export function loadAllEmployeeSuccess(allEmployees){
    return {type: types.LOAD_ALL_EMPLOYEES_SUCCESS, allEmployees};
}

export function sortEmployees(sortBy, orderBy) {
    return function(dispatch){
        dispatch(sortEmployeeSuccess(sortBy, orderBy));
    };
}

export function sortEmployeeSuccess(sortBy, orderBy){
    return {type: sortBy, orderBy };
}