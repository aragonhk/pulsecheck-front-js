import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import PropTypes from 'prop-types';
import * as employeeActions from '../../actions/employeeActions';
import DropdownList from 'react-widgets/lib/DropdownList';
import { EmployeeTable, SearchBar } from './EmployeeTable';
import FileSaver from 'file-saver';
import toastr from 'toastr';
import { TOASTR_OPTIONS } from '../../utils/toastr';

//import Globalize from 'globalize';
//import globalizeLocalizer from 'react-widgets-globalize';
//import DateTimePicker from 'react-widgets/lib/DateTimePicker';
//import { DateTimePicker } from 'react-widgets';


function convertToCSV(objArray) {
    const fields = ["firstname","middlename","lastname","dateofbirth","type"];
    
    let array = typeof objArray != 'object' ? JSON.parse(objArray) : objArray;
    let str = '';
    for ( let i=0 ; i < fields.length-1 ; i++ )
        str += fields[i] + ',';
    str += fields[fields.length-1] + '\r\n';

    for (let i = 0; i < array.length; i++) {
        let line = '';
        for (let index in array[i]) {
            if (array[i].hasOwnProperty(index)) {  // or if (Object.prototype.hasOwnProperty.call(obj,prop)) for safety
                if (fields.includes(index)) {
                    line += array[i][index];
                    if (line != '') 
                        line += ',';
                }
            }
        }
        str += line.replace(/,\s*$/, "") + '\r\n';
    }
    return str;
}

class EmployeePage extends React.Component {
    constructor(props){
        super(props);
        toastr.options = TOASTR_OPTIONS;
        this.state = {
            filterText: ''
        }; 
        this.handleFilterTextChange = this.handleFilterTextChange.bind(this);
        this.exportCSVSubmit = this.exportCSVSubmit.bind(this);
    }

    componentDidMount(){
       /* this.props.actions.loadEmployees()
        .then( res => {})
        .catch(error => { toastr.error('Error getting data'); });*/
    }

    handleFilterTextChange(filterText) {
        this.setState({
          filterText: filterText
        });
      }

    onChangeView(event){
        event.preventDefault();
    }
    exportCSVSubmit(){
        let blob = new Blob([convertToCSV(this.props.employees)], {type: "text/plain;charset=utf-8"});
        FileSaver.saveAs(blob, "csv.txt");
        toastr.success('Successfully exported CSV');
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
                        <li className="active">Drivers ({ this.props.employees.length })</li>
                    </ol>
                </div>
            
                <div className="row">
                    <form className="form-inline">
                        <div className="form-group">
                            <SearchBar 
                                onFilterTextChange={this.handleFilterTextChange} 
                            />
                        </div>
                        <div className="dropdown form-group">
                       
                            <button className="btn btn-default dropdown-toggle" type="button" data-toggle="dropdown" disabled>Dropdown 
                                <span className="caret"/>
                            </button>
                            <ul className="dropdown-menu">
                                <li><a href="#" onClick={this.onChangeView}>item 1</a></li>
                                <li><a href="#" onClick={this.onChangeView}>item 2</a></li>
                                <li><a href="#" onClick={this.onChangeView}>item 3</a></li>
                            </ul>
                        </div>
                    </form>
                </div>
               
                <div className="row">
                    <br/>
                    <EmployeeTable 
                        employeeData={this.props.employees} 
                        filterText={this.state.filterText}
                    />
                </div>
                <div className="row text-right">
                    <button className="btn btn-default" type="submit" onClick={this.exportCSVSubmit}>Export CSV</button>
                </div>
            </div>
        </div>
        );
    }
}


EmployeeTable.propTypes = {
     employeeData: PropTypes.array.isRequired,
     filterText: PropTypes.string
};
SearchBar.propTypes = {
    filterText: PropTypes.string,
    onFilterTextChange: PropTypes.func
};

EmployeePage.propTypes = {
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

export default connect(mapStateToProps, mapDispatchToProps)(EmployeePage);