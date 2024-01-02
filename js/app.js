//****************************** Cached Elements ********************************//
const genSecretCodeBtn = document.querySelector('#gensecretnumber')
const colorBtns = document.querySelectorAll('.color')
const colorGrid = document.querySelectorAll('.row')
const guessBtn = document.querySelector('#guess')
const codeGenMessage = document.querySelector('#codegenmessage')
const instructions = document.querySelector('#instructions')
const playAgain = document.querySelector('#playagain')
const congrats = document.querySelector('#congrats')
const restartRow = document.querySelector('#restartrow')
const gameOver = document.querySelector('#gameover')

//****************************** Variables ********************************//
const COLORS = ['red', 'aqua', 'yellow', 'green', 'pink', 'purple']
let secretCode = []
let guessedCode = []
let currentRowIndex = 0
let secretCodeGenerated = false




//****************************** Event Listeners ********************************//
genSecretCodeBtn.addEventListener('click', genSecretCode)


colorBtns.forEach(button => {
    button.addEventListener('click', function() {
        const selectedColor = button.id;
        addToRow(selectedColor);
    });
});

restartRow.addEventListener('click', function(){
    clearRow(currentRowIndex)
})
guessBtn.addEventListener('click', checkGuess);
playAgain.addEventListener('click', restartGame)


//****************************** Functions ********************************//
function genSecretCode() {
    secretCode = []; // Clear any existing secret code

  for (let i = 0; i < 4; i++) {
    const randomIndex = Math.floor(Math.random() * COLORS.length);
    const randomColor = COLORS[randomIndex];
    secretCode.push(randomColor);
  }
  genSecretCodeBtn.classList.add('hidden')
  codeGenMessage.classList.remove('hidden')
  restartRow.classList.remove('hidden')
  guessBtn.classList.remove('hidden')

  console.log('Generated Secret Code:', secretCode);
}

function addToRow(color) {
    const currentRow = colorGrid[currentRowIndex]
    const emptySlot = currentRow.querySelector('.grid:not(.filled)');
    if (emptySlot) {
        emptySlot.style.backgroundColor = color;
        emptySlot.classList.add('filled');
        guessedCode.push(color);
        console.log(guessedCode)
    }

}

function removeColor(gridElement) {
    if (gridElement.classList.contains('filled')) {
        gridElement.style.backgroundColor = ''
        gridElement.classList.remove('filled')
        const index = Array.from(gridElement.parentNode.children).indexOf(gridElement)
        guessedCode.splice(index, 1)
    }
}

function arraysEqual(arr1, arr2) {
    if (arr1.length !== arr2.length) {
        return false;
    }
    for (let i = 0; i < arr1.length; i++) {
        if (arr1[i] !== arr2[i]) {
            return false;
        }
    }
    return true;
}

function checkGuess() {
    if (guessedCode.length === 4) {
        if (arraysEqual(secretCode, guessedCode)) {
            const currentRow = colorGrid[currentRowIndex];
            for (let i = 0; i < secretCode.length; i++) {
                const secretColor = secretCode[i];
                const guessedColor = guessedCode[i];
                const gridElement = currentRow.children[i];     
            instructions.classList.add('hidden')
            congrats.classList.remove('hidden')
            gridElement.innerHTML = '<img src="./assets/tick.png" alt="tick">'
            codeGenMessage.classList.add('hidden')
            guessBtn.classList.add('hidden')
            playAgain.classList.remove('hidden')
            restartRow.classList.add('hidden')
            console.log('You have cracked the code!')
        } 
    } else if (currentRowIndex <= 8) {
            const currentRow = colorGrid[currentRowIndex];
            for (let i = 0; i < secretCode.length; i++) {
                const secretColor = secretCode[i];
                const guessedColor = guessedCode[i];
                const gridElement = currentRow.children[i];
            console.log('incorrect Code, try again!')

            if (secretColor === guessedColor) {
                gridElement.innerHTML = '<img src="./assets/tick.png" alt="tick">' // Same color, same position
            } else if (secretCode.includes(guessedColor)) {
                gridElement.innerHTML = '<img src="./assets/middle.png" alt="dash">'; // Present but wrong position
            } else {
                gridElement.innerHTML = '<img src="./assets/cross.png" alt="cross">'; // Not matching
            }
            if (!codeGenMessage.classList.contains('hidden')) {
            codeGenMessage.classList.add('hidden')
            }
        }
    } else if (currentRowIndex > 8) {
        instructions.classList.add('hidden')
        gameOver.classList.remove('hidden')
        codeGenMessage.classList.add('hidden')
        guessBtn.classList.add('hidden')
        restartRow.classList.add('hidden')
        playAgain.classList.remove('hidden')
    }
    currentRowIndex++;
    guessedCode = [];
 } else {console.log('Fill more boxes')}
}

function clearRow(rowIndex) {
    guessedCode = []
    const row = colorGrid[rowIndex] 
    Array.from(row.children).forEach(gridElement => {
            gridElement.style.backgroundColor = ''
            gridElement.classList.remove('filled')
            gridElement.innerHTML = ''
        })
    if (!codeGenMessage.classList.contains('hidden')) {
        codeGenMessage.classList.add('hidden')
    }
}

function restartGame() {
    secretCode = []
    guessedCode = []
    currentRowIndex = 0
    genSecretCodeBtn.classList.remove('hidden');
    codeGenMessage.classList.add('hidden')
    instructions.classList.remove('hidden')
    playAgain.classList.add('hidden')
    if (!congrats.classList.contains('hidden')) {
        congrats.classList.add('hidden')
    }
    if (!gameOver.classList.contains('hidden')) {
        gameOver.classList.add('hidden')
    }

    colorGrid.forEach(row => {
        Array.from(row.children).forEach(gridElement => {
            gridElement.style.backgroundColor = ''
            gridElement.classList.remove('filled')
            gridElement.innerHTML = ''
        })
    })
    console.log('Game Reset')
}