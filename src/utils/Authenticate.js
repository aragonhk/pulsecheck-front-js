import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { logout } from '../actions/authActions';

export default function(ComposedComponent) {
    class Authenticate extends React.Component {
        constructor(props){
            super(props);
            this.isAuthenticated = false;
        }

        componentWillMount() {
            let currentdate = new Date().toLocaleString();
            let expDate = new Date(1000*this.props.user["exp"]).toLocaleString();
           
            console.log("exp: "+ expDate );
            console.log("currentdate: "+ currentdate);
            console.log("date > exp: ");
            console.log(Date.parse(currentdate) > Date.parse(expDate));
            //console.log(this.props);

            if(!this.props.isAuthenticated || Date.parse(currentdate) > Date.parse(expDate) ){
                this.isAuthenticated = false;
                this.props.logout();
                this.context.router.history.push('/login');
            }
            else 
                this.isAuthenticated = true;
          
        }

        componentWillUpdate(nextProps){
            if(!nextProps.isAuthenticated){
                this.context.router.history.push('/');
            }
        }

        render() {
            if(this.isAuthenticated){
                return (
                    <ComposedComponent {...this.props} />
                );
            }
            else
                return (
                    <div/>
                );
        }
    }

    Authenticate.propTypes = {
        logout: PropTypes.func.isRequired,
        isAuthenticated: PropTypes.bool.isRequired,
        user: PropTypes.object
    };
    
    Authenticate.contextTypes = {
        router: PropTypes.object.isRequired
    };

    function mapStateToProps(state){
        return {
            isAuthenticated: state.auth.isAuthenticated,
            user: state.auth.user
        };
    }
    return connect(mapStateToProps, {logout})(Authenticate);
}