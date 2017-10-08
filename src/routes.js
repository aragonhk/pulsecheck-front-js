import React from 'react';
import {HashRouter as Router, Route} from 'react-router-dom';
import App from './components/App';

export default (
    <Router >
            <Route path="/" component={App}/>
    </Router> 
);