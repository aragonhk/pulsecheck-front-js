//This component handles the App template used on every page

import React from 'react';
import {Route, Switch, Link} from 'react-router-dom';
import HomePage from './home/HomePage';
import AboutPage from './about/AboutPage';
import LoginPage from './login/LoginPage';
import ProductPage from './product/ProductPage';
import Header from "./common/Header";
import sidePage from './common/SidePage';

class App extends React.Component {
 
    render(){
        return (
             <div>
              <Header/>
                <Switch>
                    <Route path="/login" component={LoginPage}  />
                    <Route path="/about" component={AboutPage} />
                    <Route path="/product" component={ProductPage} />
                    <Route path="/dashboard" component={sidePage} />
                    <Route path="/employee" component={sidePage} />
                    <Route exact path="/" component={HomePage} />
                                       
                </Switch>    
            </div>  
        );
    }
}

export default App;  