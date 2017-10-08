import 'babel-polyfill';
import React from 'react';
import {render} from 'react-dom';
import routes from './routes';
//import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import './public/styles/styles.css'; // webpack import css files

render ((
    routes
),document.getElementById('app'));