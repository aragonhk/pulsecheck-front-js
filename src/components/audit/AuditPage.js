import React from 'react';
import toastr from 'toastr';
import { TOASTR_OPTIONS } from '../../utils/toastr';
import { withRouter } from 'react-router';

class AuditPage extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            monitor: false,
            exception: false,
            monthlyReport: false,
            quartelyReport: false,
            annualReport: false
        };
        this.onChange = this.onChange.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
        
        toastr.options = TOASTR_OPTIONS;
    }
    onChange(event){
        this.setState({ [event.target.name]: event.target.value });
        //alert([event.target.name]);
    }

    onSubmit(event){
        event.preventDefault();

        toastr.info('API not ready yet');
  
    }


    render(){
        return (
            <div id="auditPage" >
                <div className="container">
                <form name="audit" className="form-horizontal" onSubmit={this.onSubmit}>
                    <div className="row">
                        <p><b>Alerts</b></p>
                        <div >
                            <ul className="list-unstyled components">
                                <li>  <input type="checkbox" onChange={this.onChange} /> Monthly Monitor Completed </li>
                                <li>  <input type="checkbox" onChange={this.onChange} /> Consider Exception </li>
                            </ul>
                        </div>
                    </div>
                    <div className="row">
                        <p><b>Reports</b></p>
                        <div>
                            <ul className="list-unstyled components">
                                <li> <input type="checkbox" onChange={this.onChange} /> Monthly Report </li>
                                <li> <input type="checkbox" onChange={this.onChange} /> Quartely Report </li>
                                <li> <input type="checkbox" onChange={this.onChange} /> Annual Report </li>
                            </ul>
                        </div>
                    </div>
                    <div className="row text-left">
                        <button className="btn btn-default" type="submit">Update</button>
                    </div>
                </form>
                </div>
            </div>
        );
    }
}

export default AuditPage;