/*jslint es6*/
/*jshint node:true*/
"use strict";

const express = require('express');
const bodyParser = require('body-parser');

const app = express();

const port = 3000;
const router = require('./routes/solving');

app.use(router);
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.set('title', 'Pokersolver');
app.set('x-powered-by', false);

app.listen(port, () => console.log(`Listening at http://localhost:${port}`));

