"use strict";
const express = require("express");

function notFound(req,res,next){
    res.status(404);

    if (req.accepts('json')){
        res.json({errors: [{message:'Resource not Found',code:404}]});
        return;
    }

    res.type('txt').send('Resource not Found');
}

function errorHandler(err, req, res, next){
    res.status(500);

    if (req.accepts('json')){
        res.json({errors: [{message:'Unhandled error, please report.',code:500}]});
        return;
    }

    res.type('txt');
    res.send('There was an unhandled error. Please report.');
}

function logErrors(err,req,res,next){
    console.error(err.stack);
    next(err);
}

module.exports.errorHandler = errorHandler;
module.exports.notFound = notFound;
module.exports.logErrors = logErrors;
