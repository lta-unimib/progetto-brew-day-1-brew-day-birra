import React, { useState } from 'react';
import { Route, Routes } from 'react-router';
import NavBar from './components/NavBar';
import NavBarThemeManager from './components/NavBarThemeManager';
import Birre from './pages/Birre';
import Home from './pages/Home';
import Impostazioni from './pages/Impostazioni';
import Inventario from './pages/Inventario';
import Ricette from './pages/Ricette';
import Spesa from './pages/Spesa';
import { useSnackbar } from "notistack";

const App = () => {
  const [ flick, setFlick ] = useState(0);
  const { enqueueSnackbar } = useSnackbar();

  return (
      <React.Fragment>
        <NavBarThemeManager>
          <NavBar />
        </NavBarThemeManager>
        <Routes>
          <Route path="/" element={<Home />}/>
          <Route path="/Ricette" element={<Ricette enqueueSnackbar={enqueueSnackbar} />}/>
          <Route path="/Birre" element={<Birre />}/>
          <Route path="/Inventario" element={<Inventario />}/>
          <Route path="/Spesa" element={<Spesa />}/>                
          <Route path="/Impostazioni" element={<Impostazioni masterCall={() => setFlick({})}/>}/>
        </Routes>
      </React.Fragment>
  );
}

export default App;
