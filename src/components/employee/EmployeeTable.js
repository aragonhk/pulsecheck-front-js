import React from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';
import * as types from '../../actions/types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as allEmployeeActions from '../../actions/allEmployeeActions';
import toastr from 'toastr';
import { TOASTR_OPTIONS } from '../../utils/toastr';

const EmployeeRow = ({counter, employee}) => {
    return (
        <tr>
            <td>{counter}</td>
            <td>{employee.firstname}</td>
            <td>{employee.middlename}</td>
            <td>{employee.lastname}</td>
            <td>{moment(employee.dateofbirth).format('MM-DD-YYYY')}</td>
            <td>{employee.source}</td>
            <td>{employee.offence}</td>
        </tr>
    );
};

EmployeeRow.propTypes = {
    counter: PropTypes.number,
    employee: PropTypes.object.isRequired,
    filterText: PropTypes.string
};

const ParseName = (firstname, middlename, lastname, lowercase) => {
    let name;

    if ( firstname != null)
        name = firstname;
    if ( middlename != null)
        name = name + " " + middlename;
    if (lastname != null)
        name = name + " " + lastname;
    if(lowercase)
        return name.toLowerCase();
    else 
        return name;
};

class EmployeeTable extends React.Component {
    constructor(props){
        super(props);
        this.sortBy = this.props.sortBy;
        this.orderBy = this.props.orderBy; 
        toastr.options = TOASTR_OPTIONS;
        this.changeSorting = this.changeSorting.bind(this);
        this.showCaret = this.showCaret.bind(this);
    }
    
    changeSorting(event){
        event.preventDefault();

        if(this.sortBy == event.target.getAttribute("name"))
            this.orderBy = (this.orderBy == types.ORDER_BY_ASC) ? types.ORDER_BY_DESC : types.ORDER_BY_ASC; 
        else {
            this.sortBy = event.target.getAttribute("name");
            this.orderBy = types.ORDER_BY_ASC;
        }
        this.props.actions.sortEmployees(this.sortBy, this.orderBy);
    }

    showCaret(selectedSortBy){
        if( this.sortBy == selectedSortBy )
            return this.orderBy == types.ORDER_BY_ASC ? <i className="fa fa-caret-up" aria-hidden="true"/> : <i className="fa fa-caret-down" aria-hidden="true"/> ;
    }

    render() {
        const filterText = this.props.filterText;
        const rows = [];
        let start, end, counter;

        //Search name
        if (filterText === "") {
            start = this.props.itemsPerPage * ( this.props.activePage - 1 );
            end = this.props.activePage * this.props.itemsPerPage;
        }
        else {
            start = 0;
            end = this.props.employeeData.length;
        }
        
        counter = start + 1;
        console.log("start: " + start + " end: " + end);

        this.props.employeeData.slice(start, end).forEach((employee) => {
            if (filterText != "") {
                let name = ParseName(employee.firstname, employee.middlename, employee.lastname, true);     

                if (name.indexOf(filterText.toLowerCase()) === -1) 
                    return;
            }
                rows.push(  <EmployeeRow key={employee.id} counter={counter++} employee={employee}/> );
            });

    return (
            <div>
                <table className="table table-hover">
                    <thead>
                        <tr>
                            <th>#</th>
                            <th><a href="#" name={types.SORT_BY_FIRSTNAME} onClick={this.changeSorting}>First name {this.showCaret(types.SORT_BY_FIRSTNAME)} </a></th>
                            <th><a href="#" name={types.SORT_BY_MIDDLENAME} onClick={this.changeSorting}>Middle name {this.showCaret(types.SORT_BY_MIDDLENAME)}</a></th>
                            <th><a href="#" name={types.SORT_BY_LASTNAME} onClick={this.changeSorting}>Last name {this.showCaret(types.SORT_BY_LASTNAME)}</a></th>
                            <th><a href="#" name={types.SORT_BY_DATEOFBIRTH} onClick={this.changeSorting}>Date of Birth {this.showCaret(types.SORT_BY_DATEOFBIRTH)}</a></th>
                            <th>Source</th>
                            <th>Offense</th>
                        </tr>
                    </thead>
                    <tbody>
                        {rows}
                    </tbody>
                </table>
            </div>
        );
    }
}


EmployeeTable.propTypes = {
    employeeData: PropTypes.array.isRequired,
    filterText: PropTypes.string,
    itemsPerPage: PropTypes.number.isRequired,
    activePage: PropTypes.number.isRequired,
    actions: PropTypes.object.isRequired,
    orderBy: PropTypes.string.isRequired,
    sortBy: PropTypes.string.isRequired
};

function mapStateToProps (state, ownProps){
    return {
        sortBy: state.allEmployees.sortBy,
        orderBy: state.allEmployees.orderBy
    };
}

function mapDispatchToProps(dispatch){
    return {
        actions: bindActionCreators(allEmployeeActions, dispatch)
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(EmployeeTable);