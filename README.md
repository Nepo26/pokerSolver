# pokerSolver

## Code interview challenge.
An application that receives 2 hands of poker and determines its winner.

# Starting the project

To start we need to determine the basics, which will be how this API will work. To set what each symbol means we say the following:
- C - Clubs
- S - Spades
- D - Diamonds
- H - Hearts
 
 A hand object is defined by an array of 5 card objects the following structure:
 ```json
{
    cards: 
        [
            {value:5,suit:"C"},
            {value:5,suit:"D"},
            {value:8,suit:"S"},
            {value:9,suit:"S"},
            {value:7,suit:"S"}
        ]
}
 ```
