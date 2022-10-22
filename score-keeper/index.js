const p1 ={
    score : 0,
    button : document.querySelector('#p1Button'),
    display : document.querySelector('#p1Display')
}

const p2 ={
    score : 0,
    button : document.querySelector('#p2Button'),
    display : document.querySelector('#p2Display')
}

let winningScore = 6;
let isGameOver = false;
let newOption = 0;

let maxScore = document.querySelector('#maxScore');
maxScore.addEventListener('change',function(){
    winningScore = parseInt(this.value);
    reset();
})

p1.button.addEventListener('click',function(){
    updateScore(p1,p2);
})

p2.button.addEventListener('click',function(){
    updateScore(p2,p1)
})

function updateScore(player,opponent){
    if(!isGameOver){
        player.score ++;
        if(player.score === winningScore){
            if(player.score >= opponent.score + 2){
            isGameOver = true;
            player.display.classList.add('has-text-success')
            opponent.display.classList.add('has-text-danger')
            player.button.disabled = true;
            opponent.button.disabled = true;
            }
        }
        else if(player.score === winningScore-1 && opponent.score === winningScore-1) {
            alert('Tie Breaker, Win by Two points')
            winningScore++;
        }
        player.display.textContent = player.score;
        }
    }


const resetButton = document.querySelector('#reset');
resetButton.addEventListener('click',function(){
    reset();
    maxScore = 6;
    winningScore = 6;
})

function reset(){
    isGameOver = false;
    for(let p of [p1,p2]){
        p.score = 0;
        p.display.textContent = p.score
        p.display.classList.remove('has-text-success','has-text-danger')    
        p.button.disabled = false        
    }
   
}

