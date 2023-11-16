import styles from './App.module.scss';
import { BrowserRouter,Routes, Route } from "react-router-dom";

import Layouts from './layouts/Layouts';
import Home from './pages/Home';
import CampoMinato from "./pages/CampoMinato/CampoMinato";
import Tetris from "./pages/Tetris";
function App() {
 
  return (

      <div className={styles.App}>
<BrowserRouter>     
      <Routes>
      <Route element={<Layouts />}>
      <Route path="/" element={<Home/>}/>
      <Route path="/campominato" element={<CampoMinato/>}/>
      <Route path="/Tetris" element={<Tetris/>}/>
      </Route>
      </Routes>
     </BrowserRouter>
     
      
      </div>
    
  )
}

export default App
