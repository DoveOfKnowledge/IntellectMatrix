import React, { useState, useEffect } from 'react';

export const Quiz = ({ question, playerTurn, fetchQuestion }) => {
  const [answer, setAnswer] = useState('');
  const [timeLeft, setTimeLeft] = useState(30);

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prevTime) => prevTime - 1);
    }, 1000);

    if (timeLeft === 0) {
      // Handle time limit exceeded
      alert('Time limit exceeded. Next turn.');
      fetchQuestion();
      setTimeLeft(30);
    }

    return () => clearInterval(timer);
  }, [timeLeft, fetchQuestion]);

  const handleAnswer = () => {
    // Check if the answer is correct
    if (answer.toLowerCase() === question.options[question.correctOptionIndex].toLowerCase()) {
      alert('Correct answer! You get to make a move on Tic Tac Toe.');
      // Update player turn
      updatePlayerTurn();
    } else {
      alert('Incorrect answer! Next turn.');
      // Fetch a new question
      fetchQuestion();
      // Reset timer
      setTimeLeft(30);
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
      // Fetch a new question
      fetchQuestion();
      // Reset timer
      setTimeLeft(30);
    } catch (error) {
      console.error('Error updating player turn:', error);
    }
  };

  return (
    <div>
      <h2>Quiz</h2>
      <p>{question.question}</p>
      {question.options.map((option, index) => (
        <div key={index}>
          <input
            type="radio"
            id={`option${index}`}
            name="answer"
            value={option}
            checked={answer === option}
            onChange={() => setAnswer(option)}
          />
          <label htmlFor={`option${index}`}>{option}</label>
        </div>
      ))}
      <button onClick={handleAnswer}>Submit Answer</button>
      <p>Time Left: {timeLeft}s</p>
    </div>
  );
};

