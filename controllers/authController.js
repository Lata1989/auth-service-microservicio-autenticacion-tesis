import { MongoClient } from 'mongodb';
import { generateToken } from '../utils/generateToken.js';
import dotenv from 'dotenv';

dotenv.config();

const client = new MongoClient(process.env.MONGO_URI);

// Función para obtener la colección de usuarios
const getUserCollection = async () => {
    const db = await client.connect();
    return db.db(process.env.DB_NAME).collection('users');
};

// Registro de usuario
export const registerUser = async (req, res) => {
    const { nombre, apellido, email, password, dni, cuit, direccion, localidad, rol } = req.body;

    // Validación de campos vacíos
    if (!nombre || !apellido || !email || !password || !dni || !cuit || !direccion || !localidad || !rol) {
        return res.status(400).json({ message: 'Todos los campos son obligatorios' });
    }

    try {
        // Verificar si el usuario ya existe
        const collection = await getUserCollection();
        const userExist = await collection.findOne({ email });

        if (userExist) {
            return res.status(400).json({ message: 'Usuario ya existe' });
        }

        // Crear el nuevo usuario con los datos proporcionados
        const newUser = {
            nombre,
            apellido,
            email,
            password, // Al no usar bcrypt, almacenamos la contraseña tal cual (no recomendado)
            dni,
            cuit,
            direccion,
            localidad,
            rol
        };

        // Insertar el usuario en la base de datos
        await collection.insertOne(newUser);

        // Responder con éxito
        res.status(201).json({ message: 'Usuario registrado con éxito' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error en el servidor' });
    }
};

// Login de usuario
export const loginUser = async (req, res) => {
    const { email, password, rol } = req.body; // Incluimos el rol en el body

    try {
        const collection = await getUserCollection();
        const user = await collection.findOne({ email });

        if (!user) {
            return res.status(404).json({ message: 'Usuario no encontrado' });
        }

        // Verificar la contraseña
        if (user.password !== password) {
            return res.status(401).json({ message: 'Credenciales incorrectas' });
        }

        // Verificar el rol
        if (user.rol !== rol) {
            return res.status(403).json({ message: 'Rol no autorizado' });
        }

        // Generar el token de autenticación
        const token = generateToken(user._id, user.email);

        // Responder con el token
        res.json({ message: 'Login exitoso', token });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error en el servidor' });
    }
};

// Obtener perfil de usuario
export const getUserProfile = async (req, res) => {
    try {
        const { email } = req.user; // El email viene del objeto decodificado del token

        const collection = await getUserCollection();
        const user = await collection.findOne({ email });

        if (!user) {
            return res.status(404).json({ message: 'Usuario no encontrado' });
        }

        // Responder con los datos del usuario
        res.json({
            nombre: user.nombre,
            apellido: user.apellido,
            email: user.email,
            dni: user.dni,
            cuit: user.cuit,
            direccion: user.direccion,
            localidad: user.localidad
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error en el servidor' });
    }
};
