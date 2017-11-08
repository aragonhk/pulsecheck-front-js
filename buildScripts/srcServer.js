import express from 'express';
import webpack from 'webpack';
import path from 'path';
import open from 'open';
import config from '../webpack.config.dev';
import api from './api/api';
//import events from './auth/events';
/*eslint-disable no-console */

const port = 8080;
const app = express();
const compiler = webpack(config);

app.use(express.static(path.join(__dirname, '../src/public')));

app.use(require('webpack-dev-middleware')(compiler,{
    noInfo: true,
    publicPath: config.output.publicPath
}));

app.use(require('webpack-hot-middleware')(compiler));

app.use('/api', api);
//app.use('/api/events', events);


//* any requests end up returing below file
app.get('/', function(req, res){
    res.sendFile(path.join(__dirname, '../src/index.html'));
});

app.listen(port, function(err){
    if (err){
        console.log(err);
    }
    else {
        open('http://localhost:' + port);
    }
});