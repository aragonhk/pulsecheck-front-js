import { SET_CURRENT_USER } from '../actions/types';

const initialState = {
    isAuthenticated: false,
    user: {}
};

export default function authReducer (state = initialState, action = {} ) {
  switch(action.type) {
    case SET_CURRENT_USER:
        return (Object.assign({}, 
            {isAuthenticated: isEmpty(action.user)}, 
            {user: action.user} )); 
 
    default:
        return state;
  }
}

function isEmpty(obj) {
    for(let prop in obj) {
        if(obj.hasOwnProperty(prop))
            return true;
    }
    return false;
}