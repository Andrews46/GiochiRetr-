import styles from "./index.module.scss";
import { useNavigate } from "react-router-dom";
const Home=()=>{
    const navigate = useNavigate();
    const onNavigateToCampoMinato=()=>{
        navigate("/CampoMinato")
       
    }
    const onNavigateToTetris=()=>{
        
        navigate("/Tetris")
    }
    return(
        <div className={styles.Home}>
            <img className={styles.imgBody} src="OIPnuova.jpeg" alt="immagine" />
             <h1 className={styles.Title}> Home 
                </h1>
                <h2 className={styles.TitleScelta}>
                    Scegli il gioco che vuoi provare 
                </h2>
                <div className={styles.btn}>

                <button className={styles.btnClick1} onClick={onNavigateToCampoMinato}>
                    Campominato
                </button>
               <button  className={styles.btnClick2} onClick={onNavigateToTetris} >Tetris </button>
                </div>
        </div>
    )
}
export default Home;