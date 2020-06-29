/**
 * Check to see if the hand has a sequence
 * @param {Array} pokerHand
 * @returns boolean
 */
function isStraight(pokerHand) {    
    // console.log(pokerHand.lenght);
    
    pokerHand.sort(function(a,b){return a.value - b.value});

    for(i=0;i<4;i++){
        if(pokerHand[i].value+1 != pokerHand[i+1].value){
            return false;
        }
    }
    
    return true;
}


/**
 * Check to see if the hand is a flush
 * @param {Array} pokerHand
 * @returns boolean
 */
function isFlush(pokerHand) {
    for(i=0;i<5;i++){
        if(pokerHand[i].suit != pokerHand[i+1].suit){
            return false;
        }
    }

    return true;
}


/**
 * Check to how many of each hand card there is on hand.
 * @param {Array} pokerHand
 * @returns Array[Integer,{*}]
 */
function manyCheck(pokerHand) {
    pokerHand.sort(function(a,b){return a[0] - b[0]});
    var repeating = new Array();
    var distinctCards = [...new Set(pokerHand.map(x => x.value))];
    console.log(distinctCards);
    for(i=0;i<distinctCards.length;i++){
        console.log("Many ["+distinctCards[i]+"]="+(pokerHand.filter(hand => hand.value === distinctCards[i]).length));

        var repeatingQuantity = (-1 + pokerHand.filter(hand => hand.value === pokerHand[i].value).length);
        var a = {value:pokerHand[i].value,repetitions:repeatingQuantity};
        repeating.push(a);
    }
    return repeating;
}



// A hand is an array of cards
var hand = {cards: [{value:5,suit:"C"},{value:6,suit:"D"},{value:7,suit:"S"},
            {value:9,suit:"S"},{value:8,suit:"S"}]}
console.log("Straight: " + isStraight(hand.cards));
console.log("Flush: " + isFlush(hand.cards));
console.log("Deuces: " + manyCheck(hand.cards).length);

