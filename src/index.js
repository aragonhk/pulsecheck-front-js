import 'babel-polyfill';
import $ from 'jquery';
import React from 'react';
import ReactDOM from 'react-dom';
import './public/styles/styles.css';
import configureStore from './store/configureStore';
import { Provider } from 'react-redux';
import App from './components/App';
import setAuthToken from './utils/setAuthToken';
import jwtDecode from 'jwt-decode';
import { setCurrentUser } from './actions/authActions';
import { loadEmployees } from './actions/employeeActions';
import '../node_modules/toastr/build/toastr.min.css';
import 'react-widgets/dist/css/react-widgets.css';


const store = configureStore();

//store.dispatch(loadEmployees());

if (localStorage.jwtToken){
    setAuthToken(localStorage.jwtToken);
    store.dispatch(setCurrentUser(jwtDecode(localStorage.jwtToken)));
}

ReactDOM.render (
    <Provider store={store}>
        <App/>
    </Provider>
,document.getElementById('root'));