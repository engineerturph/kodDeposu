'use strict';
/*
let guessingWords = document.querySelector(`.message`);

guessingWords.textContent = `Correct number!`;

document.querySelector(`.number`).textContent = 13;
document.querySelector(`.score`).textContent = 20;

document.querySelector(`.guess`).value = `00`;
console.log(document.querySelector(`.guess`).value);

const secretNum = Math.trunc(Math.random() * 20) + 1;
document.querySelector(`.number`).textContent = secretNum;
let score = 20;


let checkButton = document.querySelector(`.check`);
checkButton.addEventListener(`click`, function () {
  let guess = Number(document.querySelector(`.guess`).value);
  console.log(guess);
  if (score > 1) {
    //no input
    if (!guess) {
      document.querySelector(`.message`).textContent = `⛔ No number!`;
    } //high num
    else if (guess > secretNum) {
      score--;
      document.querySelector(`.message`).textContent = `🙂 Too high!`;
      document.querySelector(`.score`).textContent = score;
      //low num
    } else if (guess < secretNum) {
      score--;
      document.querySelector(`.message`).textContent = `🙃 Too low!`;
      document.querySelector(`.score`).textContent = score;
      //win
    } else if (guess === secretNum) {
      document.querySelector(`body`).style.backgroundColor = `rgb(70, 26, 128)`;
      document.querySelector(`.number`).style.width = `30rem`;
      document.querySelector(`.message`).textContent = `🥳 Correct number!`;
    }
    //lose
  } else {
    document.querySelector(`.message`).textContent = `🎃 You lost`;
    document.querySelector(`.score`).textContent = 0;
  }
});
*/

let secretNum = Math.trunc(Math.random() * 20) + 1;
let score = 20;
let highscore = 0;
let gameWin = false;
const dMessage = function (message) {
  document.querySelector(`.message`).textContent = message;
};

let checkButton = document.querySelector(`.check`);
let againButton = document.querySelector(`.again`);
checkButton.addEventListener(`click`, function () {
  let guess = Number(document.querySelector(`.guess`).value);
  console.log(guess);
  //guesses
  if (score > 1 && !gameWin) {
    //no input
    if (!guess) {
      dMessage(`⛔ No input!`);
      //wrong input
    } else if (guess != secretNum) {
      score--;
      dMessage(guess > secretNum ? `⏬ Too high!` : `🔼 Too low!`);
    }
    //win
    else if (guess === secretNum) {
      document.querySelector(`body`).style[
        `background-color`
      ] = `rgb(70, 26, 128)`;
      dMessage(`🎉 Correct number!`);
      document.querySelector(`.number`).textContent = secretNum;
      document.querySelector(`.number`).style.width = `30rem`;
      gameWin = true;
      document.querySelector(`.score`).textContent = score;
      if (score > highscore) {
        highscore = score;
        document.querySelector(`.highscore`).textContent = highscore;
      } else {
      }
    }
    document.querySelector(`.score`).textContent = score;
  } else if (gameWin) {
  }
  //lose + ending
  else {
    dMessage(`🎃 You lost`);
    document.querySelector(`.score`).textContent = 0;
  }
  // highscore
});
//restarting the game
againButton.addEventListener(`click`, function () {
  // resetting declarations
  secretNum = Math.trunc(Math.random() * 20) + 1;
  score = 20;
  gameWin = false;
  // resetting page
  document.querySelector(`body`).style[`background-color`] = `#222`;
  document.querySelector(`.number`).style.width = `15rem`;
  dMessage(`Start guessing...`);
  document.querySelector(`.score`).textContent = score;
  document.querySelector(`.guess`).value = ``;
  document.querySelector(`.number`).textContent = `?`;
});
