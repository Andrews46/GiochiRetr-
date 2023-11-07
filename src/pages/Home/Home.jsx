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
             <h1>questa è la Home
                </h1>
                <button onClick={onNavigateToCampoMinato}>
                    Clicca qui per campominato
                </button>
               <button onClick={onNavigateToTetris} >clicca</button>
        </div>
    )
}
export default Home;