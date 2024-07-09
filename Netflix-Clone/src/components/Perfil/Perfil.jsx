import React from 'react';
import Navegador from '../Navegador/Navegador';
import './Perfil.css';

const Perfil = () => {
  return (
    <div className="perfil-container">
      <Navegador />
      <div className="perfil-content">
        <div className="perfil-header">
          <h1>¿Quién está viendo ahora?</h1>
        </div>
        <div className="perfiles">
          <div className="perfil">
            <img src="https://via.placeholder.com/150" alt="Usuario 1" />
            <span>Usuario 1</span>
          </div>
          <div className="perfil">
            <img src="https://via.placeholder.com/150" alt="Usuario 2" />
            <span>Usuario 2</span>
          </div>
          <div className="perfil">
            <img src="https://via.placeholder.com/150" alt="Usuario 3" />
            <span>Usuario 3</span>
          </div>
          <div className="perfil">
            <img src="https://via.placeholder.com/150" alt="Usuario 4" />
            <span>Usuario 4</span>
          </div>
        </div>
        <button className="administrar-perfiles">Administrar perfiles</button>
      </div>
    </div>
  );
};

export default Perfil;