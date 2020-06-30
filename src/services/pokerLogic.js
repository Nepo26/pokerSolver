/*jslint es6*/
"use strict";
const express = require("express");


class FinalResult {
    /**
     *Creates an instance of FinalResult.
     * @param {Integer} winner Who won the hand dispute.
     * @param {handEvaluation} evaluation
     * @memberof FinalResult
     */
    constructor(winner, evaluation) {
        this.winner = winner;
        this.evaluation = evaluation;
    }
}

class PokerHand {
    /**
     *Creates an instance of PokerHand.
     * @param {*} hand
     * @memberof PokerHand
     */
    constructor(hand) {
        var pokerHand = [];
        hand = hand
            .replace(/J/gi, "11")
            .replace(/Q/gi, "12")
            .replace(/K/gi, "13")
            .replace(/A/gi, "1")
            .split(",");

        hand.forEach((element) => {
            var suit = element.slice(-1);
            var value = element.substring(0, element.length - 1);

            var card = new Card(value, suit);
            pokerHand.push(card);
        });

        this.hand = pokerHand;
    }
}

class Card {
    /**
     *Creates an instance of Card.
     * @param {*} value
     * @param {*} suit
     * @memberof Card
     */
    constructor(value, suit) {
        this.value = value;
        this.suit = suit;
    }
}

class handEvaluation {
    /**
     *Creates an instance of handEvaluation.
     * @param {*} name
     * @param {*} points
     * @param {Card[5]} cards
     * @memberof handEvaluation
     */
    constructor(name, points, cards) {
        this.name = name;
        this.points = points;
        this.cards = cards;
    }
}



/**
 * Check to see if the hand has a sequence
 * @param {PokerHand.hand} pokerHand
 * @returns boolean
 */
function isStraight(pokerHand) {
    pokerHand.sort(function (a, b) {
        return a.value - b.value;
    });
    var straight;

    for (var i = 0; i < 4; i += 1) {
        pokerHand[i].value + 1 != pokerHand[i + 1].value
            ? (straight = false)
            : (straight = true);
    }

    if (
        ["1", "10", "11", "12", "13"].every((currentValue) =>
            pokerHand.map((x) => x.value).includes(currentValue)
        )
    ) {
        straight = true;
    }

    return straight;
}

/**
 * Check to see if the hand is a flush
 * @param {PokerHand.hand} pokerHand
 * @returns boolean
 */
function isFlush(pokerHand) {
    var flush;
    for (var i = 0; i < 4; i += 1) {
        pokerHand[i].suit != pokerHand[i + 1].suit
            ? (flush = false)
            : (flush = true);
    }
    return flush;
}

/**
 * Check how many of each hand card there are
 * @param {PokerHand.hand} pokerHand
 * @returns repeating
 */
function manyCheck(pokerHand) {
    // All cards that are repeating
    var repeating = [];

    pokerHand.sort(function (a, b) {
        return a[0] - b[0];
    });

    // All cards without repeated ones
    var distinctCards = [...new Set(pokerHand.map((x) => x.value))];

    var quantityOfCards;
    var object;
    for (var i = 0; i < distinctCards.length; i += 1) {
        quantityOfCards = pokerHand.filter(
            (hand) => hand.value === distinctCards[i]
        ).length;
        if (quantityOfCards >= 2) {
            var tempRepeat = {
                value: distinctCards[i],
                repetitions: quantityOfCards,
            };
            repeating.push(tempRepeat);
        }
    }
    if (repeating.length != 0) {
        var highestRepetition = Math.max.apply(
            Math,
            repeating.map((x) => x.repetitions)
        );
        var highestValue = Math.max.apply(
            Math,
            repeating.map((x) => x.value)
        );
    }
    if (repeating.length == 2) {
        object = {
            quantity: repeating.length,
            highestRep: 0,
            rep: { biggest: repeating[0], smallest: repeating[1] },
        };
    } else {
        if (repeating.length != 0) {
            var biggest = repeating.filter((x) => x.repetitions == highestRepetition);
        } else {
            var biggest = [{ value: 0, repetitions: 0 }];
        }
        object = {
            quantity: repeating.length,
            differentOnes: false,
            rep: { biggest: biggest.pop(), smallest: { value: 0, repetitions: 0 } },
        };
    }
    return object;
}

/**
 *
 * Evaluate
 * @param {PokerHand} pokerHand
 * @returns evaluation
 */
function evaluate(pokerHand) {
    const cards = pokerHand.hand.sort(function (a, b) {
        return a.value - b.value;
    });
    const many = manyCheck(pokerHand.hand);
    if (isStraight(pokerHand.hand)) {
        if (isFlush(pokerHand.hand)) {
            return new handEvaluation("SF", 8, cards);
            // Straight Flush
        } else {
            return new handEvaluation("S", 4, cards);
            // Straight
        }
    } else {
        if (many.quantity != 0) {
            if (many.rep.biggest.repetitions == 4) {
                return new handEvaluation("4K", 7, cards);
                // Four of a kind
            } else {
                if (many.rep.biggest.repetitions == 3) {
                    if (many.rep.smallest.repetitions != 0) {
                        return new handEvaluation("FH", 6, cards);
                        // Full House
                    } else {
                        return new handEvaluation("3K", 3, cards);
                        // Three of a kind
                    }
                } else {
                    if (many.rep.smallest.repetitions != 0) {
                        return new ("2P", 2, cards);
                        // Two Pairs
                    } else {
                        return new handEvaluation("P", 1, cards);
                        // Pair
                    }
                }
            }
        } else {
            if (isFlush(pokerHand)) {
                return new handEvaluation("F", 5, cards);
                // Flush
            } else {
                return new handEvaluation("HC", 0, cards);
                // Highest Card
            }
        }
    }
}

/**
 * Compare 2 hands
 *
 * @param {PokerHand} pokerHand[]
 * @returns FinalResult
 */
function comparePokerHands(pokerHand) {
    if (pokerHand.length != 2) {
        return new FinalResult("none", "none");
    }

    var result = [];
    result[0] = evaluate(pokerHand[0]);
    result[1] = evaluate(pokerHand[1]);

    if (result[0].points > result[1].points) {
        return new FinalResult(1, result);
    } else {
        if (result[0].points < result[1].points) {
            return new FinalResult(2, result);
        } else {
            for (var i = 0; i < result[0].cards.length; i += 1) {
                for (var j = 0; j < result[1].cards.length; i += 1) {
                    if (result[0] == result[1]) {
                        break;
                    }
                    if (result[0] > result[1]) {
                        return new FinalResult(1, result);
                    } else {
                        return new FinalResult(2, result);
                    }
                }
            }
            return new FinalResult(0, result);
        }
    }
}

module.exports.comparePokerHands = comparePokerHands;
module.exports.PokerHand = PokerHand;
