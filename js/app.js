/*-------------------------------- Constants --------------------------------*/
const winningCombos = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6]
]

const kazoo = new Audio('../audio/kazoo.wav')

/*---------------------------- Variables (state) ----------------------------*/

let board, turn, winner


/*------------------------ Cached Element References ------------------------*/
const squareEls = document.querySelectorAll('.squares')
const messageEl = document.querySelector('#message')
const boardEls = document.querySelector('.board')
const resetBtnEl = document.querySelector('#reset-btn')

/*----------------------------- Event Listeners -----------------------------*/

// squareEls.addEventListener('click', handleClick)
boardEls.addEventListener('click', handleClick)

resetBtnEl.addEventListener('click', init)


/*-------------------------------- Functions --------------------------------*/


// initialize game upon loading
init()
function init(){
  board = [null,null,null,null,null,null,null,null,null]
  turn = 1
  winner = null
  
  render()
}
function gameReset(){
  init()
  // resetBtnEl.hidden = true
}
// state of the game should be rendered to the user 
function render(){
  board.forEach(function(square,idx) {
    if(square === 1) {
      squareEls[idx].textContent = 'X'
      squareEls[idx].style.color = 'MediumVioletRed'
      squareEls[idx].className= 'animate__animated animate__flip'
      
    }else if (square === -1) {
      squareEls[idx].textContent = 'O'
      squareEls[idx].style.color = 'navy' 
      squareEls[idx].className= 'animate__animated animate__rotateIn'
    }else {
      squareEls[idx].textContent = null }
  })
  if (winner === null) {
    if(turn === 1) {
      messageEl.textContent = "Is player X's turn!"
    }else {
      messageEl.textContent = "Is player O's turn!"
    }
  }else if (winner === 'T') {
    messageEl.textContent = "It's a tie!"
  }else {
    if(winner === 1){
      messageEl.textContent = `Congratulations player X, you won!`
      confetti.start(1000)
      setTimeout(function(){
        kazoo.play()
      },1000)
    }else {
      messageEl.textContent = `Congratulations player O, you won!`
      confetti.start(1000)
      setTimeout(function(){
        kazoo.play()
      },1000)
      
    }
  }
}

function handleClick(evt) {
  const sqIdx = parseInt(evt.target.id[2])

  if (board[sqIdx] !== null) {
    return
  }else if (winner !== null) {
    return
  }else {
    board.splice(sqIdx, 1, turn)
  }
  
  getWinner()
  turn = turn * -1
  render ()
}

function getWinner(){
  winningCombos.forEach((wCombo) => {
    winningTotal = Math.abs(board[wCombo[0]] + board[wCombo[1]] + board[wCombo[2]])
    if (winningTotal === 3) {
      winner = turn 
    }else if (!board.includes(null)) {
      winner = 'T'
    }
  })
}