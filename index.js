import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import authRoutes from './routes/authRoutes.js'; // Actualizado para ES Modules
import { connectDB } from './config/db.js'; // Importa la función de conexión

dotenv.config();

const app = express();

// Habilitar CORS para el frontend
app.use(cors());

// Usar JSON para todas las solicitudes
app.use(express.json());

// Rutas
app.use('/auth', authRoutes);  // Para el auth-service

// Ruta base de prueba
app.get('/', (req, res) => {
    res.send('¡El microservicio de autenticacion está funcionando!');
});

// Conectar a la base de datos y luego iniciar el servidor
const startServer = async () => {
    try {
        await connectDB();  // Esperamos que la conexión sea exitosa
        const PORT = process.env.PORT || 5001;  // Ajustar el puerto según el microservicio
        app.listen(PORT, () => {
            console.log(`Microservicio corriendo en el puerto ${PORT}`);
        });
    } catch (error) {
        console.error('Error al conectar a la base de datos:', error);
        process.exit(1); // Si no podemos conectar a la base de datos, salimos del proceso
    }
};

startServer();  // Llamamos a la función para iniciar el servidor
