import { Outlet } from "react-router-dom";
import styles from "./index.module.scss";
// import Home from "../pages/Home";

// import Tetris from "../pages/Tetris";
const Layouts =()=>{
    return (
        <div className={styles.Layouts}>
          <img src="sfondo.jpeg" alt="immagine" />

        <Outlet />
     
           
        </div>
    )
}

export default Layouts;