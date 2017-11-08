import React from 'react';
import toastr from 'toastr';
import { TOASTR_OPTIONS } from '../../utils/toastr';
import * as API from '../../api/manualSearchEmployee';
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
       
        if(this.state.employeeData != null){
        this.state.employeeData.forEach((employee) => {
           
            let name = ParseName(employee.firstname, employee.middlename, employee.lastname, true);     
            //console.log(name);
            if (name.indexOf(filterText) === -1) {
              return;
            }
            rows.push(
                <EmployeeRow key={employee.id} employee={employee}/>
            );
        });}
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


class ManualSearchPage extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            firstName: '',
            middleName: '',
            lastName: '',
            dateOfBirth: ''
        };
        this.employee = 'test';
        toastr.options = TOASTR_OPTIONS;
        this.onSubmit = this.onSubmit.bind(this);
        this.onChange = this.onChange.bind(this);
    }
    
    onChange(event){
        this.setState({ [event.target.name]: event.target.value });
    }

    onSubmit(event){
        event.preventDefault();
        toastr.info('API not ready yet');
/*
        API.searchEmployeeDetails(JSON.stringify(this.state))
        .then( res => {
                this.employee = JSON.stringify(res);
                console.log("res: "+res);
            })
        .catch( error => toastr.error('Something went wrong'+ error));
        */
    }

    render(){
     
        return (
            <div id="productPage" className="jumbotron">
                <div className="container">
                    <div className="row">
                        <div className="col-sm-3"/>
                        <div className="col-sm-4">  
                            <form onSubmit={this.onSubmit}>
                                <div className="form-group">
                                    <input type="text" className="form-control" name="firstName" placeholder="First Name" onChange={this.onChange}/>
                                </div>
                                <div className="form-group">
                                    <input type="text" className="form-control" name="middleName" placeholder="Middle Name" onChange={this.onChange}/>
                                </div>
                                <div className="form-group">
                                    <input type="text" className="form-control" name="lastName" placeholder="Last Name" onChange={this.onChange}/>
                                </div>
                                <div className="form-group">
                                    <input type="text" className="form-control" name="dateOfBirth" placeholder="Date of Birth MM-DD-YYYY" onChange={this.onChange}/>
                                </div>
                                <div className="text-right">
                                    <button type="submit" className="btn btn-default" >Search</button>
                                </div>
                            </form>
                        </div>
                        <div className="col-sm-3"/>
                    </div>
                    <div className="row">
                        <br/>
                       
                        
                       
                    </div>
                </div>
            </div>
        );
    }
}

export default ManualSearchPage;