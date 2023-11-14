import styles from './App.module.scss';
import { BrowserRouter,Routes, Route } from "react-router-dom";

import Home from './pages/Home';
import CampoMinato from "./pages/CampoMinato/CampoMinato";
import Tetris from "./pages/Tetris";
function App() {
 
  return (

      <div className={styles.App}>
<BrowserRouter>     
      <Routes>
      <Route path="/" element={<Home/>}/>
      <Route path="/campominato" element={<CampoMinato/>}/>
      <Route path="/Tetris" element={<Tetris/>}/>
      </Routes>
     </BrowserRouter>
     
      
      </div>
    
  )
}

export default App
