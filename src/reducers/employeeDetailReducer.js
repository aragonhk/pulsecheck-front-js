import * as types from '../actions/types';

const initialState = {
    employeeDetail: {}
};

export default function employeeReducer(state = [], action){
    switch(action.type){
        case types.LOAD_EMPLOYEE_DETAIL_SUCCESS:
            return action.employeeDetail;
        case types.CLEAR_EMPLOYEE_STATE:
            return state = [];
        default:
            return state;
    }
}