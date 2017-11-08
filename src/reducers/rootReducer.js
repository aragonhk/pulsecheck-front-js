import { combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form';
import authReducer  from './authReducer';
import employeeReducers from './employeeReducer';
import userSettingsReducers from './userSettingReducer';

const rootReducer = combineReducers({
  form: formReducer,
  auth: authReducer,
  employees: employeeReducers,
  userSettings: userSettingsReducers 
});

export default rootReducer; 