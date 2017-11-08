import * as types from '../actions/types';

export default function employeeReducer(state = [], action){
    switch(action.type){
        case types.LOAD_EMPLOYEES_SUCCESS:
            return action.employees; //just return whats passed in from action
        default:
            
            return state;
    }
}