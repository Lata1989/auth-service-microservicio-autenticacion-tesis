import userModel from '../models/userModel.js';
import generateToken from '../utils/generateToken.js';

// Registro de usuario
export const registerUser = async (req, res) => {
  try {
    const { nombre, apellido, email, password, dni, cuit, direccion, localidad } = req.body;
    const collection = await userModel();

    // Verificar si el usuario ya existe
    const userExist = await collection.findOne({ email });
    if (userExist) {
      return res.status(400).json({ message: 'Usuario ya existe' });
    }

    // Crear un nuevo usuario
    const newUser = {
      nombre,
      apellido,
      email,
      password, // Al no usar bcrypt, almacenamos la contraseña tal cual (no recomendado)
      dni,
      cuit,
      direccion,
      localidad,
    };

    await collection.insertOne(newUser);

    // Generar JWT
    const token = generateToken(newUser._id);

    res.status(201).json({ message: 'Usuario registrado con éxito', token });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error en el servidor' });
  }
};

// Login de usuario
export const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    const collection = await userModel();

    // Buscar usuario
    const user = await collection.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: 'Usuario no encontrado' });
    }

    // Validar la contraseña (aquí solo se valida que exista)
    if (user.password !== password) {
      return res.status(400).json({ message: 'Contraseña incorrecta' });
    }

    // Generar token
    const token = generateToken(user._id);

    res.json({ message: 'Login exitoso', token });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error en el servidor' });
  }
};

// Perfil de usuario (ruta protegida)
export const getUserProfile = async (req, res) => {
  try {
    const collection = await userModel();
    const user = await collection.findOne({ _id: req.userId });

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
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error en el servidor' });
  }
};
