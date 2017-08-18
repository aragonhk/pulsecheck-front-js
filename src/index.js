import 'babel-polyfill';
import React from 'react';
import {render} from 'react-dom';
import routes from './routes';
import './styles/styles.css'; // webpack import css files
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';

render ((
    routes
),document.getElementById('app'));