import jwt from 'jsonwebtoken';

export const generateToken = (userId, email) => {
    return jwt.sign(
        { userId, email }, // Asegúrate de incluir el email en el payload
        process.env.JWT_SECRET,
        { expiresIn: '7d' } // Esto es opcional, puedes establecer un tiempo de expiración
    );
};
