import { supabase } from "../connection.js";

export class Posts {
  static async getPosts() {
    const { data, error } = await supabase.from("Posts").select(`
      *,
      user: user_id (login)
    `);
    if (error) {
      throw new Error(`Error fetching posts: ${error.message}`);
    }
    return data;
  }

  static async addPost({ title, body, user_id }) {
    const { data, error } = await supabase
      .from("Posts")
      .insert([{ title, body, user_id }])
      .select();
    if (error) {
      throw new Error(`Error adding post: ${error.message}`);
    }
    return data[0];
  }

  static async updatePost(post_id, { title, body }) {
    const { data, error } = await supabase
      .from("Posts")
      .update({ title, body })
      .eq("id", post_id)
      .select();
    if (error) {
      throw new Error(`Error updating post: ${error.message}`);
    }
    return data[0];
  }

  static async deletePost(post_id) {
    const { error } = await supabase.from("Posts").delete().eq("id", post_id);
    if (error) {
      throw new Error(`Error deleting post: ${error.message}`);
    }
  }
}
