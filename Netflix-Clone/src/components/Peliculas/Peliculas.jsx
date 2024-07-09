import React, { useState, useEffect } from "react";
import axios from "axios";
import Navegador from "../Navegador/Navegador";
import "./Peliculas.css";

const API_KEY = "fa8d9fb775a751a64726e7a92e2061ff";
const BASE_URL = "https://api.themoviedb.org/3";
const IMAGE_BASE_URL = "https://image.tmdb.org/t/p/w500";

const Peliculas = () => {
  const [peliculas, setPeliculas] = useState([]);
  const [busqueda, setBusqueda] = useState("");
  const [categoriaSeleccionada, setCategoriaSeleccionada] = useState("popular");
  const [peliculaSeleccionada, setPeliculaSeleccionada] = useState(null);

  useEffect(() => {
    fetchPeliculas();
  }, [categoriaSeleccionada]);

  const fetchPeliculas = async (searchTerm = "") => {
    try {
      let url = `${BASE_URL}/movie/${categoriaSeleccionada}`;
      let params = {
        api_key: API_KEY,
        language: "es-ES",
      };

      if (searchTerm) {
        url = `${BASE_URL}/search/movie`;
        params = { ...params, query: searchTerm };
      }

      const response = await axios.get(url, { params });
      setPeliculas(response.data.results);
    } catch (error) {
      console.error("Error fetching movies:", error);
    }
  };

  const handleSearch = (e) => {
    e.preventDefault();
    fetchPeliculas(busqueda);
  };

  const abrirModal = async (pelicula) => {
    try {
      const response = await axios.get(
        `${BASE_URL}/movie/${pelicula.id}/videos`,
        {
          params: {
            api_key: API_KEY,
            language: "es-ES",
          },
        }
      );
      const trailer = response.data.results.find(
        (video) => video.type === "Trailer"
      );
      setPeliculaSeleccionada({
        ...pelicula,
        trailer: trailer
          ? `https://www.youtube.com/embed/${trailer.key}`
          : null,
      });
    } catch (error) {
      console.error("Error fetching movie details:", error);
    }
  };

  const cerrarModal = () => {
    setPeliculaSeleccionada(null);
  };

  return (
    <div className="peliculas-container">
      <Navegador />
      <div className="peliculas-header">
        <form onSubmit={handleSearch} className="search-form">
          <input
            type="text"
            value={busqueda}
            onChange={(e) => setBusqueda(e.target.value)}
            placeholder="Buscar películas..."
            className="search-input"
          />
          <button type="submit" className="search-button">
            Buscar
          </button>
        </form>
        <select
          value={categoriaSeleccionada}
          onChange={(e) => setCategoriaSeleccionada(e.target.value)}
          className="categoria-select"
        >
          <option value="popular">Populares</option>
          <option value="top_rated">Mejor valoradas</option>
          <option value="upcoming">Próximos estrenos</option>
        </select>
      </div>

      <div className="carrusel">
        {peliculas.map((pelicula) => (
          <div
            key={pelicula.id}
            className="pelicula-card"
            onClick={() => abrirModal(pelicula)}
          >
            <img
              src={`${IMAGE_BASE_URL}${pelicula.poster_path}`}
              alt={pelicula.title}
            />
            <div className="pelicula-info">
              <h3>{pelicula.title}</h3>
              <div className="calificacion">
                ★ {pelicula.vote_average.toFixed(1)}
              </div>
            </div>
          </div>
        ))}
      </div>

      {peliculaSeleccionada && (
        <div className="modal">
          <div className="modal-content">
            <span className="cerrar" onClick={cerrarModal}>
              &times;
            </span>
            <h2>{peliculaSeleccionada.title}</h2>
            <p>{peliculaSeleccionada.overview}</p>
            <div className="calificacion">
              ★ {peliculaSeleccionada.vote_average.toFixed(1)}
            </div>
            {peliculaSeleccionada.trailer && (
              <div className="video-container">
                <iframe
                  width="560"
                  height="315"
                  src={peliculaSeleccionada.trailer}
                  title={`Trailer de ${peliculaSeleccionada.title}`}
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                ></iframe>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default Peliculas;
