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
             <h1 className={styles.Title}>questa è la Home : in fase di sviluppo
                </h1>
                <button onClick={onNavigateToCampoMinato}>
                    Clicca qui per giocare con campominato
                </button>
               <button onClick={onNavigateToTetris} >clicca per giocare con tetris </button>
        </div>
    )
}
export default Home;