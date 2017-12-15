//This component handles the App template used on every page
import React from 'react';
import {HashRouter as Router } from 'react-router-dom';
import Routes from './Routes';
import Header from './common/Header';
import SidePage from './common/SidePage';
import createMemoryHistory  from 'history/createMemoryHistory';

const history = createMemoryHistory();

class App extends React.Component {
    render(){
        return (
            <Router history={history}>
                <div>
                    <Header />
                    <Routes />
                </div> 
            </Router>
        );
    }
}

export default App;  