const gameBoard = document.querySelector("#gameboard")
const playerDisplay = document.querySelector("#player")
const infoDisplay = document.querySelector("#info-display")

const width = 8
let playerGo = 'black'
playerDisplay.textContent = 'black'

const startPieces = [

    rook, knight, bishop, queen, king, bishop, knight, rook,
    pawn, pawn, pawn, pawn, pawn, pawn, pawn, pawn,
    '', '', '', '', '', '', '', '', 
    '', '', '', '', '', '', '', '', 
    '', '', '', '', '', '', '', '', 
    '', '', '', '', '', '', '', '',
    pawn, pawn, pawn, pawn, pawn, pawn, pawn, pawn,
    rook, knight, bishop, queen, king, bishop, knight, rook, 
]

function createBoard() {
   startPieces.forEach((startPiece, i) => {
    const square = document.createElement('div')
    square.classList.add('square')
    square.innerHTML = startPiece
    //Draggable True
    square.firstChild?.setAttribute('draggable', true)

    square.setAttribute('square-id', i)
    square.classList.add('being')
    const row = Math.floor( (63 - i) / 8 ) + 1
    if(row % 2 === 0 ) {
        square.classList.add(i % 2 === 0 ? "being" : "brown")
    } else {
        square.classList.add( i % 2 === 0 ? "brown" : "being")
    }

    if (i >= 48) {
        square.firstChild.classList.add('white')
    }

    gameBoard.append(square)
   }) 
}
createBoard()

//Dragging Logic

const allSquares = document.querySelectorAll(".square")

allSquares.forEach(square => {
    square.addEventListener('dragstart', dragStart)
    square.addEventListener('dragover', dragOver)
    square.addEventListener('drop', dragDrop )
})

let startPostitionId
let draggedElement

function dragStart (e) {
    startPostitionId = e.target.parentNode.getAttribute('square-id')
    draggedElement = e.target
}

function dragOver(e) {
    e.preventDefault()
}

function dragDrop(e) {
    e.stopPropagation()
    console.log(e.target)
    const taken = e.target.classList.contains('piece')

   changePlayer() 
}

function changePlayer() {
    if (playerGo === "black") {
        reverseIds()
        playerGo = "white"
        playerDisplay.textContent = 'white'

    } else {
        revertIds()
        playerGo = "black"
        playerDisplay.textContent = 'black'
    }
}

function revertIds() {
    const allSquares = document.querySelectorAll(".square")
    allSquares.forEach((square, i) => 
    square.setAttribute('square-id', (width * width - 1) - i))
}

function revertIds() {
    const allSquares = document.querySelectorAll(".square")
    allSquares.forEach((square, i) => square.setAttribute('square-id', i))
}
