
// get all the elements with the class of flip-card
const flipCard = document.querySelectorAll('.flip-card');
//recording cards
let firstCard = null;
let secondCard = null;
let ClickLock = false;

//recording game stats
let attempts = 0;
let matches = 0;

let seconds = 0;
let timerStarted = false;
let timer = null;
let timeout = null;

shuffleCards()


flipCard.forEach(el => {
    el.addEventListener('click', function() {

        if(ClickLock) return; //prevent clicking when cards are not matched and waiting to flip back

        if(el.classList.contains('matched')) return;//prevent clicking on already matched cards

        if(el === firstCard){
            console.log("Same card clicked"); //prevent clicking the same card twice
            return;
        } 
        //flip card without using id
        const flipCardInner = el.querySelector('.flip-card-inner');
        flipCardInner.classList.add('flipped');

        if(timerStarted === false){
            timerStarted = true;
            timer = setInterval(function() {
                seconds++;
                document.getElementById('timer').textContent = seconds;
            }, 1000);
        }

        //check if it is first card or second card
        if(firstCard === null){

            firstCard = el;

        }
        else{

            secondCard = el;

            attempts++;
            document.getElementById('attemptCount').textContent = attempts;

            ClickLock = true;

            //match check
            if(firstCard.dataset.value === secondCard.dataset.value){

                console.log("Match!");
                matches++;
                document.getElementById('matchCount').textContent = matches;

                firstCard.classList.add('matched');
                secondCard.classList.add('matched');

                firstCard = null;
                secondCard = null;

                if (matches === 8) {
                ClickLock = true; // Lock further clicks
                clearInterval(timer);//reset timer

                document.getElementById('gameMessage').textContent =
                `Completed in ${seconds}s with ${attempts} attempts!`;

                return; // Exit the function to prevent further execution
                }
                
                ClickLock = false;
            }
            else{
                console.log("Not match!");
                
                //time delay before flip back
                timeout = setTimeout(function(){
                    firstCard.querySelector('.flip-card-inner').classList.remove('flipped');
                    secondCard.querySelector('.flip-card-inner').classList.remove('flipped');
                    
                    firstCard = null;
                    secondCard = null;
                    ClickLock = false;
                    
                }, 1500);
                
            }
        }
    })
})

const resetButton = document.getElementById('resetButton');
resetButton.addEventListener('click', function(event) {
    // get all the elements with the class of flip-card-back

    const flipCardBack = document.querySelectorAll('.flip-card-inner');
    flipCardBack.forEach(el => {
        el.classList.remove('flipped');//flip back all the cards
    });

    flipCard.forEach(el => {
        el.classList.remove('matched');//remove matched class from all cards
    });

    //reset all the game stats
    clearInterval(timer);
    clearTimeout(timeout);
    timeout = null;
    ClickLock = false;
    seconds = 0;
    attempts = 0;
    matches = 0;
    timerStarted = false;
    timer = null;
    firstCard = null;
    secondCard = null;
    document.getElementById('timer').textContent = seconds;
    document.getElementById('attemptCount').textContent = attempts;
    document.getElementById('matchCount').textContent = matches;
    document.getElementById('gameMessage').textContent = '';
    //shuffle the cards
    shuffleCards()
})


function shuffleCards() {
    const cards = Array.from(flipCard);
    for (let i = cards.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [cards[i], cards[j]] = [cards[j], cards[i]];
    } 
    
    cards.forEach(card => {
        document.querySelector('.game-board').appendChild(card);
    });
}