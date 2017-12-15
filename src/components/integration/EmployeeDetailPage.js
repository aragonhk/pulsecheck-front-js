import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators, createStore } from 'redux';
import employeeReducer from '../../reducers/employeeReducer';
import * as employeeActions from '../../actions/employeeActions';
import { searchEmployeeDetails as APISearchEmployeeDetails } from '../../api/SearchEmployee';
import PropTypes from 'prop-types';
import FileSaver from 'file-saver';
import { Button } from 'react-bootstrap';
import toastr from 'toastr';
import { TOASTR_OPTIONS } from '../../utils/toastr';
import ConcatName from '../../utils/concatName';
import convertToCSV from '../../utils/convertToCSV';
import Moment from 'moment';
import { isUndefined, isEmpty } from 'lodash';
import { withRouter } from 'react-router';

class EmployeeRow extends React.Component {
    constructor(props){
        super(props);
    }
    render(){
        let sourceDetails = this.props.sourceDetails;
        return (
            <tr>
                <td>{Moment(sourceDetails.lastsearch).format('DD-MM-YYYY')}</td>
                <td>{sourceDetails.consider ? "Consider" : "Clear"}</td>
                <th>{sourceDetails.source}</th>
                <th>{sourceDetails.details}</th>
                <th>{sourceDetails.reference}</th>
            </tr>
        );
    }
}

EmployeeRow.propTypes = {
    sourceDetails: PropTypes.object
};

class EmployeeTable extends React.Component {
    constructor(props){
        super(props);
    }

    render() {
        const rows = [];

        if (!isUndefined(this.props.employeeDetails.sources)) {
            let counter = 0;
            this.props.employeeDetails.sources.forEach( (source) => {
                rows.push( <EmployeeRow key={counter++} sourceDetails={source} />
                );
            });
            return (
                        <div className="form-group">
                            <table className="table table-hover">
                                <thead>
                                    <tr className="active">
                                        <th>Date</th>
                                        <th>Status</th>
                                        <th>Source</th>
                                        <th>Details</th>
                                        <th>Reference</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {rows}
                                </tbody>
                            </table>
                        </div>
                );
        }
        else {
            return (
                <div/>
            );
        }
    }
}
EmployeeTable.propTypes = {
    employeeDetails: PropTypes.oneOfType([ PropTypes.object, PropTypes.array])
};

class EmployeeDetailPage extends React.Component {
    constructor(props){
        super(props);
        this.state = { 
            employeeDetails: []
        }; 
        this.exportCSVSubmit = this.exportCSVSubmit.bind(this);
        this.exportPDFSubmit = this.exportPDFSubmit.bind(this);
        this.previousPage = this.previousPage.bind(this);
        toastr.options = TOASTR_OPTIONS;
    }

    componentDidMount(){
        console.log("componentDidmount employee detail");

        if (isEmpty(this.props.employee.id)) {
            APISearchEmployeeDetails(this.props.employee.id)
                .then( res => {
                    this.setState({ 
                        employeeDetails: res.data.response,
                        isLoading: false  });
                    //console.log(res.data.response);
                    })
                .catch( error => toastr.error('Something went wrong: '+ error));
        }   
    }

    exportCSVSubmit(){
        const fields = ["consider","details","lastsearch","reference","source"];

        let blob = new Blob([convertToCSV(fields, this.state.employeeDetails.sources)], {type: "text/plain;charset=utf-8"});
        FileSaver.saveAs(blob, "employeedata.csv");
        toastr.success('Successfully exported CSV');
    }

    exportPDFSubmit(){
        toastr.info('Export to pdf not ready yet');
    }

    previousPage(){
    }

    render(){
        return (
            <div id="EmployeeDetailPage" className="jumbotron">
                <div className="container">
                    <div className="row">
                        <div className="col-sm-2"/>
                        <div className="col-sm-2">
                            <Button bsStyle="success">Clear</Button>
                        </div>
                        <div className="col-sm-6"> 
                            <div className="form-group"> 
                                <strong>Employee Detail:</strong>
                            </div>
                            <div className="form-group">
                                {this.props.employee.firstname + " " + this.props.employee.middlename + " " + this.props.employee.lastname + " " + Moment(this.props.employee.dateofbirth).format('DD-MMMM-YYYY')} 
                            </div>
                        </div>
                        <div className="col-sm-2"/>
                    </div>
                    <div className="row">
                        <div className="col-sm-2"/>
                        <div className="col-sm-8">  
                            <div className="form-group">
                                <p/>
                                <EmployeeTable employeeData={this.props.employee} employeeDetails={this.state.employeeDetails} />
                                <p/>
                            </div>
                        </div>
                        <div className="col-sm-2"/>
                    </div>
                    <div className="row">
                        <div className="col-sm-2"/>
                        <div className="col-sm-4">
                            <Button bsStyle="default" onClick={this.previousPage}>Back</Button>
                        </div>
                        <div className="col-sm-4 text-right">  
                            <div className="form-group">
                            <Button bsStyle="default" onClick={this.exportCSVSubmit}>Export to CSV</Button> <Button bsStyle="default" onClick={this.exportPDFSubmit}>Export to PDF</Button>     
                            </div>
                        </div>
                        <div className="col-sm-2"/>
                    </div>
                </div>
            </div>
        );
    }
}

EmployeeDetailPage.propTypes = {
    employee: PropTypes.object,
    employeeDetails: PropTypes.object,
    history: PropTypes.object
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

export default connect(mapStateToProps)(EmployeeDetailPage);