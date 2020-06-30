/*jslint es6*/
/*jshint node:true*/
"use strict";

const express = require('express');
// const pokerLogic = require('pokerLogic');
const app = express();
const port = 3000;
const router = require('./api/solving.js');
app.use(router);

app.listen(port, () => console.log(`Example app listening at http://localhost:${port}`));

