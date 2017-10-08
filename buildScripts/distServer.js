//Transpiling with babel
import express from 'express';
import path from 'path';
import open from 'open';
//import compression from 'compression';
/* eslint-disable no-console */

const port = 3001;
const app = express();

//app.use(compression());
app.use(express.static('dist'));
app.use(express.static(path.join(__dirname, '../src/public')));

//we'll tell it to serve static files in the dist directory in production
app.get('/', function(req, res){
    res.sendFile(path.join(__dirname, '../dist/index.html'));

});

app.listen(port, function(err){
    if (err){
        console.log(err);
    }
    else{
        open ('http://localhost:' + port);
    }
});


