import axios from 'axios';
import * as types from './types';
import { API_GET_USER_SETTINGS } from '../api/apiSource';


export function loadUserSettings() {
    return function(dispatch) { //inside thunk
        return axios.get(API_GET_USER_SETTINGS+'/1', '').then( res => { 
           // console.log(res);
            if (res.data.statuscode == '200'){
               // console.log(res.data.response);
                dispatch(loadUserSettingsSuccess(res.data.response));
            }
          }).catch(error => {
            throw(error);
          });
    };
}

export function loadUserSettingsSuccess(userSettings){
    return {type: types.LOAD_USER_SETTINGS_SUCCESS, userSettings};
}