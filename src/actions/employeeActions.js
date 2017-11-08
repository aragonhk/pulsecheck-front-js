import axios from 'axios';
import * as types from './types';
import apiTest from '../api/mockCourseApi';
import { API_GET_ALL_EMPLOYEES, APITest } from '../api/apiSource';

export function loadEmployees2() {
    return function(dispatch) { //inside thunk
        return apiTest.getAllCourses().then(employees => {
            dispatch(loadEmployeeSuccess(employees));
        }).catch(error => {
            throw(error);
        });
    };
}
export function loadEmployees() {
    return function(dispatch) { //inside thunk
        return axios
            .get(API_GET_ALL_EMPLOYEES, '')
            .then( res => { 
                //console.log(res);
                if (res.data.statuscode == '200'){
                    //console.log(res.data.response);
                    dispatch(loadEmployeeSuccess(res.data.response));
                } 
            })
            .catch(error => {
                throw(error);
            });
    };
}

export function loadEmployeeSuccess(employees){
    return {type: types.LOAD_EMPLOYEES_SUCCESS, employees};
}