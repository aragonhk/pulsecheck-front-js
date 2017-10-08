import React from 'react';
import { Route, Redirect } from 'react-router';
const logoImage = require("../../public/images/recaptcha.jpg"); 

function Label (props){
    return <label className="col-sm-4 control-label">{props.name}</label>;
}

const loggedIn =(props)=>{
    <div>f</div>;
    //<label className="col-sm-4 control-label">is: {props.isAuth}</label>;
};

class LoginDialog extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            email: '',
            password: '',
            output: '',
            loggedIn: false
        };
        this.handleEmailChange = this.handleEmailChange.bind(this);
        this.handlePasswordChange = this.handlePasswordChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleEmailChange(event){
        this.setState ({ email: event.target.value});
    }
    handlePasswordChange(event){
        this.setState({password: event.target.value});
    }
    handleSubmit(event){
        console.log(this.state.email);
        console.log(this.state.password);
        event.preventDefault();  
        this.setState({output: <span className="label label-danger">Email and Password do not match</span>});
        this.setState({loggedIn: true});

    }

    render(){
        if(this.state.loggedIn){
            return (
                <Redirect to="/dashboard"/>
            );
        }

        return (
                <form name="search" className="form-horizontal" onSubmit={this.handleSubmit}>
                    <div className="form-group">
                        <Label name="Email"/>
                        <div className="col-sm-5">
                        <input type="text" className="form-control" value={this.state.email} onChange={this.handleEmailChange} size="15" placeholder="Email" id="email" name="email"/>    
                        {loggedIn}
                        </div>
                    </div>
                    <div className="form-group">
                        <Label name="Password"/>
                        <div className="col-sm-5">
                            <input type="password" className="form-control " value={this.state.password} onChange={this.handlePasswordChange} size="15" placeholder="Password" id="password" name="password"/>
                            <img src={logoImage} />
                        </div>
                    </div>
                    <div className="form-group">   
                        <Label name=""/>
                        <div className="col-sm-2"> 
                            <button type="submit" value="Login" className="btn btn btn-primary ">Login</button>  
                            
                        </div>
                        <div className="checkbox col-sm-3"> 
                        <input type="checkbox" className="text-left" /> Remember me
                        </div>
                    </div>
                    <div className="form-group">   
                        <Label name=""/>
                        <div className="col-sm-5">{this.state.output}
                        </div>
                    </div>
                </form>
                
        );
    }
}

class LoginPage extends React.Component {
    render(){
        return (
            <div className="jumbotron">
                <div className="container">
                    <div className="row">
                        <div className="col-sm-2"/>
                        <div className="col-sm-8">  
                            <h1 className="text-center">Login</h1>
                            <br/>

                            <LoginDialog />
                        </div>
                            
                        <div className="col-sm-2"/>
                    </div>
                </div>
            </div>
        );
    }
}

export default LoginPage;