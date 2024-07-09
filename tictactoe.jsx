import React, { useState } from 'react';
import './App.css';

const INITIAL_STATE = {
  board: Array(9).fill(null),
  currentPlayer: 'X',
  winner: null,
};

const winLines = [
  [0, 1, 2], [3, 4, 5], [6, 7, 8], // Rows
  [0, 3, 6], [1, 4, 7], [2, 5, 8], // Columns
  [0, 4, 8], [2, 4, 6],            // Diagonals
];

const App = () => {
  const [state, setState] = useState(INITIAL_STATE);

  const handleCellClick = (index) => {
    if (state.board[index] || state.winner) return; // If cell is already filled or game is over, ignore click

    const newBoard = [...state.board];
    newBoard[index] = state.currentPlayer;

    const newWinner = checkWinner(newBoard, state.currentPlayer);

    setState({
      board: newBoard,
      currentPlayer: state.currentPlayer === 'X' ? 'O' : 'X',
      winner: newWinner,
    });
  };

  const checkWinner = (board, player) => {
    for (let i = 0; i < winLines.length; i++) {
      const [a, b, c] = winLines[i];
      if (board[a] === player && board[b] === player && board[c] === player) {
        return player;
      }
    }
    return null;
  };

  const resetGame = () => {
    setState(INITIAL_STATE);
  };

  const renderCell = (index) => {
    return (
      <div className="cell" onClick={() => handleCellClick(index)}>
        {state.board[index]}
      </div>
    );
  };

  const renderBoard = () => {
    return (
      <div className="board">
        {state.board.map((cell, index) => (
          <div key={index} className="cell-container">
            {renderCell(index)}
          </div>
        ))}
      </div>
    );
  };

  return (
    <div className="App">
      <h1>Tic Tac Toe</h1>
      <div className="status">
        {state.winner ? `Winner: ${state.winner}` : `Next Player: ${state.currentPlayer}`}
      </div>
      {renderBoard()}
      {state.winner && <button onClick={resetGame}>Restart Game</button>}
    </div>
  );
};

export default App;
