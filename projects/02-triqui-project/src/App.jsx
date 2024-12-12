import { useState } from 'react';
import confetti from 'canvas-confetti';
import './App.css';

// Constantes para saber de quien es el turno
const TURNS = {
  player1: 'X',
  player2: 'O',
};

// Componente para renderizar un cuadro del tablero
const Square = ({ children, isSelected, updateBoard, index }) => {
  // Clase que se le asigna al cuadro(si esta seleccionado o no)
  const className = `square ${isSelected ? 'is-selected' : ''}`;

  const handleClick = () => {
    // Cuando el usuario haga click se pasa el index del cuadro seleccionado
    updateBoard(index);
  };

  // Cuando el usuario haga click en un cuadro, se debe llamar a la funcion updateBoard
  return (
    <div
      onClick={handleClick}
      className={className}
    >
      {children}
    </div>
  );
};

// Combinaciones ganadoras
const WINNER_COMBINATIONS = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
];

function App() {
  // Estado para saber el estado del tablero
  const [board, setBoard] = useState(Array(9).fill(null));

  // Estado para saber de quien es el turno
  const [turn, setTurn] = useState(TURNS.player1);

  // Estado para saber si hay un ganador, null si no hay ganador, false si hay empate
  const [winner, setWinner] = useState(null);

  // Funcion para saber si hay un ganador
  const checkWinner = (boardToCheck) => {
    // Recorrer todas las combinaciones ganadoras
    for (const combination of WINNER_COMBINATIONS) {
      // Recuperar las posicion de la combinacion ganadora
      const [a, b, c] = combination;
      // Si las posiciones de la combinacion ganadora son iguales, retornar el valor de la posicion
      if (
        boardToCheck[a] &&
        boardToCheck[a] === boardToCheck[b] &&
        boardToCheck[a] === boardToCheck[c]
      ) {
        return boardToCheck[a];
      }
    }
    // Si no hay un ganador, retornar null
    return null;
  };

  const resetGame = () => {
    // Reiniciar el estado del tablero
    setBoard(Array(9).fill(null));

    // Reiniciar el estado del turno
    setTurn(TURNS.player1);

    // Reiniciar el estado del ganador
    setWinner(null);
  };

  // Funcion para saber si hay empate
  const checkEndGame = (newBoard) => {
    // Si no hay un ganador y no hay espacios vacios, retornar true
    return newBoard.every((square) => square !== null);
  };

  // Funcion para actualizar el estado del tablero
  const updateBoard = (index) => {
    // Si el cuadro ya esta ocupado, o ya hay un ganador, no hacer nada
    if (board[index] || winner) {
      return;
    }

    // Crear un nuevo tablero con el cuadro seleccionado
    const newBoard = board.map((square, i) => {
      if (i === index) {
        return turn;
      }
      return square;
    });

    // Actualizar el estado del tablero
    setBoard(newBoard);

    // Cambiar el turno
    setTurn(turn === TURNS.player1 ? TURNS.player2 : TURNS.player1);

    // Revisar si hay un ganador
    const newWinner = checkWinner(newBoard);
    if (newWinner) {
      // Si hay un ganador, actualizar el estado del ganador
      confetti();
      setWinner(newWinner);
    } else if (checkEndGame(newBoard)) {
      // Si no hay un ganador, revisar si hay empate
      setWinner(false);
    }
  };

  return (
    <main className='board'>
      <h1>Triqui Game</h1>
      {/* Seccion de Juego */}
      <button onClick={resetGame}>Resetear el juego</button>
      <section className='game'>
        {board.map((square, index) => {
          return (
            // Cuando se haga click en un cuadro se debe actualizar el estado del tablero
            <Square
              key={index}
              index={index}
              updateBoard={updateBoard}
            >
              {square}
            </Square>
          );
        })}
      </section>

      {/* Seccion para los turnos. Mostrar el turno actual */}
      <section className='turn'>
        {/* Cuando el estado del turno sea player1, se debe mostrar el texto "Turno de X" */}
        <Square isSelected={turn === TURNS.player1}>{TURNS.player1}</Square>
        <Square isSelected={turn === TURNS.player2}>{TURNS.player2}</Square>
      </section>

      {winner != null && (
        <section className='winner'>
          <div className='text'>
            <h2>{winner === false ? 'Empate' : `Ganador: `}</h2>

            <header className='win'>
              {winner && <Square>{winner}</Square>}
            </header>

            <footer>
              <button onClick={resetGame}>Empezar de nuevo</button>
            </footer>
          </div>
        </section>
      )}
    </main>
  );
}

export default App;
