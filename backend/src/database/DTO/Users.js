import { connectToDatabase } from "../connection.js";

export class Users {
  static async getAll() {
    const users = await connectToDatabase();

    return users.map(user => ({
      id: user._id,
      name: user.name,
      email: user.email,
    }));
  }

  static async addUser(data) {
  }
}
