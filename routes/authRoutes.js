import express from 'express';
import { registerUser, loginUser, getUserProfile } from '../controllers/authController.js';
import { validateToken } from '../middlewares/validateToken.js'; // Importamos el middleware

const router = express.Router();

// Rutas de autenticación publicas
router.post('/register', registerUser);
router.post('/login', loginUser);

// Ruta protegida para obtener el perfil del usuario
router.get('/profile', validateToken, getUserProfile);

export default router;
