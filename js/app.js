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


/*---------------------------- Variables (state) ----------------------------*/

let board, turn, winner


/*------------------------ Cached Element References ------------------------*/
const squareEls = document.querySelectorAll('.squares')
const messageEl = document.querySelector('#message')



/*----------------------------- Event Listeners -----------------------------*/



/*-------------------------------- Functions --------------------------------*/

init()
// initialize game upon loading
function init(){
  board = [null,null,null,null,null,null,null,null,null]
  turn = 1
  winner = null
  render()
}

// state of the game should be rendered to the user 
function render(){
  board.forEach(function(square,idx) {
    if(square === 1) {
      squareEls[idx].textContent = 'X'
      squareEls[idx].style.color = 'red'
    }else if (square === -1) {
      squareEls[idx].textContent = 'O'
      squareEls[idx].style.color = 'aqua'
    }

    if (winner === null) {
      if(turn === 1) {
        messageEl.textContent = "Is player X's turn!"
      }else {
        messageEl.textContent = "Is player O's turn!"
      }
    }else if (winner === 'T') {
      messageEl.textContent = "It's a tie!"
    }else {
      messageEl.textContent = `Congratulations player ${winner}, you won!`
    }
  })
}