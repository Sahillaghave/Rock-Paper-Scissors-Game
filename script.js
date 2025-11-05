const modeSelection = document.getElementById("mode-selection");
const gameScreen = document.getElementById("game-screen");
const vsComputerBtn = document.getElementById("vs-computer");
const twoPlayersBtn = document.getElementById("two-players");
const backBtn = document.getElementById("back");
const resetBtn = document.getElementById("reset");
const resultText = document.getElementById("result");
const leftHand = document.querySelector(".left-hand");
const rightHand = document.querySelector(".right-hand");
const choicebtn1 = document.querySelectorAll(".choice1");
const choicebtn2 = document.querySelectorAll(".choice2");

const clickSound = document.getElementById("click-sound");
const winSound = document.getElementById("win-sound");
const tieSound = document.getElementById("tie-sound");
const loseSound = document.getElementById("lose-sound");

let gameMode = "computer";
let p1Score = 0;
let p2Score = 0;
let player1Name = "Player 1";
let player2Name = "Computer";

const p1ScoreEl = document.getElementById("p1-score");
const p2ScoreEl = document.getElementById("p2-score");

// Update score
function updateScore() {
  p1ScoreEl.innerHTML = p1Score;
  p2ScoreEl.innerHTML = p2Score;
}

// Animate hands
function animateHands() {
  leftHand.classList.add("animate-left");
  rightHand.classList.add("animate-right");
  setTimeout(() => {
    leftHand.classList.remove("animate-left");
    rightHand.classList.remove("animate-right");
  }, 1200);
}

// Winner logic
function winning(p1, p2) {
  if (p1 === p2) return "tie";
  if (
    (p1 === "rock" && p2 === "scissors") ||
    (p1 === "paper" && p2 === "rock") ||
    (p1 === "scissors" && p2 === "paper")
  ) {
    return "p1";
  }
  return "p2";
}

// Display result
function displayWin(winner, p1, p2) {
  if (winner === "p1") {
    winSound.play();
    resultText.innerHTML = `🎉 ${player1Name} Wins! (${p1} beats ${p2})`;
    p1Score++;
  } else if (winner === "p2") {
    if (gameMode === "computer") loseSound.play();
    else winSound.play();
    resultText.innerHTML = `💻 ${player2Name} Wins! (${p2} beats ${p1})`;
    p2Score++;
  } else {
    tieSound.play();
    resultText.innerHTML = "🤝 It's a Tie!";
  }
  updateScore();
}

// -------------------------
// 🎮 Game Modes
// -------------------------

function startVsComputer() {
  player1Name = prompt("Enter Player 1 Name:") || "Player 1";
  player2Name = "Computer";

  document.getElementById("player-label").innerText = player1Name;
  document.getElementById("opponent-label").innerText = player2Name;

  choicebtn1.forEach((btn) => {
    btn.onclick = (event) => {
      clickSound.play();
      const Player1choice = event.target.id;
      const choices = ["rock", "paper", "scissors"];
      const computerChoice = choices[Math.floor(Math.random() * 3)];
      animateHands();
      setTimeout(() => {
        const winner = winning(Player1choice, computerChoice);
        displayWin(winner, Player1choice, computerChoice);
      }, 1800);
    };
  });
}

function startTwoPlayers() {
  player1Name = prompt("Enter Player 1 Name:") || "Player 1";
  player2Name = prompt("Enter Player 2 Name:") || "Player 2";

  document.getElementById("player-label").innerText = player1Name;
  document.getElementById("opponent-label").innerText = player2Name;

  let Player1choice = null;
  resultText.innerHTML = `${player1Name}, make your move!`;

  choicebtn1.forEach((btn) => {
    btn.onclick = (event) => {
      clickSound.play();
      Player1choice = event.target.id;
      resultText.innerHTML = `${player2Name}, now your turn!`;
      for(let b of choicebtn1){
        b.classList.remove("choice1");
      }
      for(let b of choicebtn2){
        b.classList.add("choice1");
      }
    };
  });

  choicebtn2.forEach((btn) => {
    btn.onclick = (event) => {
      if (!Player1choice) {
        resultText.innerHTML = `${player1Name} must choose first!`;
        return;
      }
      clickSound.play();
      const Player2choice = event.target.id;
      animateHands();
      setTimeout(() => {
        const winner = winning(Player1choice, Player2choice);
        displayWin(winner, Player1choice, Player2choice);
        Player1choice = null;
      }, 1800);
        for(let b of choicebtn2){
        b.classList.remove("choice1");
      }
      for(let b of choicebtn1){
        b.classList.add("choice1");
      }
    };
  });
}

// -------------------------
// 🔘 Buttons
// -------------------------

vsComputerBtn.addEventListener("click", () => {
  gameMode = "computer";
  modeSelection.classList.add("hidden");
  gameScreen.classList.remove("hidden");
  resultText.innerHTML = "Your Turn!";
  startVsComputer();
});

twoPlayersBtn.addEventListener("click", () => {
  gameMode = "twoplayer";
  modeSelection.classList.add("hidden");
  gameScreen.classList.remove("hidden");
  startTwoPlayers();
});

backBtn.addEventListener("click", () => {
  modeSelection.classList.remove("hidden");
  gameScreen.classList.add("hidden");
  resultText.innerHTML = "";
  p1Score = 0;
  p2Score = 0;
  updateScore();

  // Remove all click handlers (prevents double event bug)
  choicebtn1.forEach(btn => btn.onclick = null);
  choicebtn2.forEach(btn => btn.onclick = null);
});

resetBtn.addEventListener("click", () => {
  p1Score = 0;
  p2Score = 0;
  updateScore();
  resultText.innerHTML = "";
});
