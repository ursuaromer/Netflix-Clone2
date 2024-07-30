// backend/routes/notifications.js
// Importamos los módulos necesarios

import express from 'express';
import axios from 'axios';
import { TMDB_API_KEY, TMDB_BASE_URL, TMDB_IMAGE_BASE_URL } from '../config.js'; // Asegúrate de que TMDB_IMAGE_BASE_URL esté definido

const router = express.Router(); // Creamos un nuevo router
// Definimos una ruta GET para obtener las nuevas películas
router.get('/new-releases', async (req, res) => {
  try {
     // Hacemos una solicitud a la API de TMDb para obtener las películas en estreno
    const response = await axios.get(`${TMDB_BASE_URL}/movie/now_playing`, {
      params: {
        api_key: TMDB_API_KEY,
      },
    });
 // Mapeamos los resultados para formatearlos según nuestras necesidades
    const movies = response.data.results.map((movie) => ({
      id: movie.id,
      title: movie.title,
      overview: movie.overview,
      poster_path: `${TMDB_IMAGE_BASE_URL}${movie.poster_path}`,// Añadimos la URL completa de la imagen
    }));
  // Enviamos las películas formateadas como respuesta
    res.json(movies);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch new releases' });
  }
});

export default router;// Exportamos el router para que pueda ser usado en el servidor
