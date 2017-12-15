import * as types from '../actions/types';

export default function employeeReducer(state = null, action){
    switch(action.type){
        case types.LOAD_EMPLOYEE_SUCCESS:
            return action.employee;

        case types.CLEAR_EMPLOYEE_STATE:
            state=null;
            return state;
            
        default:
            return state;
    }
}