import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { logout } from '../actions/authActions';

export default function(ComposedComponent) {
    class Authenticate extends React.Component {
        constructor(props){
            super(props);
        }

        componentWillMount() {
            let currentdate = new Date().toLocaleString();
            let expDate = new Date(1000*this.props.user["exp"]).toLocaleString();
           
            console.log("exp: "+ expDate );

            if(!this.props.isAuthenticated || ( currentdate > expDate )){
                this.props.logout();
                this.context.router.history.push('/login');
            }
        }

        componentWillUpdate(nextProps){
            if(!nextProps.isAuthenticated){
                this.context.router.history.push('/');
            }
        }

        render() {
            return (
                <ComposedComponent {...this.props} />
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