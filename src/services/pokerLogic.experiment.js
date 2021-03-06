/*jslint es6*/
"use strict";
const express = require("express");

class Card {
    constructor(value, suit){
        this.value = value;
        this.suit = suit;
    }
}
class Hand {
    constructor(cards){
        this.cards=cards;

    }
}

function PokerHand(){
    Hand.call(this);

    this.straigh= false;
    this.flush=false;
}

/**
 * Check to see if the hand has a sequence
 * @param {Array} pokerHand
 * @returns boolean
 */
PokerHand.prototype.isStraight() = function() {
    PokerHand.sort(function(a,b){return a.value - b.value;});
    for(var i=0;i<4;i+=1){
        PokerHand[i].value+1 != PokerHand[i+1].value ? false : true;
    }
}


/**
 * Check to see if the hand is a flush
 * @param {Array} pokerHand
 * @returns boolean
 */
function isFlush(pokerHand) {
    for(var i=0;i<4;i+=1){
        pokerHand[i].suit != pokerHand[i+1].suit ? false : true
    }
}


/**
 * Check to how many of each hand card there is on hand.
 * @param {Array} pokerHand
 * @returns repeating
 */
function manyCheck(pokerHand) {
    // All cards that are repeating
    var repeating = [];

    pokerHand.sort(function(a,b){return a[0] - b[0];});

    // All cards without repeated ones
    var distinctCards = [...new Set(pokerHand.map(x => x.value))];

    // console.log("distintic: "+distinctCards.length);
    var quantityOfCards ;
    var object;
    for(var i=0;i<distinctCards.length;i+=1){
        quantityOfCards = pokerHand.filter(hand => hand.value === distinctCards[i]).length;
        if (quantityOfCards>=2){
            var tempRepeat = {value:distinctCards[i],repetitions:quantityOfCards}
            repeating.push(tempRepeat);
        }
    }
    if(repeating.length!=0){
        highestRepetition = Math.max.apply(Math,repeating.map(x => x.repetitions ));
        highestValue = Math.max.apply(Math,repeating.map(x => x.value ));
    }
    if(repeating.length==2){
        // var biggest=repeating.filter(x => x.repetitions==highestRepetition );
        // var smallest=repeating.filter(x => (x.repetitions!=highestRepetition)||0);
        // console.log("Repeating: "+repeating[0].repetitions);
        object = {quantity:repeating.length,highestRep:0,rep:{biggest:repeating[0],smallest:repeating[1]}};
        // if([...new Set(repeating.map(x => x.repetitions))].length >=2){
        //     object = {quantity:repeating.length,highestRep:0,rep:{biggest:repa,smallest:smallest.pop()}};
        // }
        // else{
        //     object = {quantity:repeating.length,rep:{biggest:biggest.pop(),smallest:smallest.pop()}};
        // }
    }
    else{
        if(repeating.length!=0){
            var biggest=repeating.filter(x => x.repetitions==highestRepetition);
        }
        else{
            var biggest = [{value:0,repetitions:0}];
        }
        object = {quantity:repeating.length,differentOnes:false,rep:{biggest:biggest.pop(),smallest:{value:0,repetitions:0}}};
    }
    // object = {quantity:repeating.length,highestRepetition:highestRepetition,rep:{biggest:,lowest:}repeating}
    return object;
}

/**
 *
 * Evaluate
 * @param {*} hand
 * @returns evaluation
 */
function evaluate(hand){
    console.log(hand);
    const highest = Math.max.apply(Math,hand.map(x => x.value ));
    const many = manyCheck(hand);
    // console.log("Many: "+ many.rep.smallest.repetitions);
    if (isStraight(hand)){
        if(isFlush(hand)){
            return {name:"SF",highest:highest};
            // Straight Flush
        }
        else{
            return {name:"S",highest:highest};
            // Straight
        }
    }
    else{
        // console.log("Not straight");
        if(many.quantity!=0){
            // console.log("Repeat");
            if(many.rep.biggest.repetitions==4){
                return {name:"4K",highest:highest};
                // Four of a kind
            }
            else{
                // console.log("Not 4k");
                // console.log("Highest Rep: "+many.rep.biggest.repetitions);
                if(many.rep.biggest.repetitions==3){
                    if(many.rep.smallest.repetitions!=0){
                        return {name:"FH",highest:highest};
                        // Full House
                    }
                    else{
                        return {name:"3K",highest:highest};
                        // Three of a kind
                    }
                }
                else{
                    // console.log("Biggest != 3");
                    if(many.rep.smallest.repetitions!=0){
                        return {name:"2P",highest:highest}
                        // Two Pairs
                    }
                    else{
                        return {name:"P",highest:highest}
                        // Pair
                    }
                }
            }
        }
        else{
            if(isFlush(hand)){
                return {name:"F",highest:highest}
                // Flush
            }
            else{
                return {name:"HC",highest:highest}
                // Highest Card
            }
        }
    }
}


// A hand is an array of 5 card objects
var hand = {cards: [{value:13,suit:"H"},
                    {value:11,suit:"S"},
                    {value:10,suit:"C"},
                    {value:6,suit:"H"},
                    {value:3,suit:"D"}]};

// console.log("Straight: " + isStraight(hand.cards));
// console.log("Flush: " + isFlush(hand.cards));
// console.log("Biggest: " + manyCheck(hand.cards).differentOnes);
console.log(evaluate(Hand.cards));

// modules.exports =

module.exports.evaluateHand = evaluate;