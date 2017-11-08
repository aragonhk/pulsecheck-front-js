import React from 'react';
import {Link} from 'react-router-dom';
import axios from 'axios';
import PropTypes from 'prop-types';

function Label (props){
    return <label className="col-sm-4 control-label">{props.name}</label>;
}
class SearchForm extends React.Component{
    constructor(props) {
        super(props);
        this.handleLastNameInputChange = this.handleLastNameInputChange.bind(this);
        this.handleFirstNameInputChange = this.handleFirstNameInputChange.bind(this);
        this.handleDobInputChange = this.handleDobInputChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.state = {
            resultsAvailable: false,
            results: []
       };
      }

    handleLastNameInputChange(event){
        this.props.onLastNameInput(event.target.value);
    }

    handleFirstNameInputChange(event){
        this.props.onFirstNameInput(event.target.value);
    }
    handleDobInputChange(event){
        this.props.onDobInput(event.target.value);
    }
    handleSubmit(event) {
       // alert(this.props.lastName.toUpperCase() +" "+this.props.firstName.toUpperCase());
        this.searchEmployee();
        event.preventDefault();    
    }

     searchEmployee() {
        
       axios.get('https://pulsecheck-back-go.herokuapp.com/search', {
        headers: {
            'Accept': 'application/json'
          },
          params: {
            lastname: this.props.lastName.toUpperCase(),
            firstname: this.props.firstName.toUpperCase()
        }
        })
        .then((response) => { 
           this.setState({ results: response.data, resultsAvailable: true });
          // console.log(this.state.results);
        })
        .catch(function (error) {
          alert(error);
        });
    }
    
    render() {
        return (
            <div className="container">
                <div className="row">
                <div className="col-sm-2"/>
                <div className="col-sm-8">  
                    <br/>
                    <form name="search" className="form-horizontal" onSubmit={this.handleSubmit}>
                        <div className="form-group">
                            <Label name="Last Name"/>
                            <div className="col-sm-5">
                            <input type="text" className="form-control" value={this.props.lastName} onChange={this.handleLastNameInputChange} size="15" placeholder="Last Name" id="last_name" name="lastName"/>    
                            </div>
                        </div>
                        <div className="form-group">
                            <Label name="First Name"/>
                            <div className="col-sm-5">
                                <input type="text" className="form-control" value={this.props.firstName} onChange={this.handleFirstNameInputChange} size="15" placeholder="First Name" id="first_name" name="firstName"/>
                            </div>
                        </div>
                        <div className="form-group">   
                            <Label name="Date of Birth"/>
                            <div className="col-sm-5"> 
                                <input type="text" className="form-control" value={this.props.dob} onChange={this.handleDobInputChange} size="15" placeholder="yyyy-mm-dd" id="date_of_birth" name="dateOfBirth"/> 
                            </div>
                        </div>
                        <div className="form-group">   
                            <Label name=""/>
                            <div className="col-sm-5"> 
                                <button type="submit" value="Search" className="btn btn btn-primary" disabled>Search</button>
                            </div>
                        </div>
                    </form>
                </div>
                <div className="col-sm-2"/>
            </div>
            <div>
            <SearchResultsTable
                results = {this.state.results}
                resultsAvailable = {this.state.resultsAvailable}
            />
            </div>
        </div>
        );
    }

}
class EmployeeRow extends React.Component{
    render() {
        return (
            <tr>
                <td><button type="button" className="btn btn-danger btn-sm" > Review </button> </td>
                <td>{this.props.employee["LASTNAME"]}</td>
                <td>{this.props.employee["MIDNAME"]}</td>
                <td>{this.props.employee["FIRSTNAME"]}</td>
                <td>{this.props.employee["DOB"]}</td>
                <td>OIG</td>
            </tr>
        );
      }
}
class SearchResultsTable extends React.Component{
    render () {
        let displayResults = null;
        let rows = [];
        const display = this.props.resultsAvailable;
        if(display) {
            this.props.results["oig"].forEach((employee, index) => {
                rows.push(<EmployeeRow employee={employee} key={index} />);
              });

            displayResults = (<div className="row">
            <div className="col-sm-2"/>
            <div className="col-sm-8">
                <table className="table">
                    <thead>  
                        <tr>
                            <th> Status </th>     
                            <th> First Name</th>
                            <th> Middle Name</th>
                            <th> Last Name</th>
                            <th> Date of Birth</th>
                            <th> Source  </th>
                        </tr>
                    </thead>
                    <tbody>
                               {rows}
                    </tbody>
                </table>
            </div>
        </div>);
        }
        return (
            <div>
                {displayResults}
            </div>
        );
    }
}

class IntegrationPage extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            firstName: '', 
            lastName: '',
            dob: ''
       };
       this.handleFirstNameInput = this.handleFirstNameInput.bind(this);
       this.handleLastNameInput = this.handleLastNameInput.bind(this);
       this.handleDOBInput = this.handleDOBInput.bind(this);
    }

    handleFirstNameInput(firstName){
        this.setState({
            firstName: firstName
        });
    }
    handleLastNameInput(lastName){
        this.setState({
            lastName: lastName
        });
    }
    handleDOBInput(dob){
        this.setState({
            dob: dob
        });
    }

    render() {
        return(
            <div id="integrationPage" className="jumbotron text-center">
                <SearchForm
                    lastName = {this.state.lastName}
                    firstName = {this.state.firstName}
                    dob = {this.state.dob}
                    results = {this.state.results}
                    onLastNameInput={this.handleLastNameInput}
                    onFirstNameInput={this.handleFirstNameInput}
                    onDobInput={this.handleDOBInput}
                />
            </div>
        );
    }
}

IntegrationPage.propTypes = {
    lastName: PropTypes.string,
    firstName: PropTypes.string,
    dob: PropTypes.string
};

EmployeeRow.propTypes = {
    employee: PropTypes.array.isRequired
};

export default IntegrationPage;