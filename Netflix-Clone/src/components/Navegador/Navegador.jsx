import React, { useState } from "react";
import "./Navegador.css";
import { Link } from 'react-router-dom';

const Navegador = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <nav className="main-nav">
      <div className="nav-content">
        <h3 className="logo">CAPLIX</h3>
        <div className={`nav-links ${isMenuOpen ? 'active' : ''}`}>
          <Link to="/Inicio" className="nav-link">Inicio</Link>
          <Link to="/peliculas" className="nav-link">Peliculas</Link>
          <Link to="/series" className="nav-link">Series</Link>
          <Link to="/notificacion" className="nav-link">Notificacion</Link>
          <Link to="/Perfil" className="nav-link">Perfil</Link>
        </div>
        <div className="menu-icon" onClick={toggleMenu}>
          <div className={`bar ${isMenuOpen ? 'open' : ''}`}></div>
          <div className={`bar ${isMenuOpen ? 'open' : ''}`}></div>
          <div className={`bar ${isMenuOpen ? 'open' : ''}`}></div>
        </div>
      </div>
    </nav>
  );
};

export default Navegador;