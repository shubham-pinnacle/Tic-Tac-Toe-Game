import { useState } from 'react';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { motion } from 'framer-motion';

function Square({ value, onSquareClick, isWinning }) {
  return (
    <motion.button
      className={`square ${isWinning ? 'winning' : ''}`}
      onClick={onSquareClick}
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.9 }}
    >
      {value}
    </motion.button>
  );
}

export default function Board() {
  const [xIsNext, setXIsNext] = useState(true);
  const [squares, setSquares] = useState(Array(9).fill(null));
  const [winningSquares, setWinningSquares] = useState([]);
  const [moveHistory, setMoveHistory] = useState({ X: [], O: [] });

  function handleClick(i) {
    if (squares[i] || calculateWinner(squares).winner) return;

    const nextSquares = squares.slice();
    const player = xIsNext ? 'X' : 'O';
    nextSquares[i] = player;

    const updatedHistory = { ...moveHistory };
    updatedHistory[player] = [...updatedHistory[player], i];

    if (updatedHistory[player].length > 3) {
      const firstMove = updatedHistory[player].shift();
      nextSquares[firstMove] = null;
    }

    setSquares(nextSquares);
    setMoveHistory(updatedHistory);
    setXIsNext(!xIsNext);

    const result = calculateWinner(nextSquares);
    if (result.winner) {
      setWinningSquares(result.line);
      toast.success(`🎉 Winner: ${result.winner}!`, { position: 'top-center' });
    } else if (!nextSquares.includes(null)) {
      toast.info("🤝 It's a Tie!", { position: 'top-center' });
    }
  }

  function restartGame() {
    setSquares(Array(9).fill(null));
    setXIsNext(true);
    setWinningSquares([]);
    setMoveHistory({ X: [], O: [] });
    toast.info('🔄 Game Reset!', { position: 'top-center' });
  }

  const { winner, line } = calculateWinner(squares);
  let status;
  if (winner) {
    status = `Winner: ${winner}`;
  } else if (!squares.includes(null)) {
    status = "It's a Tie!";
  } else {
    status = `Next player: ${xIsNext ? 'X' : 'O'}`;
  }

  return (
    <>
      <ToastContainer />
      <h1 className="game-heading">Tic-Tac-Toe Game</h1>
      <div className="status">{status}</div>
      <div className="board">
        {[0, 1, 2].map((row) => (
          <div key={row} className="board-row">
            {[0, 1, 2].map((col) => {
              const index = row * 3 + col;
              return (
                <Square
                  key={index}
                  value={squares[index]}
                  onSquareClick={() => handleClick(index)}
                  isWinning={line && line.includes(index)}
                />
              );
            })}
          </div>
        ))}
      </div>
      <button className="restart-button" onClick={restartGame}>
        Restart Game
      </button>
    </>
  );
}

function calculateWinner(squares) {
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];
  for (let line of lines) {
    const [a, b, c] = line;
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return { winner: squares[a], line };
    }
  }
  return { winner: null, line: null };
}