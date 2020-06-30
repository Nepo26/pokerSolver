"use strict";
const express = require("express");
const router = express.Router();
const poker = require('../services/pokerLogic.js');
const util = require('util');

router.get('/', (req, res) => {
    if (JSON.stringify(req.query) == JSON.stringify({}) || req.query.length != 2 || req.query.length == undefined) {
        res.status(400);
        if (req.accepts('json')){
            res.json({errors: [{message:'Need to send 2 hands',code:1}]});
            return;
        }

        res.type('txt').send('Need to send 2 hands');
    }

    var pokerHand = [];
    pokerHand[0] = new poker.PokerHand(req.query.hand[0]);
    pokerHand[1] = new poker.PokerHand(req.query.hand[1]);

    var comparative = poker.comparePokerHands(pokerHand);
    if (comparative == undefined) {
        return res.status(500).send('Something is wrong down here...');
    }
    res.status(200);
    res.type
    res.type('application/json');
    return res.send(JSON.stringify(comparative));
});



module.exports = router;