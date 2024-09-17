const gameBoard = (() => {
  let gameBoardArray = ["", "", "", "", "", "", "", "", ""];
  let currentMark = "X";
  let gameOver = false;

  const winningCombinations = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];

  const render = () => {
    const container = document.querySelector(".tris-grid-container");
    container.innerHTML = "";

    for (let i = 0; i < gameBoardArray.length; i++) {
      let cell = document.createElement("div");
      cell.classList.add("square");
      cell.classList.add(`tris-grid-cell-${i}`);
      container.appendChild(cell);
    }
  };

  const handleClick = () => {
    let cells = document.querySelectorAll(".square");
    cells.forEach((cell, index) => {
      cell.addEventListener("click", () => {
        if (gameBoardArray[index] === "" && !gameOver) {
          console.log(`cell ${index} cliccato!`);
          gameBoardArray[index] = currentMark;
          cell.innerHTML = currentMark;

          if (checkWinner(currentMark)) {
            gameOver = true;
            const winnerName = game.getCurrentPlayer().name;
            document.querySelector(
              ".message"
            ).innerHTML = `${winnerName} (${currentMark}) has won!`;
          } else {
            game.nextPlayer();
          }
        }
      });
    });
  };

  const checkWinner = (mark) => {
    return winningCombinations.some((combination) => {
      return combination.every((index) => gameBoardArray[index] === mark);
    });
  };

  const setCurrentMark = (mark) => {
    currentMark = mark;
  };

  const setGameOver = (status) => {
    gameOver = status;
  };

  const resetBoard = () => {
    gameBoardArray = ["", "", "", "", "", "", "", "", ""];
    gameOver = false;
    render();
    handleClick();
  };

  return { render, handleClick, setCurrentMark, setGameOver, resetBoard };
})();

const createPlayer = (name, mark) => {
  return {
    name,
    mark,
  };
};

const game = (() => {
  let players = [];
  let currentPlayerIndex = 0;
  let gameOver = false;

  const startGame = () => {
    document.querySelector(".tris-grid-container").classList.remove("hidden");
    players = [
      createPlayer(document.querySelector(".player1-input").value, "X"),
      createPlayer(document.querySelector(".player2-input").value, "O"),
    ];
    currentPlayerIndex = 0;
    gameOver = false;

    gameBoard.setCurrentMark(players[currentPlayerIndex].mark);
    gameBoard.setGameOver(gameOver);
    gameBoard.render();
    gameBoard.handleClick();
  };

  const restartGame = () => {
    document.querySelector(".message").innerHTML = "";
    gameBoard.resetBoard();
    startGame();
  };

  const nextPlayer = () => {
    currentPlayerIndex = (currentPlayerIndex + 1) % players.length;
    gameBoard.setCurrentMark(players[currentPlayerIndex].mark);
  };

  const getCurrentPlayer = () => players[currentPlayerIndex];

  return { startGame, restartGame, nextPlayer, getCurrentPlayer, gameOver };
})();

const startGameBtn = document.querySelector("#start-game");
startGameBtn.addEventListener("click", () => {
  game.startGame();
});

const restartGameBtn = document.querySelector("#restart-game");
restartGameBtn.addEventListener("click", () => {
  game.restartGame();
});
