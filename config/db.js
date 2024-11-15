import { MongoClient } from 'mongodb';
import dotenv from 'dotenv';

dotenv.config();

const client = new MongoClient(process.env.MONGO_URI);

export const connectDB = async () => {
  try {
    await client.connect();
    console.log('Conexión exitosa a MongoDB');
    return client.db(process.env.DB_NAME);
  } catch (error) {
    console.error('Error al conectar a MongoDB:', error);
    process.exit(1); // Salir del proceso si hay error
  }
};
