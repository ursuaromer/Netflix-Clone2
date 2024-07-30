import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import authRoutes from './routes/auth.js'; // Usar extensión .js para importar
import notificationsRouter from './routes/notifications.js'; // Usar import en lugar de require

const app = express();// Creamos una instancia de Express
const port = 5000;// Definimos el puerto en el que correrá el servidor

// Middlewares
app.use(express.json());// Middleware para parsear JSON
app.use(cors());// Middleware para habilitar CORS

// Conectar a MongoDB
mongoose.connect('mongodb://localhost:27017/netflix', {
    // useNewUrlParser: true,
    // useUnifiedTopology: true,
}).then(() => {
    console.log('Conectado a MongoDB');
}).catch((error) => {
    console.error('Error conectando a MongoDB:', error);
});

// Rutas
app.use('/api/auth', authRoutes); // Usamos las rutas de autenticación
app.use('/api/notifications', notificationsRouter); // Usamos las rutas de notificaciones


// Iniciar el servidor
app.listen(port, () => {
    console.log(`Servidor corriendo en http://localhost:${port}`);
});
