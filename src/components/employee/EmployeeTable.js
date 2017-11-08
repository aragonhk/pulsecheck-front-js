import React from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';

const EmployeeRow = ({employee}) => {
    return (
        <tr>
            <td>{ParseName(employee.firstname, employee.middlename, employee.lastname, false)}</td>
            <td>{moment(employee.dateofbirth).format('MM-DD-YYYY')}</td>
            <td>{employee.source}</td>
            <td>{employee.offence}</td>
        </tr>
    );
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

export class EmployeeTable extends React.Component {
    constructor(props){
        super(props);
    }

    render() {
        const filterText = this.props.filterText;
        const rows =[];
       
        this.props.employeeData.forEach((employee) => {
           
            let name = ParseName(employee.firstname, employee.middlename, employee.lastname, true);     
            //console.log(name);
            if (name.indexOf(filterText) === -1) {
              return;
            }
            rows.push(
                <EmployeeRow key={employee.id} employee={employee}/>
            );
        });
    return (
            <div id="employeeTable">
                <table className="table table-hover">
                    <thead>
                        <tr>
                            <th>Name</th>
                            <th>Date of Birth</th>
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

export class SearchBar extends React.Component {
    constructor(props) {
      super(props);
      this.handleFilterTextChange = this.handleFilterTextChange.bind(this);
    }
    
    handleFilterTextChange(event) {
        this.props.onFilterTextChange(event.target.value);
    }
    
    render() {
      return (
            <input
                type="text"
                placeholder="Search..."
                className="form-control"
                value={this.props.filterText}
                onChange={this.handleFilterTextChange}
            />
      );
    }
  }

EmployeeRow.propTypes = {
    employee: PropTypes.object.isRequired,
    filterText: PropTypes.string
};


EmployeeTable.propTypes = {
    employeeData: PropTypes.array.isRequired,
    filterText: PropTypes.string
};
SearchBar.propTypes = {
   filterText: PropTypes.string,
   onFilterTextChange: PropTypes.func
};