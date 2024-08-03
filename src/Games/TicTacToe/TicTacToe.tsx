import { useState, useEffect } from "react";
import Square from "./Square";

type Scores = {
  [key: string]: number;
};

const InitialGameState = ["", "", "", "", "", "", "", "", ""];
const InitialScores: Scores = { X: 0, O: 0 };
const WinningSequence = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
];

function TicTacToe() {
  const [gameState, setGameState] = useState(InitialGameState);
  const [currentPlayer, setCurrentPlayer] = useState("X");
  const [scores, setScores] = useState(InitialScores);

  useEffect(() => {
    const storedScores = localStorage.getItem("scores");
    if (storedScores) {
      setScores(JSON.parse(storedScores));
    }
  }, []);

  useEffect(() => {
    if (gameState === InitialGameState) {
      return;
    }

    checkForWinner();
  }, [gameState]);

  const resetBoard = () => setGameState(InitialGameState);

  const handleWin = () => {
    window.alert(`Congrats player ${currentPlayer}! You are the winner!`);

    const newPlayerScore = scores[currentPlayer] + 1;
    const newScores = { ...scores };
    newScores[currentPlayer] = newPlayerScore;
    setScores(newScores);
    localStorage.setItem("scores", JSON.stringify(newScores));

    resetBoard();
  };

  const handleDraw = () => {
    window.alert("The game ended in a draw");

    resetBoard();
  };

  const checkForWinner = () => {
    let roundWon = false;

    for (let i = 0; i < WinningSequence.length; i++) {
      const winCombo = WinningSequence[i];

      let a = gameState[winCombo[0]];
      let b = gameState[winCombo[1]];
      let c = gameState[winCombo[2]];

      if ([a, b, c].includes("")) {
        continue;
      }

      if (a === b && b === c) {
        roundWon = true;
        break;
      }
    }

    if (roundWon) {
      setTimeout(() => handleWin(), 500);
      return;
    }

    if (!gameState.includes("")) {
      setTimeout(() => handleDraw(), 500);
      return;
    }

    changePlayer();
  };

  const changePlayer = () => {
    setCurrentPlayer(currentPlayer === "X" ? "O" : "X");
  };

  const handleCellClick = (event: any) => {
    const cellIndex = Number(event.target.getAttribute("data-cell-index"));

    const currentValue = gameState[cellIndex];
    if (currentValue) {
      return;
    }

    const newValues = [...gameState];
    newValues[cellIndex] = currentPlayer;
    setGameState(newValues);
  };

  return (
    <div className="w-full min-h-svh space-y-10 bg-gradient-to-r from-cyan-500 to-blue-500 p-8">
      <h1 className="text-center text-5xl mb-4 font-display text-white">
        Tic Tac Toe
      </h1>
      <div>
        <div className="grid grid-cols-3 gap-3 lg:w-96 md:w-96 md:mx-auto lg:mx-auto">
          {gameState.map((player, index) => (
            <Square
              key={index}
              onClick={handleCellClick}
              {...{ index, player }}
            />
          ))}
        </div>

        <div className="text-2xl text-serif lg:w-96 lg:mx-auto">
          <p className="text-white mt-5">
            Next Player: <span>{currentPlayer}</span>
          </p>
          <p className="text-white mt-5">
            Player X wins: <span>{scores["X"]}</span>
          </p>
          <p className="text-white mt-5">
            Player O wins: <span>{scores["O"]}</span>
          </p>
        </div>
      </div>
    </div>
  );
}

export default TicTacToe;