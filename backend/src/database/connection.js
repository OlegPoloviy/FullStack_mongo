import mongoose from "mongoose"
import "dotenv/config"

const url = process.env.DB_URL;

async function connectToDatabase(){
  try{
    await mongoose.connect(url);
    console.log("Connected");
  }catch(err){
    console.error(err);
  }
}

export const userSchema = new mongoose.Schema