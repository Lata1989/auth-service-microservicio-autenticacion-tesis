import jwt from 'jsonwebtoken';

export const validateToken = (req, res, next) => {
  // Obtener el token del encabezado Authorization
  const token = req.headers['authorization'];

  if (!token) {
    return res.status(401).json({ message: 'Token no proporcionado' });
  }

  // Verificar el token
  jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
    if (err) {
      return res.status(403).json({ message: 'Token inválido o expirado' });
    }

    // Si el token es válido, se puede acceder al userId
    req.userId = decoded.userId;
    next(); // Continuamos con la siguiente acción en la ruta
  });
};
