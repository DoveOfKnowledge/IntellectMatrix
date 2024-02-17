import { useParams} from 'react-router-dom';
import React, { useState, useEffect } from 'react';


export const MatrixThree = () => {
  const [question, setQuestion] = useState({});
  const [playerTurn, setPlayerTurn] = useState(1);
  const { roomID } = useParams();

  useEffect(() => {
    fetchQuestion();
  }, []);

  const fetchQuestion = async () => {
    try {
      const response = await fetch('/api/quiz/turn');
      const data = await response.json();
      setQuestion(data);
    } catch (error) {                                                             
      console.error('Error fetching question:', error);
    }
  };

  const updatePlayerTurn = async () => {
    try {
      const response = await fetch('/api/tictactoe/turn', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
      });
      const data = await response.json();
      setPlayerTurn(data.turn);
      fetchQuestion();
    } catch (error) {
      console.error('Error updating player turn:', error);
    }
  };

  const handlePlayerMove = (newBoard) => {
    // Implement logic for handling player moves
    // You may want to send the updated board to the server for validation
    // and then call updatePlayerTurn() if the move is valid.
  };

  const handleAnswerSubmit = (selectedOption) => {
    // Implement logic for handling answer submission
    // You may want to send the selectedOption to the server for validation
    // and then call updatePlayerTurn() if the answer is correct.
  };

  return (
    <div className="App">
      <Quiz fetchQuestion={fetchQuestion} onAnswerSubmit={handleAnswerSubmit} />
      <TicTacToe playerTurn={playerTurn} onPlayerMove={handlePlayerMove} />
    </div>
  );
};

