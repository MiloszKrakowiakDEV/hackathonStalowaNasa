let players = [
    { name: "Player 1", position: 0, correctAnswersInRow: 0, className: 'player1', currentMoney: 0, challengesToComplete: "" },
    { name: "Player 2", position: 0, correctAnswersInRow: 0, className: 'player2', currentMoney: 0, challengesToComplete: "" },
    { name: "Player 3", position: 0, correctAnswersInRow: 0, className: 'player3', currentMoney: 0, challengesToComplete: "" },
    { name: "Player 4", position: 0, correctAnswersInRow: 0, className: 'player4', currentMoney: 0, challengesToComplete: "" }
];
let currentQuestionAnswer;
const challenges = [
    'a',
    'b',
    'c',
    'd',
    'e',
    'f'
];
// Updated to a 2D array with questions and answers
const questions = [
    ["Is Goal 1 related to worldwide poverty issue?", "yes"],
    ["Are nitrogen fertilizers good for soil health?", "no"],
    ["Is CARITAS a charity organization?", "yes"],
    ["Did climate change led to reduction of natural resources?", "no"],
    ["Is solar energy a renewable resource?", "yes"],
    ["Are fossil fuels a renewable resource?", "no"],
    ["Can soil 1uality affect your health?", "yes"],
    ["How many percent of world population is suffering from poverty?", "25"],
    ["SDG Goals are estimated to be achieved on a specific year. Which one?", "2030"],
    ["Which continent is considered the poorest?", "Africa"]
];

let currentPlayerIndex = 0;
const totalSquares = 72;
// Preset squares: 7 normal, 11 question, 3 bonus rolls
const squareTypes = [
    'normal', 'normal', 'normal', 'normal', 'normal', 'normal', 'normal', // 7 normal squares
    'question', 'normal', 'question', 'normal', 'question', 'normal', 'question', 'question', 'question', 'question', 'question', 'normal', 'question', // 11 question squares
    'bonus', 'bonus', 'bonus' // 3 bonus roll squares
];



// Function to shuffle an array
function shuffle(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]]; // Swap elements
    }
    return array;
}

// Generate squares
function generateSquares() {
    // Duplicate and shuffle the squares
    let squares = [];
    for (let i = 0; i < 3; i++) { // Adjust this number to control the total number of squares
        squares = squares.concat(squareTypes);
    }
    squares = shuffle(squares);

    // Array of possible question square backgrounds
    const questionBackgrounds = [
        'nasa_question1.png',
        'nasa_question2.png'
    ];

    // Render squares, keeping start and end fixed
    const gameBoard = document.getElementById('gameBoard');
    squares.forEach(type => {
        const squareDiv = document.createElement('div');
        squareDiv.classList.add('game-square');

        if (type === 'question') {
            squareDiv.classList.add('question-square');
            squareDiv.textContent = 'Q';

            // Randomly choose one of the question backgrounds
            const randomBackground = questionBackgrounds[Math.floor(Math.random() * questionBackgrounds.length)];
            squareDiv.style.backgroundImage = `url('${randomBackground}')`;
            squareDiv.style.backgroundSize = 'cover';  // Ensure it covers the entire square
            squareDiv.style.backgroundPosition = 'center';  // Center the image
        } else if (type === 'bonus') {
            squareDiv.classList.add('extra-roll-square');
            squareDiv.textContent = 'Roll Again!';
        } else {
            squareDiv.textContent = ''; // Normal squares are neutral
        }

        gameBoard.insertBefore(squareDiv, gameBoard.children[gameBoard.children.length - 1]); // Insert before the end square
    });
}


function rollForCurrentPlayer() {
    document.getElementById('rollButton').disabled = true; // Disable button while rolling
    const diceElement = document.getElementById('dice');
    let timeInterval = 400; // Interval in milliseconds
    let rollDuration = 3000; // Duration of the rolling effect in milliseconds
    let endTime = Date.now() + rollDuration; // Calculate end time

    // Start rolling effect
    let intervalId = setInterval(() => {
        let randomValue = Math.floor(Math.random() * 6) + 1;
        switch (randomValue) {
            case 1:
                diceElement.innerHTML = `<img src="one.png" width=80px>`
                break
            case 2:
                diceElement.innerHTML = `<img src="two.png" width=80px>`
                break
            case 3:
                diceElement.innerHTML = `<img src="three.png" width=80px>`
                break
            case 4:
                diceElement.innerHTML = `<img src="four.png" width=80px>`
                break
            case 5:
                diceElement.innerHTML = `<img src="five.png" width=80px>`
                break
            case 6:
                diceElement.innerHTML = `<img src="six.png" width=80px>`
                break
        }
        // Random number between 1 and 6
        // diceElement.textContent = randomValue; // Update dice display
    }, timeInterval);

    // Stop rolling effect after the duration
    setTimeout(() => {
        clearInterval(intervalId); // Stop the interval
        let finalRoll = Math.floor(Math.random() * 6) + 1; // Get final roll
        diceElement.textContent = finalRoll; // Show final rolled number
        switch (finalRoll) {
            case 1:
                diceElement.innerHTML = `<img src="one.png" width=80px>`
                break
            case 2:
                diceElement.innerHTML = `<img src="two.png" width=80px>`
                break
            case 3:
                diceElement.innerHTML = `<img src="three.png" width=80px>`
                break
            case 4:
                diceElement.innerHTML = `<img src="four.png" width=80px>`
                break
            case 5:
                diceElement.innerHTML = `<img src="five.png" width=80px>`
                break
            case 6:
                diceElement.innerHTML = `<img src="six.png" width=80px>`
                break
        }
        movePlayer(currentPlayerIndex, finalRoll); // Move player based on rolled steps
    }, rollDuration);
}

function applyRandomBackgrounds() {
    // Array of background images
    const backgrounds = [
        'nasa_space1.png',
        'nasa_space2.png',
        'nasa_space3.png',
        'nasa_space4.png',
        'nasa_space5.png',
        'nasa_space6.png'
    ];


    // Select all .game-square elements
    const gameSquares = document.querySelectorAll('.game-square');

    // Iterate through each game square
    gameSquares.forEach(square => {
        // Check if the element has only the 'game-square' class and no others
        if (square.classList.length === 1 && square.classList.contains('game-square')) {
            // Select a random background image from the array
            const randomBackground = backgrounds[Math.floor(Math.random() * backgrounds.length)];

            // Apply the background to the square
            square.style.backgroundImage = `url('${randomBackground}')`;
            square.style.backgroundSize = 'cover';  // Ensure it covers the entire square
            square.style.backgroundPosition = 'center';  // Center the image
        }
    });
}

function movePlayer(playerIndex, steps) {
    let player = players[playerIndex];
    let stepsRemaining = steps;

    function moveStep() {
        if (stepsRemaining > 0 && player.position < totalSquares - 1) {
            player.position++; // Move forward
            renderBoard();
            stepsRemaining--;

            setTimeout(moveStep, 500); // Move step every 500ms
        } else if (player.position >= totalSquares - 1) {
            // Player reached or passed the final square
            player.position = totalSquares - 1; // Ensure the player stops at the final square
            announceWinners(); // Announce the winners
        } else {
            handleLanding(playerIndex); // Check landing after moving
        }
    }

    moveStep();
}
function randomRoll(playerIndex) {
    let roll = Math.floor(Math.random() * 5) + 1; // Random number between 1 and 5

    if (roll >= 1 && roll <= 3) {
        doX(playerIndex); // Perform action X
    } else if (roll === 4) {
        doY(playerIndex); // Perform action Y
    } else if (roll === 5) {
        doZ(playerIndex); // Perform action Z
    }
}

function handleLanding(playerIndex) {
    let player = players[playerIndex];
    let squareIndex = player.position;

    // Only check for question squares and extra roll squares
    if (isQuestionSquare(squareIndex)) {
        // If landed on a question square, ask question
        setTimeout(() => randomRoll(playerIndex), 100);
    } else if (isExtraRollSquare(squareIndex)) {
        // Roll again if landed on an extra roll square
        setTimeout(() => rollForCurrentPlayer(), 100);
    } else {
        currentPlayerIndex = (currentPlayerIndex + 1) % players.length; // Switch to the next player
        document.getElementById('rollButton').disabled = false; // Re-enable roll button
    }
}

function isQuestionSquare(index) {
    const square = document.querySelector(`.game-square:nth-child(${index + 1})`);
    return square.classList.contains('question-square');
}

function isExtraRollSquare(index) {
    const square = document.querySelector(`.game-square:nth-child(${index + 1})`);
    return square.classList.contains('extra-roll-square');
}



function moveBackward(playerIndex) {
    let player = players[playerIndex];
    let stepsRemaining = 3; // Move back 3 steps

    function moveStepBack() {
        if (stepsRemaining > 0 && player.position > 0) {
            player.position--; // Move backward
            renderBoard();
            stepsRemaining--;
            setTimeout(moveStepBack, 500);
        } else {
            // After moving back, switch to the next player
            currentPlayerIndex = (currentPlayerIndex + 1) % players.length; // Switch to the next player
            updateCurrentTurnDisplay(); // Update current turn display
            document.getElementById('rollButton').disabled = false; // Re-enable roll button
        }
    }

    moveStepBack();
}


function askQuestion(playerIndex) {
    const questionIndex = Math.floor(Math.random() * questions.length);
    const [question, answer] = questions[questionIndex];
    currentQuestionAnswer = answer;

    document.getElementById('questionText').textContent = `${players[playerIndex].name}, answer this question:\n ${question}`;
    document.getElementById('questionAnswer').value = "";
    document.getElementById('questionModal').style.display = 'block';
}
function submitAnswer() {
    const playerAnswer = document.getElementById('questionAnswer').value.trim().toLowerCase();
    document.getElementById('questionModal').style.display = 'none';

    const player = players[currentPlayerIndex];

    if (playerAnswer === currentQuestionAnswer.toLowerCase()) {
        alert(`${player.name} answered correctly!`);
        player.correctAnswersInRow++;
    } else {
        alert(`${player.name} answered incorrectly.`);
        moveBackward(currentPlayerIndex);
        player.correctAnswersInRow = 0;
        return;
    }

    if (player.correctAnswersInRow === 3) {
        alert(`${player.name} answered 3 questions in a row correctly! Extra roll!`);
        rollForCurrentPlayer();
    } else {
        // Switch to the next player
        currentPlayerIndex = (currentPlayerIndex + 1) % players.length;
        updateCurrentTurnDisplay();
        document.getElementById('rollButton').disabled = false;
    }
}
    
function announceWinners() {
    // Sort players based on their positions
    let sortedPlayers = players.slice().sort((a, b) => b.position - a.position); // Sort in descending order

    // Find winners
    let winners = sortedPlayers.filter(player => player.position === totalSquares - 1); // Check last square

    // Find players nearest to the goal (those who haven't reached it)
    let nearWinners = sortedPlayers.filter(player => player.position < totalSquares - 1);

    // Update podium display
    document.getElementById('winner').textContent = "Winner: " + (winners.length > 0 ? winners.map(w => w.name).join(", ") : "No winners");
    document.getElementById('nearest').textContent = "Nearest to the goal: " + (nearWinners.length > 0 ? nearWinners.map(nw => nw.name).join(", ") : "No one");
    document.getElementById('challenges').textContent+= "Challenges each player has to perform: "
    for(let i = 0;i<sortedPlayers;i++){
        document.getElementById('challenges').innerHTML+=`<br>${sortedPlayers[0].name} - ${sortedPlayers[0].challengesToComplete}`
    }
    document.getElementById('charity').textContent+= "Money each player can give to charity: "
    for(let i = 0;i<sortedPlayers;i++){
        document.getElementById('charity').innerHTML+=`<br>${sortedPlayers[0].name} - ${sortedPlayers[0].currentMoney}`
    }

    // Hide game board and show podium
    document.querySelector('.game-board').style.display = 'none';
    document.querySelector('.dice-container').style.display = 'none';
    document.querySelector('.podium').style.display = 'flex'; // Show podium
    document.getElementById('currentTurn').textContent = "";
}
function updateCurrentTurnDisplay() {
    const currentPlayerDisplay = document.getElementById('currentTurn');
    currentPlayerDisplay.textContent = `${players[currentPlayerIndex].name}'s turn to roll!`;
}

function renderBoard() {
    const boardSquares = document.querySelectorAll('.game-square');
    boardSquares.forEach(square => {
        square.innerHTML = "";  // Clear content to avoid numbers showing
    });

    players.forEach((player, index) => {
        const currentSquare = boardSquares[player.position];
        const playerDiv = document.createElement('div');
        playerDiv.classList.add('player', player.className);
        playerDiv.textContent = index + 1;  // Player number shown in player circle
        currentSquare.appendChild(playerDiv);
    });
}

function doX(playerIndex) {
    askQuestion(playerIndex)
}

function doY(playerIndex) {
    let player = players[playerIndex];
    player.currentMoney += 5;
    alert("BONUS! You've won 5 dollars to give to a charity of your choice!")
    currentPlayerIndex = (currentPlayerIndex + 1) % players.length; // Switch to the next player
    document.getElementById('rollButton').disabled = false; // Re-enable roll button
}

function doZ(playerIndex) {
    let challenge = challenges[parseInt(Math.random()*(challenges.length))]
    let player = players[playerIndex];
    if(player.challengesToComplete==""){
        player.challengesToComplete.concat(challenge)
    }else{
        player.challengesToComplete.concat(", "+challenge)
    }
    alert("CHALLENGE! You will have to "+challenge+" after the game!")
    currentPlayerIndex = (currentPlayerIndex + 1) % players.length; // Switch to the next player
    document.getElementById('rollButton').disabled = false; // Re-enable roll button
}

document.getElementById("startGame").addEventListener("click", function () {
    let player1Name = document.getElementById("player1").value || "Red Player";
    let player2Name = document.getElementById("player2").value || "Blue Player";
    let player3Name = document.getElementById("player3").value || "Green Player";
    let player4Name = document.getElementById("player4").value || "Yellow Player";

    // Assign the names to the players
    players[0].name = player1Name;
    players[1].name = player2Name;
    players[2].name = player3Name;
    players[3].name = player4Name;

    // Hide the name popup
    document.getElementById("namePopup").style.display = "none";
    updateCurrentTurnDisplay();
    document.getElementById("currentTurn").style.visibility="visible  "

});

// Generate the squares and render the initial board
document.getElementById("currentTurn").style.visibility="hidden"
generateSquares();
applyRandomBackgrounds();
renderBoard();  // Initial render of the board


