import React from 'react';
import jsf from 'json-schema-faker';
import { schema } from './mockDataSchema';
import chalk from 'chalk';
import PropTypes from 'prop-types';
import json2csv from 'json2csv';
import moment from 'moment';
import FileSaver from 'file-saver';
import toastr from 'toastr';
import { TOASTR_OPTIONS } from '../../utils/toastr';
import faker from 'faker';

const shortDate = (csv) =>{
    let lines=csv.split("\n");
    let result = "";
    result += (lines[0] + "\r\n");    

    for(let i=1;i<lines.length;i++){
        let fields=lines[i].split(",");
        result += (fields[0] + "," + fields[1]+ "," +fields[2] + "," + moment(faker.date.between('1940-01-01', '2000-12-31')).format('YYYY-MM-DD') + "," + fields[4]);
        if(lines[i] != lines[lines.length-1])
            result += "\r\n";
    }
    //console.log(result);
    return (result);
};

class MockData extends React.Component {
    constructor(props){
        super(props);
    }
    render (){
    return (
        <div>
            {this.props.mockData}  
         
        </div>
    );}
}

class mockdataPage extends React.Component {
    constructor(props){
        super(props);
        
        this.fields = '';
        this.state = {
            mockData: '',
            min : '2',
        };
        toastr.options = TOASTR_OPTIONS;
        this.onSubmit = this.onSubmit.bind(this);
        this.onChangeValue = this.onChangeValue.bind(this);
    }
    onChangeValue(event){
        this.setState({ [event.target.name]: event.target.value });
    }

    onSubmit(event){
        event.preventDefault();
        try {
        let fields = ["firstname", "middlename", "lastname", "dateofbirth", "type"];
        let temp2 = json2csv({ data: jsf(schema(parseInt(this.state.min))).users, fields: fields });
        let temp3 = shortDate(temp2).replace(/['"]+/g, '');
        this.setState ({ mockData : temp3 });

        let blob = new Blob([temp3], {type: "text/csv;charset=utf-8"});
        FileSaver.saveAs(blob, "mockdata.csv");
        toastr.success('Successfully generated Mockdata');
        }
        catch (error) {
            toastr.error('Something went wrong'+ error);
        }
}

    render(){
        return (
            <div id="mockdatapage" className="jumbotron">
                <div className="container">
                    <div className="row">
                        <div className="col-sm-3"/>
                        <div className="col-sm-9 text-left">  
                            Generate mockdata in CSV format and import into the employee table.<br/><br/>
                        </div>
                    </div>
                    
                    <div className="row">
                        <div className="col-sm-3"/>
                        <div className="col-sm-9 text-left"> 
                            <form name="csvimport" className="form-inline" >
                                <label>Number of employees to generate: </label> 
                                <input type="text" name="min" placeholder="2" onChange={this.onChangeValue} size="10"/>
                                <button type="submit" className="btn btn-default" onClick={this.onSubmit}>Generate mockdata</button>
                            </form>  
                            <MockData mockData={this.state.mockData}/>
                        </div>
                    </div>
                </div>
                </div>
        );
    }
}

MockData.propTypes = {
    mockData: PropTypes.string.isRequired,
};

export default mockdataPage;