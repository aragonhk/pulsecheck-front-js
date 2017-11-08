import * as types from '../actions/types';

export default function userSettingsReducers(state = [], action){
    switch(action.type){
        case types.LOAD_USER_SETTINGS_SUCCESS:
            return action.userSettings; //just return whats passed in from action
        default:
            
            return state;
    }
}