import styles from "./index.module.scss";
import { useNavigate } from "react-router-dom";
import { useState, useEffect, useCallback } from "react";
import { randomFigure } from "../../FigureGeometriche";
import { AiFillCaretLeft, AiFillCaretRight } from "react-icons/ai";

const Tetris = () => {
  // Hook di React Router per la navigazione
  const navigate = useNavigate();
  // Funzioni per la navigazione
  const goOnHome = () => navigate("/");
  const goOnCampoMinato = () => navigate("/campominato");

  // Stato per la scacchiera: una matrice 10x10 inizializzata con null
  const [scacchiera, setScacchiera] = useState(
    Array.from({ length: 10 }, () => Array(10).fill(null))
  );
  // Stato per la figura corrente
  const [currentFigure, setCurrentFigure] = useState(null);
  // Stato per la posizione corrente della figura
  const [position, setPosition] = useState({ x: 3, y: 0 });
  // Stato per il punteggio
  const [counter, setCounter] = useState(0);
  // Stato per indicare se il gioco è terminato
  const [gameOver, setGameOver] = useState(false);

  // Funzione per verificare le collisioni
  const hasCollision = useCallback((newPosition, figure = currentFigure) => {
    if (!figure) return false;
    for (let y = 0; y < figure.forma.length; y++) {
      for (let x = 0; x < figure.forma[y].length; x++) {
        if (figure.forma[y][x]) {
          const newY = newPosition.y + y;
          const newX = newPosition.x + x;
          if (
            newY >= scacchiera.length ||
            newX < 0 ||
            newX >= scacchiera[0].length ||
            (newY >= 0 && scacchiera[newY][newX] !== null)
          ) {
            return true;
          }
        }
      }
    }
    return false;
  }, [currentFigure, scacchiera]);

  // Funzione per unire la figura corrente alla scacchiera
  const mergeFigure = useCallback(() => {
    if (!currentFigure) return;
    setScacchiera((prevScacchiera) => {
      const newScacchiera = prevScacchiera.map((row) => [...row]);
      currentFigure.forma.forEach((row, y) => {
        row.forEach((cell, x) => {
          if (cell && position.y + y >= 0 && position.y + y < 10) {
            newScacchiera[position.y + y][position.x + x] = currentFigure.color;
          }
        });
      });
      return newScacchiera;
    });
  }, [currentFigure, position]);

  // Funzione per controllare e rimuovere le righe complete
  const checkCompleteRows = useCallback(() => {
    setScacchiera((prevScacchiera) => {
      const newScacchiera = prevScacchiera.filter((row) => !row.every((cell) => cell !== null));
      const completedRows = prevScacchiera.length - newScacchiera.length;
      setCounter((prevCounter) => prevCounter + completedRows * 100);
      while (newScacchiera.length < 10) {
        newScacchiera.unshift(Array(10).fill(null));
      }
      return newScacchiera;
    });
  }, []);

  // Funzione per muovere la figura verso il basso
  const moveDown = useCallback(() => {
    if (gameOver) return;
    
    const newPosition = { ...position, y: position.y + 1 };
    if (!hasCollision(newPosition)) {
      setPosition(newPosition);
    } else {
      mergeFigure();
      checkCompleteRows();
      const newFigure = randomFigure();
      const newStartPosition = { x: 3, y: 0 };
      if (hasCollision(newStartPosition, newFigure)) {
        setGameOver(true);
      } else {
        setCurrentFigure(newFigure);
        setPosition(newStartPosition);
      }
    }
  }, [position, hasCollision, mergeFigure, checkCompleteRows, gameOver]);

  // Effetto per gestire il movimento automatico verso il basso
  useEffect(() => {
    if (currentFigure && !gameOver) {
      const id = setInterval(moveDown, 1000);
      return () => clearInterval(id);
    }
  }, [currentFigure, moveDown, gameOver]);

  // Funzione per iniziare o ricominciare il gioco
  const startGame = () => {
    setScacchiera(Array.from({ length: 10 }, () => Array(10).fill(null)));
    setCounter(0);
    setGameOver(false);
    const newFigure = randomFigure();
    setCurrentFigure(newFigure);
    setPosition({ x: 3, y: 0 });
  };

  // Funzione per muovere la figura a sinistra
  const moveLeft = () => {
    if (gameOver) return;
    const newPosition = { ...position, x: position.x - 1 };
    if (!hasCollision(newPosition)) {
      setPosition(newPosition);
    }
  };

  // Funzione per muovere la figura a destra
  const moveRight = () => {
    if (gameOver) return;
    const newPosition = { ...position, x: position.x + 1 };
    if (!hasCollision(newPosition)) {
      setPosition(newPosition);
    }
  };

  // Funzione per renderizzare la scacchiera
  const renderScacchiera = () => {
    const grid = scacchiera.map((row, y) =>
      row.map((cell, x) => (
        <div
          key={`${y}-${x}`}
          className={`${styles.scacchiera} ${cell ? styles.filled : ""}`}
          style={{
            
            backgroundColor: cell ? `rgb(${cell})` : " #07001e",
          }}
        />
      ))
    );

    if (currentFigure) {
      currentFigure.forma.forEach((row, y) => {
        row.forEach((cell, x) => {
          if (cell && position.y + y >= 0 && position.y + y < 10 && position.x + x >= 0 && position.x + x < 10) {
            grid[position.y + y][position.x + x] = (
              <div
                key={`current-${position.y + y}-${position.x + x}`}
                className={`${styles.scacchiera} ${styles.filled}`}
                style={{
                  
                  backgroundColor: `rgb(${currentFigure.color})`,
                }}
              />
            );
          }
        });
      });
    }

    return grid;
  };

  // Rendering del componente
  return (
    <div className={styles.container}>
      <button className={styles.toGoHome} onClick={goOnHome}>Home</button>
      <button className={styles.toGoCampominato} onClick={goOnCampoMinato}>Campo Minato</button>
      <button onClick={moveLeft} className={styles.btnLeft}><AiFillCaretLeft/></button>
      <button onClick={moveRight} className={styles.btnRight}><AiFillCaretRight/></button>
      <h1 className={styles.title}>Tetris</h1>
      <div className={styles.punti}>
        <h2 className={styles.title}>Score</h2>
        <h2 className={styles.counter}>{counter}</h2>
      </div>
      <div className={styles.contanierScacchiera}>
        {renderScacchiera()}
       
        {gameOver && (
          <div className={styles.gameOverOverlay}>
            <h2>Game Over</h2>
            <p>Punteggio finale: {counter}</p>
            <button onClick={startGame}>Ricomincia</button>
          </div>
        )}
      </div>
      <button onClick={startGame} className={styles.btnGameStart}>
        {gameOver ? "Ricomincia" : "Comincia a giocare"}
      </button>
    </div>
  );
};

export default Tetris;