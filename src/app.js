/*jslint es6*/
/*jshint node:true*/
"use strict";

const express = require('express');
const bodyParser = require('body-parser');

const app = express();


const port = 3000;
const host = '0.0.0.0';

const router = require('./routes/solving');
const {notFound, errorHandler, logErrors} = require('./routes/errorHandling');


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

