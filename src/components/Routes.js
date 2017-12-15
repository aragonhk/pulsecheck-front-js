import React from 'react';

import { Route, Switch } from 'react-router-dom';
import HomePage from './home/HomePage';
import AboutPage from './about/AboutPage';
import LoginPage from './login/LoginPage';
import ProductPage from './product/ProductPage';
import SidePage from './common/SidePage';
import NotFoundPage from './common/NotFoundPage';
import Authenticate from '../utils/Authenticate';
import Blank from '../utils/blank';
import Settings from './settings/UserSettingsPage';

const Routes = () => {
    return (
        <Switch>
            <Route path="/login" component={LoginPage}  />
            <Route path="/about" component={AboutPage} />
            <Route path="/product" component={ProductPage} />
            <Route path="/user/dashboard" component={Authenticate(SidePage)}  />
            <Route path="/user/employee" component={Authenticate(SidePage)} />
            <Route path="/user/audit" component={Authenticate(SidePage)} />
            <Route path="/user/integration" component={Authenticate(SidePage)} />
            <Route path="/user/settings" component={Authenticate(Settings)}  />
            <Route exact path="/" component={HomePage} />
            <Route path="*" component={NotFoundPage}/>
        </Switch>
    );
};

export default Routes;