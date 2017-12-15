import { combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form';
import authReducer  from './authReducer';
import employeeReducers from './employeeReducer';
import employeeDetailReducers from './employeeDetailReducer';
import allEmployeesReducers from './allEmployeesReducer';
import userSettingsReducers from './userSettingReducer';

const rootReducer = combineReducers({
  form: formReducer,
  auth: authReducer,
  employee: employeeReducers,
  employeeDetail: employeeDetailReducers,
  allEmployees: allEmployeesReducers,
  userSettings: userSettingsReducers 
});

export default rootReducer; 