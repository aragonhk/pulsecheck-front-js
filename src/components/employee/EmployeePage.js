import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import PropTypes from 'prop-types';
import * as employeeActions from '../../actions/employeeActions';
import DropdownList from 'react-widgets/lib/DropdownList';
import EmployeeTable from './EmployeeTable';
import FileSaver from 'file-saver';
import toastr from 'toastr';
import { TOASTR_OPTIONS } from '../../utils/toastr';
import Pagination from "react-js-pagination";
import { isEmpty } from 'lodash';
import convertToCSV from '../../utils/convertToCSV';


class EmployeePage extends React.Component {
    constructor(props){
        super(props);
        toastr.options = TOASTR_OPTIONS;
        this.state = {
            filterText: '',
            itemsPerPage: 10,
            activePage: 1,
            dropdownlistDisabled: false,
        }; 

        this.filterValues = ['10', '50', '100'];
        
        this.handleFilterTextChange = this.handleFilterTextChange.bind(this);
        this.exportCSVSubmit = this.exportCSVSubmit.bind(this);
        this.handlePageClick = this.handlePageClick.bind(this);
        this.clearTextbox = this.clearTextbox.bind(this);
        this.handleDropDownListChange = this.handleDropDownListChange.bind(this);

        if(this.props.allEmployees.length <= 10)
            this.filterValues= ['10']; 
        else if(this.props.allEmployees.length > 10 && this.props.allEmployees.length <= 50 )
            this.filterValues= ['10', '50'];
        else if(this.props.allEmployees.length > 50 && this.props.allEmployees.length <= 100 ) 
            this.filterValues=['10', '50'];
        else 
             this.filterValues= ['10', '50', '100'];
    }

    handleFilterTextChange(event) {
        this.setState({ filterText: event.target.value });
    }

    exportCSVSubmit(){
        console.log(this.props.allEmployees);
        const fields = ["firstname","middlename","lastname","dateofbirth","type"];
        
        let blob = new Blob([convertToCSV(fields, this.props.allEmployees)], {type: "text/plain;charset=utf-8"});
        FileSaver.saveAs(blob, "employeesdata.csv");
        toastr.success('Successfully exported CSV');
    }

    handlePageClick(pageNumber){
        //console.log("pageNumber: "+ pageNumber);
        this.setState({ activePage: pageNumber });
    }

    handleDropDownListChange(value){
        this.setState({ 
            itemsPerPage: parseInt(value),
            activePage: 1
         });
    }

    clearTextbox(){
        this.setState({filterText: "" });
    }
  
    render(){
        return (
            <div id="employeePage">
            <div className="container">
                <div className="row">
                    <ol className="breadcrumb">
                        <li>Home</li>
                        <li>Operations center (20)</li>
                        <li>Provider (5000)</li>
                        <li className="active">Drivers ({ this.props.allEmployees.length })</li>
                    </ol>
                </div>
            
                <div className="row">
                    <div className="col-sm-5">
                    <div className="form-group">
                        <input
                            type="text"
                            placeholder="Search..."
                            className="form-control"
                            value={this.state.filterText}
                            onChange={this.handleFilterTextChange}
                        />
                    </div>

                    </div>
                    <div className="col-sm-1 text-left">
                        <div className="form-group">
                            <button className="btn btn-default" type="submit" onClick={this.clearTextbox}>Clear</button> 
                        </div>
                    </div>
                    <div className="col-sm-4 text-left">
                        <div className="form-group">
                            <button className="btn btn-default" type="submit" onClick={this.exportCSVSubmit}>Export CSV</button>
                        </div>
                    </div>
                    <div className="col-sm-2">
                    <div className="form-group">
                        <DropdownList
                            disabled={this.state.dropdownlistDisabled}
                            data={this.filterValues}
                            defaultValue={this.state.itemsPerPage}
                            value={this.state.itemsPerPage}
                            onChange={this.handleDropDownListChange}
                        />  
                        </div>
                    </div>
                </div>
               
                <div className="row">
                    <br/>
                    <EmployeeTable 
                        employeeData={this.props.allEmployees} 
                        filterText={this.state.filterText}
                        itemsPerPage={this.state.itemsPerPage}
                        activePage={this.state.activePage}
                    />
                </div>
                <div className="row">
                    <div className="col-sm-3"/>
                    <div className="col-sm-6 text-center">
                        { isEmpty(this.state.filterText) &&
                            <Pagination 
                                activePage={this.state.activePage} 
                                itemsCountPerPage={this.state.itemsPerPage} 
                                totalItemsCount={this.props.allEmployees.length} 
                                pageRangeDisplayed={3} 
                                onChange={this.handlePageClick} 
                            />
                        }
                    </div>
                    <div className="col-sm-3 text-right">
                        <br/>
                       
                    </div>
                </div>
            </div>
        </div>
        );
    }
}

EmployeePage.propTypes = {
    allEmployees: PropTypes.array.isRequired,
    actions: PropTypes.object.isRequired
};

function mapStateToProps (state, ownProps){
    return {
        allEmployees: state.allEmployees.employees
    };
}

function mapDispatchToProps(dispatch){
    return {
        actions: bindActionCreators(employeeActions, dispatch)
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(EmployeePage);