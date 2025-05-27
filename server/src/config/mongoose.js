import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

const DB_HOST = process.env.DB_HOST;
const DB_PORT = 27017;
const DB_USER = process.env.DB_USER;
const DB_PASSWORD = process.env.DB_PASSWORD;
const DB_NAME = process.env.DB_NAME;

/**
 * Establishes a connection to the MongoDB database using Mongoose.
 *
 * Utilizes environment variables for database credentials and connection details.
 * Logs a success message upon successful connection and logs errors if the connection fails.
 *
 * @throws Will log any connection error to the console.
 */

export const connectDB = async () => {
    try {
        await mongoose.connect(`mongodb://${DB_USER}:${DB_PASSWORD}@${DB_HOST}:${DB_PORT}/${DB_NAME}?authSource=admin`);
        console.log("Connected to MongoDB");
    }catch (error) {
        console.error(error);
    }
}
const db = mongoose.connection;

db.on('connected', () => {
  console.log('Stablished connection to MongoDB');
});

db.on('error', (err) => {
  console.error('BD Connection error:', err);
});

db.on('disconnected', () => {
  console.log('DB disconnected.');
});
