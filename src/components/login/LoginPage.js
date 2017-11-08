import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as loginActions from '../../actions/authActions'; 
import PropTypes from 'prop-types';
import validateInput from './validations';
import toastr from 'toastr';
import { TOASTR_OPTIONS } from '../../utils/toastr';
const logoImage = require("../../public/images/recaptcha.jpg"); 

const TextFieldGroup = (props) => {
    let classname = props.errors ? "col-sm-5 has-error" : "col-sm-5";

    return (
        <div className={classname}>
            <input 
                name={props.name}
                type={props.type}
                value={props.value} 
                placeholder={props.placeholder}
                className="form-control" 
                size="15" 
                onChange={props.onChange}
            />    
            <span className="help-block">{props.errors}</span>
        </div>
    );
};

const Label = (props) => {
    return <label className="col-sm-4 control-label">{props.name}</label>;
};

class LoginPage extends Component {
    constructor(props){
        super(props);
        this.state = {
            email: '',
            password: '',
            errors: '',
            isLoading: false
        };
        toastr.options = TOASTR_OPTIONS;
        this.onChange = this.onChange.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
    }

    onChange(event){
        this.setState({ [event.target.name]: event.target.value });
    }

    isValid(){
        const {errors, isValid } = validateInput(this.state);

        if (!isValid) {
            this.setState({ errors: errors });
        }
        return isValid;
    }

    onSubmit(event){
        event.preventDefault();
        if (this.isValid()) {
            this.setState( { errors: '', isLoading: true });
            this.props.actions.loginAxios(this.state)
                .then( res => {
                    this.context.router.history.push('/user/dashboard');}
                    //(error) => { this.setState({ errors: 'Invalid login credentials'  , isLoading: false });
                    //console.log("error.response.data: " + error.response.data.statuscode);
                    //console.log("ERRstatustext: " + JSON.stringify(error.response.data));
                )
                .catch( error => {
                    toastr.error('Invalid credentials');
                    this.setState({ isLoading: false});
                    }
                );
        }
    }

    render(){
        return(
        <div id="loginPage" className="jumbotron">
            <div className="container">
                <div className="row">
                    <div className="col-sm-2"/>
                    <div className="col-sm-8">  
                        <h1 className="text-center">Login</h1>
                        <br/>
                        <form name="search" className="form-horizontal" onSubmit={this.onSubmit}>

                            <div className="form-group">
                                <Label name="Email"/> 
                                <TextFieldGroup
                                    name="email"
                                    type="text"
                                    placeholder="Email"
                                    value={this.state.email}
                                    errors={this.state.errors.email}
                                    onChange={this.onChange}
                                />
                            </div>
                            <div className="form-group">
                                <Label name="Password"/>
                                <TextFieldGroup
                                    name="password"
                                    type="password"
                                    placeholder="Password"
                                    value={this.state.Password}
                                    errors={this.state.errors.password}
                                    onChange={this.onChange}
                                />
                                
                            </div>
                            <div className="form-group text-center">   
                                <img src={logoImage} />
                            </div>
                            <div className="form-group">   
                                <Label name=""/>
                                <div className="col-sm-2"> 
                                    <button type="submit" value="Login" className="btn btn btn-primary" disabled={this.state.isLoading}>Login</button>  
                                </div>
                                <div className="checkbox col-sm-3"> 
                                    <input type="checkbox" className="text-left" /> Remember me
                                </div>
                            </div>
                            <div className="form-group"> 
                                <div className="col-sm-2"/>
                                <div className="col-sm-7">
                                    { this.state.errors && <div className="alert alert-danger text-center">{this.state.errors}</div> }
                                </div>
                            </div>
                        </form>

                    </div>
                        <div className="col-sm-2"/>
                    </div>
                </div>
            </div>
        );
    }
}


Label.propTypes = {
    name: PropTypes.string
};

TextFieldGroup.propTypes = {
    name: PropTypes.string.isRequired,
    type: PropTypes.string.isRequired,
    value: PropTypes.string,
    placeholder: PropTypes.string.isRequired,
    onChange: PropTypes.func.isRequired,
    errors: PropTypes.string
};

LoginPage.propTypes = {
    actions: PropTypes.object.isRequired
};

LoginPage.contextTypes = {
    router: PropTypes.object.isRequired
};

function mapDispatchToProps(dispatch){
    return {
        actions: bindActionCreators(loginActions, dispatch)
    };
}

export default connect(null, mapDispatchToProps ) (LoginPage);