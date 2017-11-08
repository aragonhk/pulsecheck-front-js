import React from 'react';
import toastr from 'toastr';
import { TOASTR_OPTIONS } from '../../utils/toastr';
import ReactFileReader from 'react-file-reader';
import * as API from '../../api/apiCVSImport';

const csvJSON =(csv) =>{
    let lines=csv.split("\n");
    let result = [];
    let headers=lines[0].replace(/(\r\n|\n|\r)/gm,"").split(",");

    for(let i=1;i<lines.length;i++){
        let obj = {};
        let currentline=lines[i].split(",");

        for(let j=0;j<headers.length;j++){
            if(headers[j] != 'type')
                obj[headers[j]] = currentline[j].replace(/(\r\n|\n|\r)/gm,"");
            else
                obj[headers[j]] = parseInt(currentline[j].replace(/(\r\n|\n|\r)/gm,""));
        }
        result.push(obj);
    }
    return JSON.stringify(result); 
};

class CSVImportPage extends React.Component {
    constructor(props)
    {
        super(props);
        this.state = {
            fileName: '', 
            disableUpload: true };
        this.data = null;

        toastr.options = TOASTR_OPTIONS;
        this.handleFiles = this.handleFiles.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
        this.resetForm = this.resetForm.bind(this);
        this.getData = this.getData.bind(this);
    }

    resetForm() {
        this.data = null;
        this.setState ({ 
            fileName: '', 
            disableUpload: true });
    }

    getData(){
        console.log(this.state.fileName);
        console.log(this.data);
        console.log(this.state.disableUpload);
    }

    handleFiles(files){
        if( files.length > 0 ) {
            let reader = new FileReader();
            let jsonData;

            reader.onload = (event) => {
                this.data = csvJSON(event.target.result);
                this.setState ({ 
                    fileName: files[0].name, 
                    disableUpload: false });
            };
            reader.onerror = function(event) {
                toastr.error('File could not be read '+ event.target.error.code );
            };
            reader.readAsText(files[0]);
        }
        else {
            this.resetForm();
        }
    }

    onSubmit(event){
        event.preventDefault();
        //console.log("JSON: " + this.data);
        
        API.importCSV(this.data)
            .then( res => toastr.success('Successfully importing data'))
            .catch( error => toastr.error('Error importing data'));
        this.resetForm();
    }
    
    render() {
        return (
            <div id="productPage" className="jumbotron">
                <div className="container">
                    <div className="row">
                        <div className="col-sm-3"/>
                        <div className="col-sm-6">  
                            Select a csv file to import.<br/><br/>
                        </div>
                        <div className="col-sm-3"/>
                    </div>
                    <div className="row">
                        <div className="col-sm-3"/>
                        <div className="col-sm-6">  
                            <form name="csvimport" className="form-inline" >
                                <div className="form-group">
                                    <input type="text" className="form-control" id="" placeholder={this.state.fileName} disabled/>
                                </div>
                                <div className="form-group">
                                    <ReactFileReader handleFiles={this.handleFiles} fileTypes={'.csv'} multipleFiles={false} base64={false}>
                                        <button className="btn btn-default">Browse</button>
                                    </ReactFileReader>
                                </div>
                                
                                <button type="submit" className="btn btn-default" onClick={this.onSubmit} disabled={this.state.disableUpload} >Import</button>
                            
                            </form>
                        </div>
                        <div className="col-sm-3"/>
                    </div>
                </div>
            </div>
        );
    }
}

export default CSVImportPage;				