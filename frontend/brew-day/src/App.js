
import React from 'react';
import { Route, Routes } from 'react-router';
import NavBar from './components/NavBar';
import Birre from './pages/Birre';
import Home from './pages/Home';
import Impostazioni from './pages/Impostazioni';
import Inventario from './pages/Inventario';
import Ricette from './pages/Ricette';
import Spesa from './pages/Spesa';

const App = () => {
  return (
    <React.Fragment>
      <NavBar />
      <Routes>
        <Route path="/" element={<Home />}/>
        <Route path="Ricette" element={<Ricette />}/>
        <Route path="Birre" element={<Birre />}/>
        <Route path="Inventario" element={<Inventario />}/>
        <Route path="Spesa" element={<Spesa />}/>                
        <Route path="Impostazioni" element={<Impostazioni />}/>
      </Routes>
    </React.Fragment>
  );
}

export default App;