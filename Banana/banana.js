var gameWindow = document.getElementById('gameWindow')
var gameOverWindow = document.getElementById('gameOverWindow')
var menuScreen = document.getElementById('menuScreen')
var body = document.getElementsByTagName('body')[0]

var banana = document.getElementById('bananapng');
var counter = document.getElementById('counter')
var timer = document.getElementById('timer')

var counterNum = 0

console.log('yeet')
start()
//runGameOver()

function start() {
    var bananaSide = 48;
    var bananaTop = 40;
    var gameOver = false
    var firstClick = true
    var timeOnes = 2
    var timetenths = 0

    gameWindow.style.display = 'inline-block'
    gameOverWindow.style.display = 'none'
    body.style.backgroundColor = 'yellow'
    counter.innerHTML = counterNum

    banana.style.top = String(bananaTop) + 'vh'
    banana.style.left = String(bananaSide) + 'vw'

    banana.onclick = function () {
        if (gameOver == false) {
            bananaSide = Math.random() * 90
            bananaTop = Math.random() * 90
            banana.style.top = String(bananaTop) + 'vh'
            banana.style.left = String(bananaSide) + 'vw'
            counterNum += 1
            counter.innerHTML = counterNum
            if (counterNum >= 0 && counterNum < 10) {
                timeOnes = 2
                timetenths = 0
                timer.innerHTML = '2.0'
            }
            else if (counterNum >= 10 && counterNum < 25) {
                timeOnes = 1
                timetenths = 7
                timer.innerHTML = '1.7'
            }
            else if (counterNum >= 25 && counterNum < 50) {
                timeOnes = 1
                timetenths = 5
                timer.innerHTML = '1.5'
            }
            else if (counterNum >= 50 && counterNum < 100) {
                timeOnes = 1
                timetenths = 2
                timer.innerHTML = '1.2'
            }
            else if (counterNums <= 100 && counterNum < 200) {
                timeOnes = 1
                timetenths = 0
                timer.innerHTML = '1.0'
            }
            else if (counterNum > 100) {
                timeOnes = 0
                timetenths = 10 - counterNum / 100
            }
            if (counterNum < 100) {
                banana.style.opacity = String(1 - counterNum / 150)
            }
            else {
                banana.style.opacity = '0.2'
            }
            if (firstClick == true) {
                firstClick = false
                firstClickFun()
            }
        }

    }
    function firstClickFun() {
        var Interval = window.setInterval(startWatch, 100);
        menuScreen.style.display = 'none'
    }



    function startWatch() {
        if (gameOver == false) {
            timer.innerHTML = timeOnes + timetenths / 10
            if (timeOnes + timetenths / 10 >= 0.7) {
                timer.style.color = "red"
            }
            if (timeOnes + timetenths / 10 >= 1.0) {
                timer.style.color = "red-orange"
            }
            if (timeOnes + timetenths / 10 >= 1.2) {
                timer.style.color = "orange"
            }
            if (timeOnes + timetenths / 10 >= 1.5) {
                timer.style.color = "yellowgreen"
            }
            if (timeOnes + timetenths / 10 >= 1.7) {
                timer.style.color = "green"
            }
            timetenths -= 1
            if (timetenths == -1) {
                timeOnes -= 1
                timetenths = 9
                if (timeOnes == -1) {
                    gameOver = true
                    runGameOver()
                }
            }
        }
    }
}
function runGameOver() {
    gameWindow.style.display = 'none'
    gameOverWindow.style.display = 'inline-block'
    body.style.backgroundColor = 'red'
    document.getElementById("score").innerHTML = "Your score was: " + String(counterNum)
}

var restartButton = document.getElementById('restartButton')

restartButton.onclick = function () {
    counterNum = 0
    start()
}

