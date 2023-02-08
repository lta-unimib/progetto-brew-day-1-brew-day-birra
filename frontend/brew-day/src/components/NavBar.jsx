import React from "react";
import {BrowserRouter as Router, Routes, Route, Link} from "react-router-dom";
import Birre from "../pages/Birre";
import Home from "../pages/Home";
import Inventario from "../pages/Inventario";
import Ricette from "../pages/Ricette";
import Spesa from "../pages/Spesa";
import Impostazioni from "../pages/Impostazioni";

const NavBar = () => {
    return (
        <Router>
            <div>
                <ul id="navBar">
                    <li>
                        <Link to="/">
                            <img alt="navlogo" id="logo-image" src="../icons/logo2.png"/>
                            <span id="logo-text">Brew Day!</span>
                        </Link>
                    </li>
                    <li>
                        <Link to="/ricette">Ricette</Link>
                    </li>
                    <li>
                        <Link to="/birre">Birre</Link>
                    </li>
                    <li>
                        <Link to="/inventario">Inventario</Link>
                    </li>
                    <li>
                        <Link to="/spesa">Spesa</Link>
                    </li>
                    <li>
                        <Link to="/impostazioni">Impostazioni</Link>
                    </li>
                </ul>
            </div>

            <Routes>
                <Route path="/" element={<Home />}/>
                <Route path="/ricette" element={<Ricette />}/>
                <Route path="/birre" element={<Birre />}/>
                <Route path="/inventario" element={<Inventario />}/>
                <Route path="/spesa" element={<Spesa />}/>                
                <Route path="/impostazioni" element={<Impostazioni />}/>
            </Routes>
        </Router>
    );
}

export default NavBar;