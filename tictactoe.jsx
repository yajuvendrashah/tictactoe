import React, { useState } from 'react';
import './App.css';

const initialBoard = Array(9).fill(null);

const winLines = [
  [0, 1, 2], [3, 4, 5], [6, 7, 8], 
  [0, 3, 6], [1, 4, 7], [2, 5, 8], 
  [0, 4, 8], [2, 4, 6]             
];

const App = () => {
  const [board, setBoard] = useState(initialBoard);
  const [currentPlayer, setCurrentPlayer] = useState('X');
  const [winner, setWinner] = useState(null);
  const [isGameOver, setIsGameOver] = useState(false);

  const handleCellClick = (index) => {
    if (board[index] || winner) return; // If cell is already filled or game is over, ignore click

    const newBoard = [...board];
    newBoard[index] = currentPlayer;
    setBoard(newBoard);

    const newWinner = checkWinner(newBoard, currentPlayer);
    if (newWinner) {
      setWinner(newWinner);
      setIsGameOver(true);
    } else if (newBoard.every(cell => cell !== null)) {
      setIsGameOver(true); // If board is full and no winner, it's a tie
    } else {
      setCurrentPlayer(currentPlayer === 'X' ? 'O' : 'X');
    }
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

  const restartGame = () => {
    setBoard(initialBoard);
    setCurrentPlayer('X');
    setWinner(null);
    setIsGameOver(false);
  };

  const renderCell = (index) => {
    return (
      <div className="cell" onClick={() => handleCellClick(index)}>
        {board[index]}
      </div>
    );
  };

  return (
    <div className="App">
      <h1>Tic Tac Toe</h1>
      <div className="board">
        {board.map((cell, index) => (
          <div key={index} className="cell-container">
            {renderCell(index)}
          </div>
        ))}
      </div>
      <div className="status">
        {winner ? `Winner: ${winner}` : isGameOver ? "It's a tie!" : `Next Player: ${currentPlayer}`}
      </div>
      <button onClick={restartGame}>Restart Game</button>
    </div>
  );
};

export default App;
