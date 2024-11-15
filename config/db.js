import { MongoClient } from 'mongodb';
import dotenv from 'dotenv';

dotenv.config();

let client;
let isConnected = false;

export const connectDB = async () => {
  if (isConnected) {
    console.log('Ya estamos conectados a la base de datos');
    return;
  }

  try {
    client = new MongoClient(process.env.MONGO_URI);
    await client.connect();
    isConnected = true;
    console.log('Conexión exitosa a MongoDB');
  } catch (error) {
    console.error('Error al conectar a MongoDB:', error);
    process.exit(1); // Salir si no se puede conectar
  }
};

// export { connectDB };
