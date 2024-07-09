import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './Inicio.css';
import Nav from "../Navegador/Navegador/"

const API_KEY = 'fa8d9fb775a751a64726e7a92e2061ff';
const BASE_URL = 'https://api.themoviedb.org/3';
const IMAGE_BASE_URL = 'https://image.tmdb.org/t/p/w500';

const Inicio = () => {
  const [fullscreenMovie, setFullscreenMovie] = useState(null);
  const [featuredMovie, setFeaturedMovie] = useState(null);
  const [popularMovies, setPopularMovies] = useState([]);
  const [topRatedMovies, setTopRatedMovies] = useState([]);
  const [upcomingMovies, setUpcomingMovies] = useState([]);

  useEffect(() => {
    fetchMovies('movie/popular', setPopularMovies);
    fetchMovies('movie/top_rated', setTopRatedMovies);
    fetchMovies('movie/upcoming', setUpcomingMovies);
    fetchFeaturedMovie();
  }, []);

  const fetchMovies = async (endpoint, setStateFunction) => {
    try {
      const response = await axios.get(`${BASE_URL}/${endpoint}`, {
        params: {
          api_key: API_KEY,
          language: 'es-ES'
        }
      });
      setStateFunction(response.data.results.slice(0, 7));
    } catch (error) {
      console.error('Error fetching movies:', error);
    }
  };

  const fetchFeaturedMovie = async () => {
    try {
      const response = await axios.get(`${BASE_URL}/movie/popular`, {
        params: {
          api_key: API_KEY,
          language: 'es-ES'
        }
      });
      setFeaturedMovie(response.data.results[0]);
    } catch (error) {
      console.error('Error fetching featured movie:', error);
    }
  };

  const openFullscreen = async (movie) => {
    try {
      const response = await axios.get(`${BASE_URL}/movie/${movie.id}/videos`, {
        params: {
          api_key: API_KEY,
          language: 'es-ES'
        }
      });
      const trailer = response.data.results.find(video => video.type === 'Trailer');
      setFullscreenMovie({
        ...movie,
        trailerUrl: trailer ? `https://www.youtube.com/embed/${trailer.key}` : null
      });
    } catch (error) {
      console.error('Error fetching movie trailer:', error);
    }
  };

  const closeFullscreen = () => {
    setFullscreenMovie(null);
  };

  return (
    <div className="home-page">
      <div className="background"></div>
      <header>
        <Nav />
      </header>
      <main>
        {featuredMovie && (
          <section className="featured-content" onClick={() => openFullscreen(featuredMovie)}>
            <img src={`${IMAGE_BASE_URL}${featuredMovie.backdrop_path}`} alt={featuredMovie.title} />
            <div className="featured-overlay">
              <h2>{featuredMovie.title}</h2>
              <button className="play-button" onClick={() => openFullscreen(featuredMovie)}>▶ Reproducir</button>
            </div>
          </section>
        )}
        <section className="movie-section">
          <h2>Películas Populares</h2>
          <div className="movie-list">
            {popularMovies.map(movie => (
              <div key={movie.id} className="movie-item" onClick={() => openFullscreen(movie)}>
                <img src={`${IMAGE_BASE_URL}${movie.poster_path}`} alt={movie.title} />
                <p>{movie.title}</p>
              </div>
            ))}
          </div>
        </section>
        <section className="movie-section">
          <h2>Mejor Calificadas</h2>
          <div className="movie-list">
            {topRatedMovies.map(movie => (
              <div key={movie.id} className="movie-item" onClick={() => openFullscreen(movie)}>
                <img src={`${IMAGE_BASE_URL}${movie.poster_path}`} alt={movie.title} />
                <p>{movie.title}</p>
              </div>
            ))}
          </div>
        </section>
        <section className="movie-section">
          <h2>Próximos Estrenos</h2>
          <div className="movie-list">
            {upcomingMovies.map(movie => (
              <div key={movie.id} className="movie-item" onClick={() => openFullscreen(movie)}>
                <img src={`${IMAGE_BASE_URL}${movie.poster_path}`} alt={movie.title} />
                <p>{movie.title}</p>
              </div>
            ))}
          </div>
        </section>
      </main>
      {fullscreenMovie && (
        <div className="fullscreen-video" onClick={closeFullscreen}>
          {fullscreenMovie.trailerUrl ? (
            <iframe
              src={fullscreenMovie.trailerUrl}
              title={`Trailer de ${fullscreenMovie.title}`}
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            ></iframe>
          ) : (
            <div className="no-trailer">
              <p>Lo sentimos, no hay trailer disponible para esta película.</p>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default Inicio;