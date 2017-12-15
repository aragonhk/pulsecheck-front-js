import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as employeeActions from '../../actions/employeeActions';
import PropTypes from 'prop-types';
import toastr from 'toastr';
import { TOASTR_OPTIONS } from '../../utils/toastr';
import ConcatName from '../../utils/concatName';
import Moment from 'moment';
import MomentLocalizer from 'react-widgets-moment'; 
import simpleNumberLocalizer from 'react-widgets-simple-number';
import DateTimePicker from 'react-widgets/lib/DateTimePicker';
import { Button, FormGroup, ControlLabel, FormControl, HelpBlock } from 'react-bootstrap';
import validateInput from '../../utils/ValidateInput';
import { isUndefined, isEmpty } from 'lodash';
import { withRouter } from 'react-router';

class EmployeeRow extends React.Component {
    constructor(props){
        super(props);
        this.handleOnClick = this.handleOnClick.bind(this);
    }

    handleOnClick(event){
        this.props.changeTab(5);
    }

    render (){
        return (
            <tr id={this.props.employeeData} onClick={this.handleOnClick}>
                <td id={this.props.employeeData}>{ConcatName(this.props.employeeData.firstname, this.props.employeeData.middlename, this.props.employeeData.lastname, false)}</td>
                <td id={this.props.employeeData}>{Moment(this.props.employeeData.dateofbirth).format('MM-DD-YYYY')}</td>
                <td id={this.props.employeeData}>{this.props.employeeData.consider ? "Yes" : "No"}</td>
            </tr>
        );
    }
}
EmployeeRow.propTypes = {
    employeeData: PropTypes.object.isRequired,
    changeTab: PropTypes.func
};

class EmployeeTable extends React.Component {
    constructor(props){
        super(props);
        this.changeTab = this.changeTab.bind(this);
    }

    changeTab(val1){
        this.props.changeTab(val1);
    }

    render() {
        const rows =[];

        if (!isUndefined(this.props.employeeData)) {
                rows.push(
                    <EmployeeRow key={this.props.employeeData.id} 
                                employeeData={this.props.employeeData} 
                                changeTab={this.changeTab}/>
                );
            
            return (
                    <div>
                        <table className="table table-hover">
                            <thead>
                                <tr>
                                    <th>Name</th>
                                    <th>Date of Birth</th>
                                    <th>Consider</th>
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
    id: PropTypes.number,
    filterText: PropTypes.string,
    employeeData: PropTypes.object,
    changeTab: PropTypes.func
};

class ManualSearchPage extends React.Component {
    constructor(props){
        super(props);
        Moment.locale('en');
        MomentLocalizer();
        simpleNumberLocalizer();
      
        this.state = {
            inputFirstName: '',
            inputMiddleName: '',
            inputLastName: '',
            inputSelectedDOB: '',
            view: 'decade',
            errors: {}
        };
    
        toastr.options = TOASTR_OPTIONS;
        this.onSubmit = this.onSubmit.bind(this);
        this.onViewChange = this.onViewChange.bind(this);
        this.onHandleChangeDob = this.onHandleChangeDob.bind(this);
        this.handleTextInputChange = this.handleTextInputChange.bind(this);
        this.changeTab = this.changeTab.bind(this);
    }

    handleTextInputChange(event){
        this.setState({ [event.target.name]: event.target.value });
    }

    onViewChange(view){
        this.setState({ view });
    }

    onHandleChangeDob(dob) {
        if(Moment(dob).isValid()){
            this.setState({ 
                inputSelectedDOB: dob,
             });
        }
    }

    changeTab(val1, val2){
        this.props.changeTab(val1, val2);
    }

    isValid() {
        let results = validateInput(this.state);

        if(!results.isValid) 
            this.setState({ errors: results.errors });
        else
            this.setState({ errors: {} });
       
        return results.isValid;
    }

    onSubmit(event){
        event.preventDefault();
        if(this.isValid()){
            this.setState({ errors: {} });

            this.props.actions.loadEmployee(this.state.inputFirstName, this.state.inputMiddleName, this.state.inputLastName, Moment(this.state.inputSelectedDOB).format('YYYY-MM-DD') ) 
                .then( res => { 
                    toastr.success('success');
                    //console.log("manual search, this.props: "+ JSON.stringify(this.props.employee));
                })
                .catch(error => { toastr.error('Error getting data'); });
        }
    }

    render(){
        const { errors } = this.state;
     
        return (
            <div id="manualsearchpage" className="jumbotron">
                <div className="container">
                    <div className="row center-block">
                        <div className="col-sm-3"/>
                        <div className="col-sm-4">  
                            <form onSubmit={this.onSubmit}>
                                <div className="form-group">
                                    <FormGroup controlId="inputFirstName" validationState={isUndefined(errors.inputFirstName)? null : 'error'}>
                                        <FormControl 
                                            type="text" 
                                            name="inputFirstName" 
                                            onChange={this.handleTextInputChange} 
                                            placeholder="First Name"
                                        />
                                    </FormGroup>
                                    {errors.inputFirstName && <HelpBlock id="inputTitleHelpBlock" className="formerror">{errors.inputFirstName}</HelpBlock>}
                                </div>
                                <div className="form-group">
                                    <FormGroup controlId="inputMiddleName" validationState={isUndefined(errors.inputMiddleName)? null : 'error'}>
                                        <FormControl 
                                            type="text" 
                                            name="inputMiddleName" 
                                            onChange={this.handleTextInputChange} 
                                            placeholder="Middle Name"
                                        />
                                    </FormGroup>
                                </div>
                                <div className="form-group">
                                    <FormGroup controlId="inputLastName" validationState={isUndefined(errors.inputLastName)? null : 'error'}>
                                        <FormControl 
                                            type="text" 
                                            name="inputLastName" 
                                            onChange={this.handleTextInputChange} 
                                            placeholder="Last Name"
                                        />
                                    </FormGroup>
                                    {errors.inputLastName && <HelpBlock id="inputTitleHelpBlock" className="formerror">{errors.inputLastName}</HelpBlock>}
                                </div>
                                <div className="form-group">
                                <DateTimePicker
                                    format="DD MMM YYYY"
                                    name="dateofbirth"
                                    placeholder="Date of Birth"
                                    max={new Date()}
                                    time={false}
                                    onChange={this.onHandleChangeDob}
                                    view={this.state.view}
                                    onViewChange={this.onViewChange}
                                />
                                {errors.dobMessage && <HelpBlock id="inputTitleHelpBlock" className="formerror">{errors.dobMessage}</HelpBlock>}
                                </div>
                                <div className="text-right">
                                    <div className="form-group">
                                        <Button type="submit" bsStyle="default">Search</Button> 
                                    </div>
                                </div>
                            </form>
                        </div>
                        <div className="col-sm-3"/>
                    </div>
                    <div className="row">
                        <div className="col-sm-2"/>
                        <div className="col-sm-8">  
                            <div className="form-group">
                            { isEmpty(this.props.employee) ? <div /> : <EmployeeTable employeeData={this.props.employee} changeTab={this.changeTab} />}
                            </div>
                        </div>
                        <div className="col-sm-2"/>
                    </div>
                   
                </div>
            </div>
        );
    }
}

ManualSearchPage.propTypes = {
    changeTab: PropTypes.func,
    employee: PropTypes.oneOfType([ PropTypes.object, PropTypes.array]),
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

export default connect(mapStateToProps, mapDispatchToProps)(ManualSearchPage);