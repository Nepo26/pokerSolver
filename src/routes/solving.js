"use strict";
const express = require("express");
const router = express.Router();
const poker = require('../services/pokerLogic.js');
const util = require('util');

router.get('/', (req, res) => {
    var query = req.query;
    if (req.query.hand.length != 2) {
        return res.status(400).send('Need to send 2 cards');
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