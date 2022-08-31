"use strict";

const gameBoard = (() => {
  const header = document.querySelector(".header");
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

  const renderScore = function () {
    for (let i = 0; i < scoreArr.length; i++) {
      const gridElement = document.querySelector(`.grid-${i}`);
      gridElement.textContent = scoreArr[i];
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
          header.textContent = "";
          e.target.classList.add("fade-in");
          scoreArr[e.target.dataset.index] = checkActive().mark;
          renderScore();
          checkWin();
          toggleActive();
          displayController.displayReset();
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

    // If every element of an element of the win array is in an X's or an O's array, then it will be a win situation)

    for (const el of winArray) {
      if (el.every((val) => XsArray.includes(val))) {
        displayController.addColorWin(el);
        displayController.displayWinMsg("X");
        return "X";
      }

      if (el.every((val) => OsArray.includes(val))) {
        displayController.addColorWin(el);
        displayController.displayWinMsg("O");

        return "O";
      }
    }

    //check for draw

    const filteredArray = scoreArr.filter((el) => el !== undefined);
    if (filteredArray.length === 9) {
      displayController.displayWinMsg("X");

      return "draw";
    }
  };

  const resetBtn = document.querySelector(".reset");

  const resetGame = function () {
    const gridElArr = document.querySelectorAll(".grid");

    resetBtn.addEventListener("click", function () {
      const newArray = new Array(9);
      scoreArr = newArray;
      renderScore();
      resetBtn.classList.toggle("show-reset");
      displayController.removeFade();
      gridElArr.forEach((el) => el.classList.remove("color-win"));
    });
  };

  resetGame();

  return { checkWin, scoreArr, resetBtn, header };
})();

const displayController = (() => {
  const displayReset = function () {
    if (gameBoard.checkWin()) {
      gameBoard.resetBtn.classList.toggle("show-reset");
    }
  };

  const addColorWin = function (arr) {
    for (let i = 0; i < arr.length; i++) {
      const gridEl = document.querySelector(`.grid-${arr[i]}`);
      gridEl.classList.add("color-win");
    }
  };

  const printHeader = function (str) {
    gameBoard.header.textContent = str;
  };

  const displayWinMsg = function (winner) {
    if (winner === "X") printHeader("X is the winner! Another game?");
    if (winner === "O") printHeader("O is the winner! Another game?");
    if (winner === "draw") printHeader("It's a draw! Another game?");
  };

  const removeFade = function () {
    for (let i = 0; i < gameBoard.scoreArr.length; i++) {
      const gridElement = document.querySelector(`.grid-${i}`);
      gridElement.classList.remove("fade-in");
    }
  };

  return { displayReset, addColorWin, displayWinMsg, removeFade };
})();
