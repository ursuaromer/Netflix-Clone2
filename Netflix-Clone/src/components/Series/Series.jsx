import React, { useState, useEffect } from "react";
import axios from "axios";
import Navegador from "../Navegador/Navegador";
import Sidebar from "../Peliculas/Sidebar"
import "./Series.css";

const API_KEY = "fa8d9fb775a751a64726e7a92e2061ff";
const BASE_URL = "https://api.themoviedb.org/3";
const IMAGE_BASE_URL = "https://image.tmdb.org/t/p/w500";

const Series = () => {
  const [series, setSeries] = useState([]);
  const [busqueda, setBusqueda] = useState("");
  const [categoriaSeleccionada, setCategoriaSeleccionada] = useState("popular");
  const [serieSeleccionada, setSerieSeleccionada] = useState(null);
  const [lista, setLista] = useState([]);
  const [sidebarVisible, setSidebarVisible] = useState(false);

  useEffect(() => {
    fetchSeries();
  }, [categoriaSeleccionada]);

  const fetchSeries = async (searchTerm = "") => {
    try {
      let url = `${BASE_URL}/tv/${categoriaSeleccionada}`;
      let params = {
        api_key: API_KEY,
        language: "es-ES",
      };

      if (searchTerm) {
        url = `${BASE_URL}/search/tv`;
        params = { ...params, query: searchTerm };
      }

      const response = await axios.get(url, { params });
      setSeries(response.data.results);
    } catch (error) {
      console.error("Error fetching series:", error);
    }
  };

  const handleSearch = (e) => {
    e.preventDefault();
    fetchSeries(busqueda);
  };

  const abrirModal = async (serie) => {
    try {
      const response = await axios.get(
        `${BASE_URL}/tv/${serie.id}/videos`,
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
      setSerieSeleccionada({
        ...serie,
        trailer: trailer
          ? `https://www.youtube.com/embed/${trailer.key}`
          : null,
      });
    } catch (error) {
      console.error("Error fetching series details:", error);
    }
  };

  const cerrarModal = () => {
    setSerieSeleccionada(null);
  };

  const agregarALista = (serie, e) => {
    e.stopPropagation(); // Prevenir que el click abra el modal
    setLista((prevLista) => [...prevLista, serie]);
    setSidebarVisible(true);
  };

  const eliminarPelicula = (id) => {
    setLista((prevLista) => prevLista.filter((serie) => serie.id !== id));
  };

  const cerrarSidebar = () => {
    setSidebarVisible(false);
  };

  const abrirSidebar = () => {
    setSidebarVisible(true);
  };

  return (
    <>
      <div className="series-container">
        <Navegador />
        <div className="series-header">
          <form onSubmit={handleSearch} className="search-form">
            <input
              type="text"
              value={busqueda}
              onChange={(e) => setBusqueda(e.target.value)}
              placeholder="Buscar series..."
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
            <option value="on_the_air">En emisión</option>
          </select>
          <button className="open-list-button" onClick={abrirSidebar}>
            Abrir Lista
          </button>
        </div>

        <div className="series-grid">
          {series.map((serie) => (
            <div
              key={serie.id}
              className="serie-card"
              onClick={() => abrirModal(serie)}
            >
              <img
                src={`${IMAGE_BASE_URL}${serie.poster_path}`}
                alt={serie.name}
              />
              <div className="serie-info">
                <h3>{serie.name}</h3>
                <div className="calificacion">
                  ★ {serie.vote_average.toFixed(1)}
                </div>
                <button
                  className="add-to-list-button"
                  onClick={(e) => agregarALista(serie, e)}
                >
                  Agregar a la lista
                </button>
              </div>
            </div>
          ))}
        </div>

        {serieSeleccionada && (
          <div className="modal-overlay">
            <div className="modal-content">
              <span className="cerrar" onClick={cerrarModal}>
                &times;
              </span>
              <h2>{serieSeleccionada.name}</h2>
              <p>{serieSeleccionada.overview}</p>
              <div className="calificacion">
                ★ {serieSeleccionada.vote_average.toFixed(1)}
              </div>
              {serieSeleccionada.trailer ? (
                <div className="video-container">
                  <iframe
                    src={serieSeleccionada.trailer}
                    title={`Trailer de ${serieSeleccionada.name}`}
                    frameBorder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                  ></iframe>
                </div>
              ) : (
                <p>Lo sentimos, no hay trailer disponible para esta serie.</p>
              )}
            </div>
          </div>
        )}
      </div>

      {sidebarVisible && (
        <Sidebar
          lista={lista}
          eliminarPelicula={eliminarPelicula}
          cerrarSidebar={cerrarSidebar}
        />
      )}
    </>
  );
};

export default Series;
