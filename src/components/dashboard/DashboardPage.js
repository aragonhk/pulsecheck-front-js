import React from 'react';  
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as allEmployeeActions from '../../actions/allEmployeeActions';
import PropTypes from 'prop-types';
import { Bar, Pie } from 'react-chartjs-2';
import { ChartsTable, PieTable } from './charts';
import EmployeeTable from '../employee/EmployeeTable';
import toastr from 'toastr';
import { TOASTR_OPTIONS } from '../../utils/toastr';
import { isEmpty } from 'lodash';

class Dashboard extends React.Component {
  constructor(props){
      super(props);
      this.state= {
            filterText: '',
            itemsPerPage: 10,
            activePage:1
        }; 
        this.handleFilterTextChange = this.handleFilterTextChange.bind(this);
  }

    componentDidMount(){
      //  console.log("isEmpty: " +isEmpty(this.props.allEmployees));
        //if(isEmpty(this.props.allEmployees)) { 
            this.props.actions.loadAllEmployees()
            .then( res => { })
            .catch(error => { toastr.error('Error getting data'); });
        //}
    }

    handleFilterTextChange(filterText) {
        this.setState({ filterText: filterText });
    }

  render() {
        return (
            <div id="dashboardPage">
                <div className="container">
                    <div className="row" >
                        <h5>Currently { this.props.allEmployees.length } employees with active monitoring.</h5>
                        <br/><br/>
                        <br/>
                    </div>
                    <div className="row">
                        <div className="col-md-6">
                            <ChartsTable/>
                        </div>
                        <div className="col-md-6">
                            <PieTable/>
                        </div>
                    </div>
                    <div className="row">
                        <br/><br/>
                        <br/>
                    </div>
                    <div className="row">
                        <br/><br/><br/>
                        <EmployeeTable 
                            employeeData={this.props.allEmployees} 
                            filterText={this.state.filterText}
                            itemsPerPage={this.state.itemsPerPage}
                            activePage={this.state.activePage}
                        />
                    </div>
                </div>
            </div>
        );
    }
}

EmployeeTable.propTypes = {
    employeeData: PropTypes.array.isRequired
};

Dashboard.propTypes = {
    allEmployees: PropTypes.array.isRequired,
    actions: PropTypes.object.isRequired
};

function mapStateToProps (state, ownProps){
    return {
        allEmployees: state.allEmployees.employees,
        sortBy: state.sortBy
    };
}

function mapDispatchToProps(dispatch){
    return {
        actions: bindActionCreators(allEmployeeActions, dispatch)
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(Dashboard);