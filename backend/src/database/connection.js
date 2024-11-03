import { MongoClient } from "mongodb";
import "dotenv/config";

const uri = process.env.DB_URL;
const client = new MongoClient(uri);

export async function connection() {
  try {
    await client.connect();
    console.log("Підключено до MongoDB");
    const database = client.db("sample_mflix");  
    const collection = database.collection("users"); 
    const users = await collection.find({}).toArray();
    console.log("Документи в колекції 'users':", users);
    return users;
  } catch (error) {
    console.error("Помилка підключення:", error);
  } finally {
    
    await client.close();
  }
}

