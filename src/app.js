/*jslint es6*/
/*jshint node:true*/
"use strict";

const express = require('express');
const bodyParser = require('body-parser');
const process = require('process');

const app = express();


const port = 3000;
const host = '0.0.0.0';

const router = require('./routes/solving');
const {notFound, errorHandler, logErrors} = require('./routes/errorHandling');
const { Console } = require('console');
const { Server } = require('http');


app.use(router);
app.use(logErrors);
app.use(notFound);
app.use(errorHandler);

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

app.enable('trust proxy');

app.set('title', 'Pokersolver');
app.set('x-powered-by', false);

app.listen(port, () => console.log(`PokerSolver initiated. Running on http://${host}:${port}`));

// server.on('connection',function(socket){
//     socket.setTimeout(5*1000);
// });

// // Handle ^C
// process.on('SIGINT', shutdown);

// // To be able to stop with CTRL+C
// function shutdown(){
//     console.log('Graceful shutdown');
//     server.close(function(){
//         console.log('Closed pokersolver.');
//     });
// }



