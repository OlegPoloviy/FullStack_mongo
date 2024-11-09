import { supabase } from "../connection.js";
import bcrypt from "bcrypt";

export class Users {
  static async getAll() {
    const { data, error } = await supabase.from("Users").select("*");
    if (error) {
      throw new Error(`Error fetching users: ${error.message}`);
    }
    return data;
  }

  static async addUser(userData) {
    const { login, pass } = userData;

    if (!login || !pass) {
      throw new Error("Both login and password are required");
    }

    try {
      const hashedPassword = await bcrypt.hash(pass, 10);
      const { data, error } = await supabase
        .from("Users")
        .insert([{ login, password: hashedPassword }])
        .select();

      if (error) {
        throw new Error(`Error adding user: ${error.message}`);
      }

      return data;
    } catch (err) {
      console.error("User creation failed:", err);
      throw err;
    }
  }

  static async checkLogin(login, pass) {
    const { data, error } = await supabase
      .from("Users")
      .select("*")
      .eq("login", login)
      .single();

    if (error) {
      throw new Error("User not found");
    }

    const user = data;
    const isPasswordValid = await bcrypt.compare(pass, user.password);
    if (!isPasswordValid) {
      throw new Error("Invalid password");
    }

    return user;
  }
}
