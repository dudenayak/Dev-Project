const choices = Array.from(document.querySelectorAll('.choice-text'));
const scoreText = document.querySelector('#score');
const selectvarText = document.querySelector('#selectedvar');
const modal = document.querySelector(".modal-overlay");
const modalCorrect = document.getElementById("correct");

let score = 0
let acceptedAnswer = true
var randomNumber = 1;
var classToApply = ""

const SCORE_POINTS = 10

startGame = () => {
    score = 0
}

function start(){
    // Timer starts
    var countdownNumberEl = document.getElementById('countdown-number');

    var countdown = 10;
    countdownNumberEl.textContent = countdown;
   
    var myInterval = setInterval(function() {
        countdown = --countdown <= 0 ? myStopFunction() : countdown;
        countdownNumberEl.textContent = countdown;
    }, 1000);

    function myStopFunction() {
        anim();
        check();
        clearInterval(myInterval);
        
    }
}

choices.forEach(choice =>{
    choice.addEventListener('click', e => {
        if(!acceptedAnswer) return

        acceptedAnswer = false
        const selectedChoice = e.target
        const selectedAnswer = e.target.id

        // Generates a random number to display on dice
        randomNumber = Math.floor(Math.random() * 6) + 1;
        console.log("Dice number: " + randomNumber)

        console.log("Selected: " + selectedAnswer)
        selectvarText.innerText = selectedAnswer
        selectedChoice.parentElement.classList.add('selected')
        
        classToApply = selectedAnswer == randomNumber ? 'correct' : 'incorrect'

        if(classToApply === 'correct'){
            incrementScore(SCORE_POINTS)
        }

        setTimeout(() => {
            selectedChoice.parentElement.classList.remove('selected')
            acceptedAnswer = true
        }, 1000)
        
    })
})

incrementScore = num => {
    score += num
    scoreText.innerText = score
}

function shuffle(){
    const img = document.getElementById("img");
    img.setAttribute("src", `./assets/${randomNumber}.png`)
}

function anim(){
    setTimeout(shuffle, 1000);
    const img = document.getElementById("img");
    img.setAttribute("src", "./assets/dice.gif");
}

function check(){

    if(classToApply == 'correct'){
        setTimeout(() => {
            modalCorrect.classList.add("modal-container-correct")
            modal.classList.add("open-modal");
        }, 2500)
    }
    else{
        setTimeout(() => {
            modal.classList.add("open-modal");
        }, 2500)
    }
}

document.querySelector(".close-btn").addEventListener("click", () => {
    modalCorrect.classList.remove("modal-container-correct")
    modal.classList.remove("open-modal");
  });





