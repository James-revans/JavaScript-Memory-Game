// Creating variables to be used throughout project
//
// Array that checks if the cards have matching pictures
var photoCheck = [null, null];

// Array that will add and remove classes on click
var cardTracker = [null, null];

// Arrays of random numbers that will be assigned to the cards on creation
var randomArray = [];
var randomArray2 = [];

// Array of card objects
var cardArray = [];

// Timer variables
var sec = 30;
var min = 1;
var timer;
startGame();


// Function that starts game. Upon clicking it starts the timer and creates a new board of shuffled cards
function startGame() {
    document.getElementById("startGame").addEventListener('click', function() {
        sec = 30;
        min = 1;
        restartGame();
        clearInterval(timer);
        // Function for starting the timer.
        var timer = setInterval(function() {
            document.getElementById('timer').innerHTML = ('0' + min + ':' + sec);
            if(sec < 10) {document.getElementById('timer').innerHTML = ('0' + min + ':0' + sec);}
            if(sec > 0) {
                sec--;
            }
            else if((sec == 0) && (min == 1)) {
                min = 0;
                sec = 59;
            }
            else {
                document.getElementById('endCaption').innerHTML = 'Game over!';
                document.querySelector('.game__win').classList.add('game-over');
                clearInterval(timer);
            }

        }, 1000);
    });
}




// Function for restarting the game. Sets values of variables to 0 and creates a new board.
function restartGame() {
    let element = document.getElementById("gameBoard");
    while (element.firstChild) {
        element.removeChild(element.firstChild);
      }
    
    photoCheck.length = 0;
    cardTracker.length = 0;
    randomArray.length = 0;
    randomArray2.length = 0;
    cardArray.length =  0;
    numberAssign();
    createCards();
    document.getElementById('startMessage').classList.add('hideStart');
}

// Click event for restarting the game
document.getElementById("replayButton").addEventListener('click', function() {   
    document.getElementById('startMessage').classList.remove('hideStart');
    document.querySelector('.game__win').classList.remove('game-over');
})



//Constructor Function to access data for each card
function Card(cardNumber, photo, flip) {
    this.cardNumber = cardNumber;
    this.photoNumber = photo;
    this.flip = flip;
}


// Function that creates the cards
function createCards() {
    for(let i=0; i<20; i++) {
        var newCard = document.createElement("div");
        document.getElementById('gameBoard').appendChild(newCard);
        document.getElementById("gameBoard").classList.add('boardActive');
        newCard.classList.add('card', 'photo' + randomArray[i]);
        newCard.classList.add('flip');

        cardArray[i] = new Card('card' + i, 'photo' + randomArray[i], false);
    } 
    flipCheck();
}





// Function that checks to see if cards match upon clicking them. Also adds and removes class to cards on click
function flipCheck() {
    // variable 'cards' is an array of divs all containing the class 'card'
    // cardArray is an array of card objects
    var cards = document.getElementsByClassName('card');
 
    for(let i=0; i<20; i++) {
        cards[i].addEventListener('click', function clickFunction() {
        
            cards[i].classList.add('active');
            setTimeout(function() {
                cards[i].classList.remove('flip');
            }, 200);

                photoCheck[1] = photoCheck[0];
                photoCheck[0] = cardArray[i];
                
                cardTracker[1] = cardTracker[0];
                cardTracker[0] = cards[i];

                if(photoCheck[1].photoNumber) {
                    if(photoCheck[0].photoNumber === photoCheck[1].photoNumber) {
                        photoCheck[0].flip = true;
                        photoCheck[1].flip = true;
                        winChecker();
                        cardTracker, photoCheck = [null, null];
                        
                    }
                    else {
                        photoCheck = [null, null];
                        setTimeout(function(){
                            cardTracker[1].classList.remove('active');
                            cardTracker[0].classList.remove('active');

                            cardTracker[1].classList.add('flip');
                            cardTracker[0].classList.add('flip');
                            cardTracker = [null, null];
                        }, 800);
                        
                    }
            }   
            }, false);
    }
}


// Function that checks to see when all 20 cards are flipped over
function winChecker() {
    var matchedCards = document.getElementsByClassName('active');
    if(matchedCards.length == 20) {
        document.getElementById('endCaption').innerHTML = 'Congratulations! You won!';
        document.querySelector('.game__win').classList.add('game-over');
        clearInterval(timer);
        sec = 30;
        min = 1;
        
        
    }
}

// Function that on creation, assigns random number between 1 and 10
// only 2 of each number can be assigned
// final array will have length of 20 for all 20 cards
function numberAssign() {
    while(randomArray.length < 10 || randomArray2.length < 10) {
        var number = Math.floor(Math.random() * 10);
        if(randomArray.includes(number)) {
            if(randomArray2.includes(number)) {
                
            }
            else {
                randomArray2.push(number);
            }
        }
        else {
            randomArray.push(number);
        }
    }
    randomArray = randomArray.concat(randomArray2);
}












