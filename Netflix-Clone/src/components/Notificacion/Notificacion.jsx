import React from 'react';
import Navegador from '../Navegador/Navegador';
import './Notificacion.css';

const Notificacion = () => {
  return (
    <div className="notificacion-container">
      <Navegador />
      <div className="notificaciones">
        <h2>Notificaciones</h2>
        <div className="notificacion-item">
          <img src="https://via.placeholder.com/50" alt="Miniatura" />
          <div className="notificacion-contenido">
            <h3>Nuevo episodio disponible</h3>
            <p>Tu serie favorita ha lanzado un nuevo episodio. ¡Míralo ahora!</p>
          </div>
        </div>
        <div className="notificacion-item">
          <img src="https://via.placeholder.com/50" alt="Miniatura" />
          <div className="notificacion-contenido">
            <h3>Recomendación para ti</h3>
            <p>Basado en lo que has visto, creemos que te gustará esta película.</p>
          </div>
        </div>
        {/* Puedes agregar más notificaciones aquí */}
      </div>
    </div>
  );
};

export default Notificacion;