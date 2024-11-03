import { connection } from "../connection.js";

export class Users {
  static async getAll() {
    const users = await connection();

    return users.map(user => ({
      id: user._id, 
      name: user.name,
      email: user.email,
    }));
  }
}
