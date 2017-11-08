import React from 'react';
import toastr from 'toastr';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import PropTypes from 'prop-types';
import * as userSettingsActions from '../../actions/settingsActions'; 
import { TOASTR_OPTIONS } from '../../utils/toastr';

const UserProfile = ({userSettings}) => {
    return (
           <div>
               <div className="row">
                    <div className="col-md-4"/>
                    <div className="col-md-2"><strong>User Profile</strong><br/><br/></div>
                    <div className="col-md-5"/>
                </div>
               <div className="row">
                    <div className="col-md-3"/>
                    <div className="col-md-2">First name:</div>
                    <div className="col-md-6">{userSettings.firstname}</div>
                </div>
                <div className="row">
                <div className="col-md-3"/>
                    <div className="col-md-2">Middle name:</div>
                    <div className="col-md-6">{userSettings.middlename}</div>
                </div>
                <div className="row">
                <div className="col-md-3"/>
                    <div className="col-md-2">Last name:</div>
                    <div className="col-md-6">{userSettings.lastname}</div>
                </div>
                <div className="row">
                <div className="col-md-3"/>
                    <div className="col-md-2">Email:</div>
                    <div className="col-md-6">{userSettings.email}</div>
                </div>
                 
            </div>
    );
};

class UserSettingsPage extends React.Component {
    constructor(props){
        super(props);
       
        toastr.options = TOASTR_OPTIONS;
    }
    
    componentDidMount(){
        this.props.actions.loadUserSettings()
        .then( res => {})
        .catch(error => { toastr.error('Error getting data'); });
    }

    render(){
        return (
            <div id="settingsPage" >
                <div className="container">
                    <div className="row">
                        <div >
                            <UserProfile userSettings={this.props.userSettings}/>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

UserProfile.propTypes = {
    userSettings: PropTypes.oneOfType([
        PropTypes.array,
        PropTypes.object]),
};

UserSettingsPage.propTypes = {
    userSettings: PropTypes.oneOfType([
        PropTypes.array,
        PropTypes.object]),
    actions: PropTypes.object.isRequired
};

function mapStateToProps (state, ownProps){
    return {
        userSettings: state.userSettings
    };
}

function mapDispatchToProps(dispatch){
    return {
        actions: bindActionCreators(userSettingsActions, dispatch)
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(UserSettingsPage);