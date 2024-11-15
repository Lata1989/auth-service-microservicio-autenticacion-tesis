import { MongoClient } from 'mongodb';
import dotenv from 'dotenv';

dotenv.config();

const client = new MongoClient(process.env.MONGO_URI);

export const userModel = async () => {
  const db = await client.connect();
  const collection = db.db(process.env.DB_NAME).collection('users');
  return collection;
};