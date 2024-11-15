import express from 'express';
import { registerUser, loginUser, getUserProfile } from '../controllers/authController.js';
import { validateToken } from '../middlewares/validateToken.js';

const router = express.Router();

// Ruta pública para registrar un usuario
router.post('/register', registerUser);

// Ruta pública para el login de un usuario
router.post('/login', loginUser);

// Ruta protegida para obtener el perfil de un usuario (requiere autenticación)
router.get('/profile', validateToken, getUserProfile);

export default router;
