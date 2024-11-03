// connection.js
import { MongoClient } from "mongodb";
import "dotenv/config";

const uri = process.env.DB_URL;
const client = new MongoClient(uri);

export async function connection() {
  try {
    await client.connect();
    console.log("Підключено до MongoDB");

    // Підключення до бази даних і колекції
    const database = client.db("sample_mflix");
    const collection = database.collection("users");

    // Отримання всіх документів у колекції 'users'
    const users = await collection.find({}).toArray();
    return users;
  } catch (error) {
    console.error("Помилка підключення:", error);
    return [];
  } finally {
    // Закриття з'єднання після виконання запиту
    await client.close();
  }
}
