import { useState, useEffect } from "react";
import { Formik, Field, Form } from "formik";
import * as Yup from "yup";
import "./MainPage.css";

export function MainPage() {
  const [showForm, setShowForm] = useState(false);
  const [userId, setUserId] = useState(null);
  const [posts, setPosts] = useState([]);
  const [editingPost, setEditingPost] = useState(null); // Track which post is being edited

  useEffect(() => {
    const user = localStorage.getItem("user");
    if (user) {
      const parsedUser = JSON.parse(user);
      setUserId(parsedUser.id);
    }

    fetch("http://localhost:3000/users/posts")
      .then((res) => res.json())
      .then((posts) => {
        setPosts(posts);
      })
      .catch((err) => {
        console.error("Error fetching posts:", err);
      });
  }, []);

  const toggleForm = () => {
    if (!userId) {
      alert("You need to be logged in to create a post!");
      return;
    }
    setShowForm((prev) => !prev);
    setEditingPost(null);
  };

  const handleSubmit = async (values, { resetForm }) => {
    if (!userId) {
      alert("You need to be logged in to submit a post!");
      return;
    }

    try {
      const response = editingPost
        ? await fetch(`http://localhost:3000/users/post/${editingPost.id}`, {
            method: "PUT",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              title: values.title,
              body: values.content,
              user_id: userId,
            }),
          })
        : await fetch("http://localhost:3000/users/post", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              title: values.title,
              body: values.content,
              user_id: userId,
            }),
          });

      if (response.ok) {
        const newPost = await response.json();
        if (editingPost) {
          setPosts((prevPosts) =>
            prevPosts.map((post) => (post.id === newPost.id ? newPost : post))
          );
        } else {
          setPosts((prevPosts) => [newPost, ...prevPosts]);
        }
        resetForm();
        setShowForm(false);
        setEditingPost(null);
      } else {
        console.error("Failed to submit post");
      }
    } catch (error) {
      console.error("Error submitting post:", error);
    }
  };

  const handleEdit = (post) => {
    setEditingPost(post);
    setShowForm(true);
  };

  const handleDelete = async (postId) => {
    try {
      const response = await fetch(
        `http://localhost:3000/users/post/${postId}`,
        {
          method: "DELETE",
        }
      );

      if (response.ok) {
        setPosts((prevPosts) => prevPosts.filter((post) => post.id !== postId));
        console.log("Post deleted successfully");
      } else {
        console.error("Failed to delete post");
      }
    } catch (error) {
      console.error("Error deleting post:", error);
    }
  };

  const validationSchema = Yup.object().shape({
    title: Yup.string().required("Title is required"),
    content: Yup.string().required("Content is required"),
  });

  return (
    <div className="main-page">
      <h1>{editingPost ? "Edit Post" : "Create a Post"}</h1>
      <button onClick={toggleForm} className="toggle-form-button">
        {showForm ? "Cancel" : "Create New Post"}
      </button>

      {/* Show message if user is not logged in */}
      {!userId && <p>Please log in to create a post.</p>}

      {showForm && userId && (
        <Formik
          initialValues={{
            title: editingPost ? editingPost.title : "",
            content: editingPost ? editingPost.body : "",
          }}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
        >
          {({ errors, touched }) => (
            <Form className="post-form">
              <div className="form-field">
                <label htmlFor="title">Title</label>
                <Field
                  name="title"
                  type="text"
                  placeholder="Enter post title"
                />
                {errors.title && touched.title && (
                  <div className="error-message">{errors.title}</div>
                )}
              </div>

              <div className="form-field">
                <label htmlFor="content">Content</label>
                <Field
                  name="content"
                  as="textarea"
                  placeholder="Enter post content"
                  rows="5"
                />
                {errors.content && touched.content && (
                  <div className="error-message">{errors.content}</div>
                )}
              </div>

              <button type="submit" className="submit-button">
                {editingPost ? "Update Post" : "Submit Post"}
              </button>
            </Form>
          )}
        </Formik>
      )}

      {/* Display list of posts */}
      {userId ? (
        <div className="posts-list">
          {posts.map((post) => (
            <div key={post.id} className="post-item">
              <h2 className="post-title">{post.title}</h2>
              <p className="post-content">{post.body}</p>
              <span className="post-user">User id: {post.user_id}</span>
              <br />
              <span className="post-user">User login: {post.user?.login}</span>

              <div className="post-actions">
                <button
                  onClick={() => handleEdit(post)}
                  className="edit-button"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDelete(post.id)}
                  className="delete-button"
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <h2 style={{ color: "red" }}>Log in or create account to view posts</h2>
      )}
    </div>
  );
}
