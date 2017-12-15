import * as types from '../actions/types';

const initialState = {
    sortBy: types.SORT_BY_FIRSTNAME,
    orderBy: types.ORDER_BY_ASC,
    employees: []
};

export default function allEmployeesReducer(state = initialState, action){
    switch(action.type){
        case types.LOAD_ALL_EMPLOYEES_SUCCESS: //First time 
            return (Object.assign({}, state, 
                    { employees: action.allEmployees.slice().sort(function(a, b){
                        let nameA = a.firstname.toLowerCase(), nameB = b.firstname.toLowerCase();
                        return  (nameA == nameB ? 0 : nameA < nameB ? -1 : 1) * (action.orderBy == types.ORDER_BY_DESC ? -1: 1);
                    })},
                    { sortBy:  types.SORT_BY_FIRSTNAME },
                    { orderBy: types.ORDER_BY_ASC } 
            ));
           // return action.allEmployees; //just return whats passed in from action

        case types.SORT_BY_FIRSTNAME:
            return (Object.assign({}, state,
                { employees: state.employees.slice().sort(function(a, b){
                    let nameA = a.firstname.toLowerCase(), nameB = b.firstname.toLowerCase();
                    return  (nameA == nameB ? 0 : nameA < nameB ? -1 : 1) * (action.orderBy == types.ORDER_BY_DESC ? -1: 1);
                })},
                { sortBy:  action.type },
                { orderBy: action.orderBy } 
            ));
        
        case types.SORT_BY_MIDDLENAME:
            return (Object.assign({}, state,
                { employees: state.employees.slice().sort(function(a, b){
                    let nameA = a.middlename.toLowerCase(), nameB = b.middlename.toLowerCase();
                    return  (nameA == nameB ? 0 : nameA < nameB ? -1 : 1) * (action.orderBy == types.ORDER_BY_DESC ? -1: 1);
                })},
                { sortBy:  action.type },
                { orderBy: action.orderBy }  
            ));

        case types.SORT_BY_LASTNAME:
            return (Object.assign({}, state,
                { employees: state.employees.slice().sort(function(a, b){
                    let nameA = a.lastname.toLowerCase(), nameB = b.lastname.toLowerCase();
                    return  (nameA == nameB ? 0 : nameA < nameB ? -1 : 1) * (action.orderBy == types.ORDER_BY_DESC ? -1: 1);
                })},
                { sortBy:  action.type },
                { orderBy: action.orderBy }  
            ));

        case types.SORT_BY_DATEOFBIRTH:
            return (Object.assign({}, state,
                { employees: state.employees.slice().sort(function(a, b){
                    return action.orderBy == types.ORDER_BY_ASC ? Date.parse(a.dateofbirth) - Date.parse(b.dateofbirth) : Date.parse(b.dateofbirth) - Date.parse(a.dateofbirth);
                })},
                { sortBy:  action.type },
                { orderBy: action.orderBy }  
            ));

        default:
            return state;
    }
}