
import styles from "./index.module.scss";
import { useState, useEffect } from "react";

const CampoMinato = () => {
  const [cells, setCells] = useState(Array(100).fill(false)); // Array per tenere traccia delle caselle cliccate
  const [bombIndexes, setBombIndexes] = useState([]);
  const [gameOver, setGameOver] = useState(false);
  const [counter, setCounter] = useState(0);
  const [youWin, setYouWin] = useState(false);
  const [clickedCells, setClickedCells] = useState(Array(100).fill(false)); // Array per tenere traccia delle celle già cliccate


  //funzione che controlla se una cella è stata cliccata se non lo è aumenta 
  //il punteggio altrimenti no
  const incrementScore = (index) => {
    if (!clickedCells[index]) {
      setCounter((prevCounter) => prevCounter + 1000);
      setClickedCells((prevClickedCells) => {
        const updatedClickedCells = [...prevClickedCells];
        updatedClickedCells[index] = true;
        return updatedClickedCells;
      });
    }
  };

  useEffect(() => {
    setBombIndexes(getRandomBombIndexes());
  }, []);

  // getRandomBombIndexes genera la posizione casuale delle bombe sul campo di gioco
  const getRandomBombIndexes = () => {
    const indexes = new Set();
    while (indexes.size < 20) {
      indexes.add(Math.floor(Math.random() * 100));
    }
    console.log(indexes);
    return Array.from(indexes);
  };

  const onHandleClick = (index) => {
    if (!cells[index]) {
      if (bombIndexes.includes(index)) {
        setGameOver(true);
      }
      const updatedCells = [...cells];
      updatedCells[index] = true;
      setCells(updatedCells);

      // funzione che fa un controllo sulle celle cliccate se sono cliccate tutte
      // le celle possibili dove non ci sono bombe parte lo stato youWin per indicare
      // che hai vinto
      const remainingCells = updatedCells.filter(
        (cell, index) => !bombIndexes.includes(index)
      );
      if (remainingCells.every((cell) => cell)) {
        setYouWin(true);
      }
      incrementScore(index);
    }
  };

  // renderCell renderizza le celle e indica se una cella è cliccata o meno
  // tramite css
  const renderCell = (index) => {
    if (cells[index]) {
      return (
        <div
          className={`${styles.scacchiera} ${styles.clickedCell} ${
            bombIndexes.includes(index) ? styles.bomb : ""
          }`}
        >
          {bombIndexes.includes(index) ? (
            <img className={`${styles.bomb}`} src="R.jpeg" alt="immagine" />
          ) : null}
        </div>
      );
    }
    return null;
  };

  // resetGame reimposta il gioco all'inizio
  const resetGame = () => {
    setCells(Array(100).fill(false));
    setGameOver(false);
    setBombIndexes(getRandomBombIndexes());
    setCounter(0);
    setYouWin(false);
    setClickedCells(Array(100).fill(false));
  };

  return (
    <div className={styles.container}>
      <h1>Campo Minato</h1>
      <div className={styles.punti}>
        <h2>Score</h2>
        <span>{counter}</span>
      </div>
      <div  className={styles.contanierScacchiera}>
        {Array(100).fill(null).map((_, index) => (
          <div
            onClick={() => onHandleClick(index)}
            key={index}
            className={
              index % 20 < 10
                ? index % 2 === 0
                  ? `${styles.scacchiera} ${styles.color1}`
                  : `${styles.scacchiera} ${styles.color2}`
                : index % 2 === 0
                ? `${styles.scacchiera} ${styles.color2}`
                : `${styles.scacchiera} ${styles.color1}`
            }
          >
            {renderCell(index)}
          </div>
        ))}
      </div>
      {gameOver && (
        <div className={styles.resultGame}>
          <div className={styles.endGameOver}>
            <h1 className={styles.titleResult}>Game Over</h1>
          </div>
          <button className={styles.btnReset} onClick={resetGame}>
            Ricomincia
          </button>
        </div>
      )}
      {youWin && (
        <div className={styles.resultGame}>
          <div className={styles.endGameOver}>
            <h1 className={styles.titleResult}>Hai vinto</h1>
          </div>
          <button className={styles.btnReset} onClick={resetGame}>
            Ricomincia
          </button>
        </div>
      )}
    </div>
  );
};

export default CampoMinato;