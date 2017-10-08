import React from 'react';
import Redirect from 'react-router';
import {
  BrowserRouter as Router,
  Route,
  Link
} from 'react-router-dom';
import dashboardPage from '../dashboard/DashboardPage';
import employeePage from '../employee/EmployeePage';
import auditreportPage from '../audit/AuditPage';
import integrationPage from '../integration/IntegrationPage';


// Each logical "route" has two components, one for
// the sidebar and one for the main area. We want to
// render both of them in different places when the
// path matches the current URL.
const routes = [
  { path: '/dashboard',
    exact: true,
    main: dashboardPage
  },
  { path: '/employee',
    main: employeePage
  },
  { path: '/audit',
  main: auditreportPage
  },
  { path: '/integration',
  main: integrationPage
  }
];

const SidePage = () => (
  <Router>
    <div style={{ display: 'flex' }}>
      <div style={{
        padding: '10px',
        width: 250,
        marginTop:100
      }}>
        <ul style={{ listStyleType: 'none', marginTop:1  }}>
          <li><Link to="/dashboard">Dashboard</Link></li>
          <li><Link to="/employee">Employee</Link></li>
          <li><Link to="/audit">Audit Report</Link></li>
          <li><Link to="/integration">Integration</Link></li>
        </ul>
      </div>

      <div style={{ 
        flex: 1,
        marginTop:10,
        marginLeft:50 
      }}>
        {routes.map((route, index) => (
          // Render more <Route>s with the same paths as
          // above, but different components this time.
          <Route
            key={index}
            path={route.path}
            exact={route.exact}
            component={route.main}
          />
        ))}
      </div>
    </div>
  </Router>
);

export default SidePage;