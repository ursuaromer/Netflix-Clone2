import React, { useState, useEffect } from 'react';
import Navegador from '../Navegador/Navegador';
import './Notificacion.css';

const Notificacion = () => {
  const [notificaciones, setNotificaciones] = useState([]);

  useEffect(() => {
    const fetchNotificaciones = async () => {
      try {
        const response = await fetch('http://localhost:5000/api/notifications/new-releases');
        const data = await response.json();
        setNotificaciones(data);
      } catch (error) {
        console.error('Error fetching notifications:', error);
      }
    };

    fetchNotificaciones();
  }, []);

  return (
    <div className="notificacion-container">
      <Navegador />
      <div className="notificaciones">
        <h2>Notificaciones</h2>
        {notificaciones.map((notificacion) => (
          <div key={notificacion.id} className="notificacion-item">
            <img src={notificacion.poster_path} alt="Miniatura" />
            <div className="notificacion-contenido">
              <h3>{notificacion.title}</h3>
              <p>{notificacion.overview}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Notificacion;
