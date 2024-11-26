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

    if (!nombre || !apellido || !email || !password || !dni || !cuit || !direccion || !localidad || !rol) {
        return res.status(400).json({ message: 'Todos los campos son obligatorios' });
    }

    try {
        const collection = await getUserCollection();
        const userExist = await collection.findOne({ email });

        if (userExist) {
            return res.status(400).json({ message: 'Usuario ya existe' });
        }

        const newUser = { nombre, apellido, email, password, dni, cuit, direccion, localidad, rol };

        await collection.insertOne(newUser);

        res.status(201).json({ message: 'Usuario registrado con éxito' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error en el servidor' });
    }
};

// Login de usuario
export const loginUser = async (req, res) => {
    const { email, password, rol } = req.body;

    try {
        const collection = await getUserCollection();
        const user = await collection.findOne({ email });

        if (!user || user.password !== password || user.rol !== rol) {
            return res.status(401).json({ message: 'Credenciales incorrectas' });
        }

        const token = generateToken(user._id, user.email);

        res.json({ message: 'Login exitoso', token, user });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error en el servidor' });
    }
};

// Obtener perfil de usuario
export const getUserProfile = async (req, res) => {
    try {
        const { email } = req.user;

        const collection = await getUserCollection();
        const user = await collection.findOne({ email });

        if (!user) {
            return res.status(404).json({ message: 'Usuario no encontrado' });
        }

        res.json({
            nombre: user.nombre,
            apellido: user.apellido,
            email: user.email,
            dni: user.dni,
            cuit: user.cuit,
            direccion: user.direccion,
            localidad: user.localidad,
            rol: user.rol
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error al obtener perfil' });
    }
};
