import styles from "./index.module.scss";
import { useState} from "react";
import { useNavigate } from "react-router-dom";

const Tetris = () => {
  const [cells, setCells] = useState(Array(100).fill(false)); // Array per tenere traccia delle caselle cliccate
 
  const [gameOver, setGameOver] = useState(false);

  const [youWin,setYouWin]=useState(false);

// const incrementScore=()=>{
//   setCounter(counter+1000)
// }

const navigate = useNavigate();

const goOnHome=()=>
navigate("/");

const goOnCampoMinato=()=>{
  navigate("/campominato")
}
  const onHandleClick = (index) => {
    if (!cells[index]) {
      
      const updatedCells = [...cells];
      updatedCells[index] = true;
      setCells(updatedCells);
      
      //funzione che fa un controllo sulle celle cliccate se sono cliccate tutte 
      //le celle possibili dove non ci sono bombe parte lo stato youWin per indicare
      //che hai vinto
      const remainingCells = updatedCells.filter((cell, index) => (index));
      if (remainingCells.every((cell) => cell)) {
        setYouWin(true);
      }}
  };
// renderCell renderizza le celle e indica se una cella e cliccata o meno
//tramite css 
  const renderCell = (index) => {
    if (cells[index]) {
      return (
        <div className={`${styles.scacchiera} ${styles.clickedCell}`}>
        </div>
      );
    }
    return null;
  };

// resetGame reimposta il gioco all'inizio
  const resetGame = () => {
    setCells(Array(100).fill(false));
     setGameOver(false);
    // setCounter(0)
  //  setYouWin(false)
  };

  return (
    <div className={styles.container}>
      <button className={styles.toGoHome} onClick={goOnHome}>Home</button>
      <button className={styles.toGoCampominato} onClick={goOnCampoMinato}>Campominato</button>
      <h1 className={styles.title}>Tetris</h1>

      <div className={styles.punti}>
      <h2 className={styles.title}>Score</h2>
<span  ></span>
      </div>
      <div className={styles.contanierScacchiera}>
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
         
        <button className ={styles.btnReset} onClick={resetGame}>
          Ricomincia
        </button>
          </div>
      )}
{youWin && (
  <div className={styles.resultGame}>
  <div className={styles.endGameOver} >
    <h1 className={styles.titleResult}>Hai vinto</h1>
  </div>
  <button className ={styles.btnReset} onClick={resetGame}>
          Ricomincia
        </button>
  </div>
)}

    </div>
  );
};

export default Tetris;

