//This component handles the App template used on every page

import React from 'react';
import {BrowserRouter as Router, Route, Switch, Link} from 'react-router-dom';
import HomePage from './home/HomePage';
import AboutPage from './about/AboutPage';
import Header from "./common/Header";

class App extends React.Component {
    render(){
        return (
             <div className="container">
              <Header/>
                <Switch>
                    <Route exact path="/about" component={AboutPage} />
                    <Route path="/" component={HomePage} />                   
                </Switch>    
            </div>  
        );
    }
}

export default App;  