import styles from "./index.module.scss";
import { useNavigate } from "react-router-dom";

const Tetris = () => {
//blocco codice per spostarsi da una pagina all'altra
const navigate = useNavigate();
const goOnHome=()=>
navigate("/");
const goOnCampoMinato=()=>{
  navigate("/campominato")
}
  return (
    <div className={styles.container}>  
      <button className={styles.toGoHome} onClick={goOnHome}>Home</button>
      <button className={styles.toGoCampominato} onClick={goOnCampoMinato}>Campominato</button>
      <h1 className={styles.title}>Tetris</h1>
      <div className={styles.punti}>
      <h2 className={styles.title}>Score</h2>
      </div>
      <div className={styles.contanierScacchiera}>  
        {Array(100).fill(null).map((_, index) => (
          <div key={index}
          className={
            `${styles.scacchiera} ${styles.color1}` 
          }>
          </div>
        ))}
      </div>
        <button  className={styles.btnGameStart}>Comincia a giocare</button>
    </div>
  );
};
export default Tetris;

