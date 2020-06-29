
function isSequential(pokerHand) {    
    

    pokerHand.sort(function(a,b){return a[0] - b[0]});

    for(i=0;i<4;i++){
        if(pokerHand[i][0]+1 != pokerHand[i+1][0]){
            return 0;
        }
    }
    
    return 1;
}

function isFlush(pokerHand) {
    for(i=0;i<4;i++){
        if(pokerHand[i][1] != pokerHand[i+1][1]){
            return 0;
        }
    }

    return 1;
}

var hand = [[6,"C"],[5,"D"],[8,"S"],[9,"S"],[7,"S"]];
console.log("Sequential: " + isSequential(hand));
console.log("Flush: " + isFlush(hand))