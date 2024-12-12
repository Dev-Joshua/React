import { useState } from 'react';
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

function App() {
  // Estado para saber el estado del tablero
  const [board, setBoard] = useState(Array(9).fill(null));

  // Estado para saber de quien es el turno
  const [turn, setTurn] = useState(TURNS.player1);

  // Funcion para actualizar el estado del tablero
  const updateBoard = (index) => {
    // Si el cuadro ya esta ocupado, no se debe hacer nada
    if (board[index]) {
      return;
    }

    // Crear un nuevo tablero con el cuadro seleccionado
    const newBoard = board.map((value, i) => {
      if (i === index) {
        return turn;
      }
      return value;
    });

    // Actualizar el estado del tablero
    setBoard(newBoard);

    // Cambiar el turno
    setTurn(turn === TURNS.player1 ? TURNS.player2 : TURNS.player1);
  };

  return (
    <main className='board'>
      <h1>Triqui Game</h1>
      <section className='game'>
        {board.map((_, index) => {
          return (
            // Cuando se haga click en un cuadro se debe actualizar el estado del tablero
            <Square
              key={index}
              index={index}
              updateBoard={updateBoard}
            >
              {board[index]}
            </Square>
          );
        })}
      </section>
      {/* Mostrar el turno actual */}
      <section className='turn'>
        {/* Cuando el estado del turno sea player1, se debe mostrar el texto "Turno de X" */}
        <Square isSelected={turn === TURNS.player1}>{TURNS.player1}</Square>
        <Square isSelected={turn === TURNS.player2}>{TURNS.player2}</Square>
      </section>
    </main>
  );
}

export default App;
