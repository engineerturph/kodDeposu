'use strict';

// Selecting elements

const diceEl = document.querySelector(`.dice`);
const newButEl = document.querySelector(`.btn--new`);
const rollButEl = document.querySelector(`.btn--roll`);
const holdButEl = document.querySelector(`.btn--hold`);
const scoresEl = document.querySelectorAll(`.score`);
const players = document.querySelectorAll(`.player`);
const currentScoreEls = document.querySelectorAll(`.current-score`);

// // Starting conditions (later we make it as init)
// let player = 0;
// let totalScores = [0, 0];
// let currentScores = [0, 0];
// scores[0].textContent = 0;
// scores[1].textContent = 0;
// diceEl.classList.add(`hidden`);
// let gameStatus = true;

//Starting the game
let player, totalScores, currentScores, gameStatus;
const init = function () {
  player = 0;
  totalScores = [0, 0];
  currentScores = [0, 0];
  scoresEl[0].textContent = 0;
  scoresEl[1].textContent = 0;
  diceEl.classList.add(`hidden`);
  gameStatus = true;
  players[0].classList.remove(`player--winner`);
  players[1].classList.remove(`player--winner`);
  currentScoreEls[0].textContent = 0;
  currentScoreEls[1].textContent = 0;
  players[0].classList.add(`player--active`);
  players[1].classList.remove(`player--active`);
};
const switchPlayer = function () {
  currentScoreEls[player].textContent = 0;
  currentScores = [0, 0];
  players[0].classList.toggle(`player--active`);
  players[1].classList.toggle(`player--active`);
  player = player === 0 ? 1 : 0;
};
init();

// Rolling the dice
rollButEl.addEventListener(`click`, function () {
  if (gameStatus) {
    // generate random number
    let dice = Math.trunc(Math.random() * 6) + 1;
    // display
    diceEl.classList.remove(`hidden`);
    diceEl.src = `dice-${dice}.png`;
    // adding score for each players
    if (dice !== 1) {
      currentScores[player] += dice;
      currentScoreEls[player].textContent = currentScores[player];
    } // if rolled 1 switch and reset numbers
    else if (dice === 1) {
      switchPlayer();
    }
  } else {
  }
});
//holding current score
holdButEl.addEventListener(`click`, function () {
  if (gameStatus) {
    totalScores[player] += currentScores[player];
    scoresEl[player].textContent = totalScores[player];
    if (totalScores[player] >= 100) {
      players[player].classList.toggle(`player--winner`);
      gameStatus = false;
      diceEl.classList.add(`hidden`);
    } else {
      switchPlayer();
    }
  }
});

// winning game

newButEl.addEventListener(`click`, init);
