const squares = document.querySelectorAll('.square')
const startButton = document.querySelector('#start-button')
const stopButton = document.querySelector('#stop-button')
const plusButton = document.querySelector('#plus-button')
const minusButton = document.querySelector('#minus-button')
const timeLeft = document.querySelector('#time-left')
const playerCountDisplay = document.querySelector('#player-count')
const resultDisplay = document.querySelector('#result')

let playerCount = 0
let sheepCounter = 0
let currentTime = 30
let wolfSpeed = 1000
let sheepPositionIndex = 0
let wolfPositionIndex = 19
let mySheepInterval = null
let myWolfInterval = null
let countDownTimer = null

function moveSheep() {
  squares.forEach((block) => {
    block.classList.remove('sheep')
  })
  if (sheepPositionIndex < 9) {
    squares[sheepPositionIndex++].classList.add('sheep')
  } else {
    sheepPositionIndex = 0
    sheepCounter++
  }
}

function moveWolf() {
  squares.forEach((block) => {
    block.classList.remove('wolf')
  })
  if (wolfPositionIndex > 9) {
    squares[wolfPositionIndex--].classList.add('wolf')
  } else {
    wolfPositionIndex = 19
    sheepCounter--
    wolfSpeed = Math.floor(Math.random() * (1000 - 375) + 375)
    clearInterval(myWolfInterval)
    myWolfInterval = setInterval(moveWolf, wolfSpeed)
  }
}

function startMove() {
  mySheepInterval = setInterval(moveSheep, 350)
  myWolfInterval = setInterval(moveWolf, wolfSpeed)
  countDownTimer = setInterval(countDown, 1000)
  resultDisplay.innerHTML = ''
  plusButton.addEventListener('click', upFunction)
  minusButton.addEventListener('click', downFunction)
  startButton.removeEventListener('click', startMove)
}

function pause() {
  clearInterval(mySheepInterval)
  clearInterval(myWolfInterval)
  clearInterval(countDownTimer)
  plusButton.removeEventListener('click', upFunction)
  minusButton.removeEventListener('click', downFunction)
  startButton.addEventListener('click', startMove)
}
stopButton.addEventListener('click', pause)
startButton.addEventListener('click', startMove)

function countDown() {
  currentTime--
  timeLeft.innerHTML = currentTime
  if (currentTime === 0) {
    clearInterval(countDownTimer)
    checkResult()
    pause()
    startingParametersSetter()
    playerCountDisplay.innerHTML = playerCount
  }
}

function startingParametersSetter() {
  currentTime = 30
  sheepCounter = 0
  playerCount = 0
  sheepPositionIndex = 0
  wolfPositionIndex = 19
}

function checkResult() {
  if (sheepCounter === playerCount) {
    resultDisplay.innerHTML = 'YOU WON!'
  } else {
    resultDisplay.innerHTML = 'GAME OVER :('
  }
}

function upFunction() {
  playerCount++
  playerCountDisplay.innerHTML = playerCount
}

function downFunction() {
  playerCount--
  playerCountDisplay.innerHTML = playerCount
}
