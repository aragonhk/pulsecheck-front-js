import React from 'react';
import Redirect from 'react-router';
import { HashRouter as Router, Route, Link } from 'react-router-dom';
import dashboardPage from '../dashboard/DashboardPage';
import employeePage from '../employee/EmployeePage';
import auditreportPage from '../audit/AuditPage';
import integrationPage from '../integration/IntegrationPage';
import blankPage from '../../utils/blank';
import csvimportPage from '../integration/CSVImportPage';
import ManualSearchPage from '../integration/ManualSearchPage';
import mockdataPage from '../mockdata/mockdataPage';

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
    main: blankPage
  },
  { path: '/user/integration/csvimport',
  exact: true,
  main: csvimportPage
  },
  { path: '/user/integration/manualsearch',
  exact: true,
  main: ManualSearchPage
  },
  { path: '/user/mockdata',
  exact: true,
  main: mockdataPage
  }
];

const SidePage = () => (  
    <div className="wrapper">
        <nav id="sidebar">
            <div className="sidebar-header text-center">
                <h3/>
            </div>

            <ul className="list-unstyled components">
                <li> <Link to="/user/dashboard" replace>Dashboard</Link> </li>
                <li> <Link to="/user/employee" replace>Employees</Link> </li>
                <li> <Link to="/user/audit" replace>Audit Report</Link> </li>
                <li> <Link to="/user/integration" replace>Integration</Link> </li>
                <li> <Link to="/user/integration/manualsearch" replace>Manual Search</Link> </li>
                <li> <Link to="/user/integration/csvimport" replace>csv import</Link> </li>
                <li> <Link to="/user/mockdata" replace>Mock Data</Link> </li>
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