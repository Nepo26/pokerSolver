"use strict";
const express = require("express");
const router = express.Router();
const poker = require('../services/pokerLogic.js');

router.get('/', (req, res) => {
    console.log("Test");
    var query = req.query;
    res.json(poker.evaluateHand(query.cards));
    res.end;
});






module.exports = router;