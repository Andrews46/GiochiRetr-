import { Outlet } from "react-router-dom";
import styles from "./index.module.scss";
import Home from "../pages/Home";
import CampoMinato from "../pages/CampoMinato";
import Tetris from "../pages/Tetris";
const Layouts =()=>{
    return (
        <div className={styles.Layouts}>
            <Home/>
<CampoMinato/>
<Outlet/>
            <Tetris/>
        </div>
    )
}

export default Layouts;