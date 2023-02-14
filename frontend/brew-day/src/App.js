
import React from 'react';
import { Route, Routes } from 'react-router';
import NavBar from './components/NavBar';
import NavBarThemeManager from './components/NavBarThemeManager';
import Birre from './pages/Birre';
import Home from './pages/Home';
import Impostazioni from './pages/Impostazioni';
import Inventario from './pages/Inventario';
import Ricette from './pages/Ricette';
import Spesa from './pages/Spesa';

export default class App extends React.Component {
  render() {
    return (
      <React.Fragment>
        <NavBarThemeManager>
          <NavBar />
        </NavBarThemeManager>
        <Routes>
          <Route path="/" element={<Home />}/>
          <Route path="/Ricette" element={<Ricette />}/>
          <Route path="/Birre" element={<Birre />}/>
          <Route path="/Inventario" element={<Inventario />}/>
          <Route path="/Spesa" element={<Spesa />}/>                
          <Route path="/Impostazioni" element={<Impostazioni masterCall={() => this.setState({})}/>}/>
        </Routes>
      </React.Fragment>
    );
  };
}