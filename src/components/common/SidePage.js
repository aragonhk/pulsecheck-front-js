import React from 'react';
import Redirect from 'react-router';
import { HashRouter as Router, Route, Link } from 'react-router-dom';
import dashboardPage from '../dashboard/DashboardPage';
import employeePage from '../employee/EmployeePage';
import auditreportPage from '../audit/AuditPage';
import integrationPage from '../integration/IntegrationPage';
import blankPage from '../../utils/blank';

const routes = [
  { path: '/user/dashboard',
    exact: true,
    main: dashboardPage
  },
  { path: '/user/employee',
    exact: true,
    main: employeePage
  },
  { path: '/user/audit',
    exact: true,  
    main: auditreportPage
  },
  { path: '/user/integration',
    exact: true,
    main: integrationPage
  }
];

const SidePage = () => (  
    <div className="wrapper">
        <nav id="sidebar">
            <div className="sidebar-header text-center">
                <h3/>
            </div>

            <ul className="list-unstyled components">
                <li> <Link to="/user/dashboard" >Dashboard</Link> </li>
                <li> <Link to="/user/employee" >Employees</Link> </li>
                <li> <Link to="/user/audit" >Audit Report</Link> </li>
                <li> <Link to="/user/integration" >Integration</Link> </li>
            </ul>
        </nav>
        <div id="content">
          
          {routes.map((route, index) => (
            <Route
                key={index}
                path={route.path}
                exact={route.exact}
                component={route.main}
            />
          ))}
        </div>
    </div>
);

export default SidePage;