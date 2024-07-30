import React from "react";
import "./Sidebar.css";

const Sidebar = ({ lista, eliminarPelicula, cerrarSidebar }) => {
  return (
    <div className="sidebar">
      <button className="close-sidebar-button" onClick={cerrarSidebar}>
        &times;
      </button>
      <h2>Mi Lista</h2>
      <ul>
        {lista.map((pelicula) => (
          <li key={pelicula.id} className="sidebar-item">
            <img
              src={`https://image.tmdb.org/t/p/w200${pelicula.poster_path}`}
              alt={pelicula.title}
              className="sidebar-item-image"
            />
            <span className="sidebar-item-title">{pelicula.title}</span>
            <button
              className="remove-button"
              onClick={() => eliminarPelicula(pelicula.id)}
            >
              <i className="fas fa-trash-alt"></i>
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Sidebar;
