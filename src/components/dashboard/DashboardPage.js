import React from 'react';  
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as employeeActions from '../../actions/employeeActions';
import PropTypes from 'prop-types';
import { FAKEEMPLOYEEDATA } from '../../api/fakeData';
import { Bar, Pie } from 'react-chartjs-2';
import { ChartsTable, PieTable } from './charts';
import { EmployeeTable } from '../employee/EmployeeTable';
import toastr from 'toastr';
import { TOASTR_OPTIONS } from '../../utils/toastr';


class Dashboard extends React.Component {
  constructor(props){
      super(props);
      this.state= {
            filterText: ''
        }; 
        this.handleFilterTextChange = this.handleFilterTextChange.bind(this);
     // this.setState ({ length: FAKEEMPLOYEEDATA.length } );
  }

    componentDidMount(){
        this.props.actions.loadEmployees()
        .then( res => {})
        .catch(error => { toastr.error('Error getting data'); });
    }
    handleFilterTextChange(filterText) {
        this.setState({
        filterText: filterText
        });
    }

  render() {
        return (
            <div id="dashboardPage">
                <div className="container">
                    <div className="row" >
                        <h5>Currently { this.props.employees.length } employees with active monitoring.</h5>
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
                            employeeData={this.props.employees} 
                            filterText={this.state.filterText}
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
    employees: PropTypes.array.isRequired,
    actions: PropTypes.object.isRequired
};

function mapStateToProps (state, ownProps){
    return {
        employees: state.employees
    };
}

function mapDispatchToProps(dispatch){
    return {
        actions: bindActionCreators(employeeActions, dispatch)
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(Dashboard);