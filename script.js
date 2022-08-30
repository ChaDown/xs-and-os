"use strict";
const gameDisplay = document.querySelector(".game-board");

const gameBoard = (() => {
  // create scoreArr
  let scoreArr = new Array(9);

  // Create 2 Players
  const playerFactory = (name, mark, active) => {
    return { name, mark, active };
  };

  const player1 = playerFactory("Player 1", "X", true);
  const player2 = playerFactory("Player 2", "O", false);

  // Possible win combinations (Array from 0-8, left to right, top to bottom, e.g top row is 0,1,2

  const winArray = [
    [0, 1, 2],
    [0, 4, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 4, 6],
    [2, 5, 8],
    [3, 4, 5],
    [6, 7, 8],
  ];

  const renderScore = function (arr) {
    for (let i = 0; i < arr.length; i++) {
      const gridElement = document.querySelector(`.grid-${i}`);
      gridElement.textContent = arr[i];
    }
  };

  const checkActive = function () {
    if (player1.active === true) return player1;
    if (player2.active === true) return player2;
  };

  const toggleActive = function () {
    player1.active = !player1.active;
    player2.active = !player2.active;
  };

  // Gameplay - Player takes a turn, scoreArr updated, box fills with their mark, check for win, player turn changes.
  const playGame = function () {
    for (let i = 0; i < scoreArr.length; i++) {
      const gridElement = document.querySelector(`.grid-${i}`);

      gridElement.addEventListener("click", function (e) {
        if (!e.target.textContent && !checkWin()) {
          scoreArr[e.target.dataset.index] = checkActive().mark;
          renderScore(scoreArr);
          checkWin();
          toggleActive();
        }
      });
    }
  };

  playGame();

  // function to get an array of indexes of Xs or Os to check win
  const getIndexArr = function (arr, mark) {
    const indexArr = [];
    arr.forEach((el, index) => (el === mark ? indexArr.push(index) : null));
    return indexArr;
  };

  // Check if scoreArr matches any win array elements
  const checkWin = function () {
    const XsArray = getIndexArr(scoreArr, "X");
    const OsArray = getIndexArr(scoreArr, "O");

    for (const el of winArray) {
      if (el.every((val) => XsArray.includes(val))) return player1;
      if (el.every((val) => OsArray.includes(val))) return player2;
    }
  };

  return { checkWin, scoreArr, player1, player2 };
})();

// const displayController = (() => {

//   renderScore(gameBoard.scoreArr);

//   return { renderScore, markSelection };
// })();
