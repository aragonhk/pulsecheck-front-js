import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as employeeActions from '../../actions/employeeActions';
import PropTypes from 'prop-types';
import {Tab, Tabs} from 'react-bootstrap';
import CSVImportPage from './CSVImportPage';
import ManualSearchPage from './ManualSearchPage';
import MockdataPage from '../mockdata/mockdataPage';
import APIIntegrationPage from './APIIntegrationPage';
import EmployeeDetailPage from './EmployeeDetailPage';

class IntegrationPage extends React.Component {
  constructor(props){
    super(props);
    this.state = { key: 1 }; 
    this.props.actions.clearEmployeeState();
    this.handleChangeTab = this.handleChangeTab.bind(this);
  }

  handleChangeTab(key) {
    this.setState ({ key: key });
    if( key == 1 )
      this.props.actions.clearEmployeeState();
  }

  render() {
    return (
      <div>
           <Tabs activeKey={this.state.key} onSelect={this.handleChangeTab} id="controlled-tab">
              <Tab eventKey={1} title="Manual Search" ><ManualSearchPage changeTab={this.handleChangeTab} {...this.props}/></Tab>
              <Tab eventKey={2} title="CVS Import"><CSVImportPage /></Tab>
              <Tab eventKey={3} title="API Integration"><APIIntegrationPage /></Tab>
              <Tab eventKey={4} title="Mock Data"><MockdataPage /></Tab>
              <Tab eventKey={5} > {(this.state.key == 5) ? <EmployeeDetailPage {...this.props}/> : <div/>} </Tab>
          </Tabs>
      </div>
    );
  }
}

IntegrationPage.propTypes = {
  actions: PropTypes.object.isRequired
};

function mapStateToProps (state, ownProps){
  return {
      employee: state.employee
  };
}

function mapDispatchToProps(dispatch){
  return {
      actions: bindActionCreators(employeeActions, dispatch)
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(IntegrationPage);