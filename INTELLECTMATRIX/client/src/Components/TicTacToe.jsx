import React, { useState, useEffect } from 'react';

export const TicTacToe = ({ playerTurn }) => {
  const initialBoard = Array(9).fill(null);
  const [board, setBoard] = useState(initialBoard);
  const [winner, setWinner] = useState(null);

  useEffect(() => { 
    // Check for a winner on each move
    checkWinner();
  }, [board]);

  const handleCellClick = (index) => {
    // Check if the cell is already filled or if there's a winner
    if (board[index] || winner) return;

    // Update the board with the current player's sign
    const updatedBoard = [...board];
    updatedBoard[index] = playerTurn % 2 === 1 ? 'X' : 'O';
    setBoard(updatedBoard);
  };

  const checkWinner = () => {
    const winningPatterns = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6],
    ];

    for (const pattern of winningPatterns) {
      const [a, b, c] = pattern;
      if (board[a] && board[a] === board[b] && board[a] === board[c]) {
        setWinner(board[a]);
        alert(`Player ${board[a]} wins!`);
        // You may want to reset the game or redirect to a new page here
        break;
      }
    }
  };

  return (
    <div>
      <h2>Tic Tac Toe</h2>
      <p>Player {playerTurn}'s turn</p>
      <div className="board">
        {board.map((cell, index) => (
          <div key={index} className="cell" onClick={() => handleCellClick(index)}>
            {cell}
          </div>
        ))}
      </div>
      {winner && <p>Winner: {winner}</p>}
    </div>
  );
};

