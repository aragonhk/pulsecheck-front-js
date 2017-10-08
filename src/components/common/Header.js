import React from 'react';
import {Link} from 'react-router-dom';

const logoImage = require("../../public/images/PulseCheck-logo-white.png"); // '<img src="' + require("../../public/images/PulseCheck-logo-white.png")+  '" width=160 height=34 />' ;

const Header =() => {
    return (
        <nav className="navbar navbar-default navbar-fixed-top">
            <div className="container-fluid">
                <div className="navbar-header">
                    <button type="button" className="navbar-toggle" data-toggle="collapse" data-target="#myNavbar">
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
                        <li><Link to="/" >HOME</Link> </li>
                        <li><Link to="/product" >PRODUCTS</Link> </li>
                        <li><Link to="/about" >ABOUT</Link> </li>
                        <li><Link to="/login" >LOGIN</Link> </li>
                    </ul>
                </div>
            </div>
        </nav>
     
    );
};

export default Header;