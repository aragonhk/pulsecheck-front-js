import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { logout } from '../../actions/authActions';
import PropTypes from 'prop-types';

const logoImage = require("../../public/images/PulseCheck-logo-white.png"); // '<img src="' + require("../../public/images/PulseCheck-logo-white.png")+  '" width=160 height=34 />' ;

class Header extends React.Component {
    constructor(props){
        super(props);
        this.logout = this.logout.bind(this);
    }

    logout(event){
        event.preventDefault();
        this.props.logout();
    }
   
    render(){
        let links;
        //const { isAuthenticated } = this.props.auth;
        if( this.props.isAuthenticated ){
            links = (
                <li className="dropdown">
                    <a className="dropdown-toggle" data-toggle="dropdown" href="#">ME
                    <span className="caret" /></a>
                    <ul className="dropdown-menu">
                        <li><Link to="/user/dashboard" replace>Dashboard</Link></li>
                        <li><Link to="/user/settings" replace>Settings</Link></li>
                        <li><a href="#" onClick={this.logout}>Logout</a> </li>
                    </ul>
                </li>
            );
        }
        else{
            links = (
                <li><Link to="/login" replace>LOGIN</Link> </li>
            );
        }
        return (
            <nav className="navbar navbar-default navbar-fixed-top">
                <div className="container-fluid">
                    <div className="navbar-header">
                        <button type="button" className="navbar-toggle" data-toggle="collapse" data-target="#myNavbar">
                            <span className="icon-bar"/>
                            <span className="icon-bar"/>
                            <span className="icon-bar"/> 
                            <span className="icon-bar"/> 
                        </button>
                        <a className="navbar-brand logon" href="#">
                            <img src={logoImage} width="160" height="34"/>
                        </a>
                    </div>
                    <div className="collapse navbar-collapse" id="myNavbar">
                        <ul className="nav navbar-nav navbar-right">
                            <li><Link to="/" replace>HOME</Link> </li>
                            <li><Link to="/product" replace>PRODUCTS</Link> </li>
                            <li><Link to="/about" replace>ABOUT</Link> </li>
                            { links }
                        </ul>
                    </div>
                </div>
            </nav>
        );
    }
}

Header.propTypes = {
    logout: PropTypes.func.isRequired,
    isAuthenticated: PropTypes.bool.isRequired
};

function mapStateToProps(state){
    return {
        isAuthenticated: state.auth.isAuthenticated
    };
}

export default connect(mapStateToProps, {logout})(Header);