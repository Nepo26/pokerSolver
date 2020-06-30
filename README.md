# pokerSolver

## Code interview challenge.
An application that receives 2 hands of poker and determines its winner.

## Understanding the basics

### Suits
To start we need to determine the basics, which will be how this API will work. To set what each symbol means we say the following:
- C - Clubs
- S - Spades
- D - Diamonds
- H - Hearts

### Ranks
Then we need to say that a card name is made first of the ranks that it represents then its suit or symbol. The   available values are these:
- A - Ace
- 2 - Two
- 3 - Three
- 4 - Four
- 5 - Five
- 6 - Six
- 7 - Seven
- 8 - Eight
- 9 - Nine
- 10 - Ten
- J - The Jack
- Q - Queen
- K - King

### Both
What makes a card is its Rank and its Suits, for example 'King of hearts' is represented as KH.

## Installing the pokersolver

### Simple Node.js
- Download and install node.js and a package manager of a choice ( I will be using npm as the example)
- Clone this [repository](https://github.com/Nepo26/pokerSolver.git)
- Enter the directory
- npm install
- node src/app.js

^ This way the api will be served on port 3000 of localhost.


### Docker

#### Use the built-in docker-compose
You can do as above and simply use 'docker-compose up' inside the directory. It will then follow to build and run the program.

#### Create a simple docker-compose
Or you can create a simple docker-compose using my image on the cloud.
```YAML
    version: '3'
    services:
        pokersolver:
            container_name: pokersolver
            image: nepo26/pokersolver:latest
            ports:
                - "3000:3000"
            restart: unless-stopped
```

#### Using docker run
Or even simpler using docker run as the following:
```bash 
    docker run --name pokersolver -p3000:3000 -d nepo26/pokersolver:latest
```
The it will be running as a daemon.

## Querying the API

For such what you just need to send a request to the root path with 2 parameters of cards, as exemplified below.

Request:
http://localhost:3000?hand=10C,JC,QC,KC,AC&hand=KS,KD,QD,2D,3S

Expected response:
```json
{
    "winner": 1,
    "evaluation": [
        {
            "name": "SF",
            "points": 8,
            "cards": [
                {
                    "value": "1",
                    "suit": "C"
                },
                {
                    "value": "10",
                    "suit": "C"
                },
                {
                    "value": "11",
                    "suit": "C"
                },
                {
                    "value": "12",
                    "suit": "C"
                },
                {
                    "value": "13",
                    "suit": "C"
                }
            ]
        },
        {
            "name": "P",
            "points": 1,
            "cards": [
                {
                    "value": "2",
                    "suit": "D"
                },
                {
                    "value": "3",
                    "suit": "S"
                },
                {
                    "value": "12",
                    "suit": "D"
                },
                {
                    "value": "13",
                    "suit": "S"
                },
                {
                    "value": "13",
                    "suit": "D"
                }
            ]
        }
    ]
}
```





