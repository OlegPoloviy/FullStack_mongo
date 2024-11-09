import React, { useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import "./LoginPage.css"; // Optional: add a CSS file for custom styling

// Define the validation schema
const validationSchema = Yup.object().shape({
  login: Yup.string()
    .min(3, "Username must be at least 3 characters")
    .required("Username is required"),
  pass: Yup.string()
    .min(8, "Password must be at least 8 characters")
    .required("Password is required"),
});

const LoginForm = () => {
  const [statusMessage, setStatusMessage] = useState("");

  const loginUser = async (data) => {
    try {
      const response = await fetch("http://localhost:3000/users/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      if (response.ok) {
        setStatusMessage("Login successful!");
      } else {
        const result = await response.json();
        setStatusMessage(result.error || "Login failed. Please try again.");
      }
    } catch (err) {
      console.error("Error logging in:", err);
      setStatusMessage("An error occurred. Please try again.");
    }
  };

  return (
    <div className="form-container">
      <h2>Login</h2>
      {statusMessage && <p className="status-message">{statusMessage}</p>}
      <Formik
        initialValues={{ login: "", pass: "" }}
        validationSchema={validationSchema}
        onSubmit={(values, { setSubmitting, resetForm }) => {
          setSubmitting(true);
          loginUser(values).finally(() => {
            setSubmitting(false);
            resetForm();
          });
        }}
      >
        {({ isSubmitting }) => (
          <Form className="form">
            <div className="form-field">
              <label htmlFor="login">Username</label>
              <Field name="login" type="text" placeholder="Enter username" />
              <ErrorMessage
                name="login"
                component="div"
                className="error-message"
              />
            </div>

            <div className="form-field">
              <label htmlFor="pass">Password</label>
              <Field name="pass" type="password" placeholder="Enter password" />
              <ErrorMessage
                name="pass"
                component="div"
                className="error-message"
              />
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className="submit-button"
            >
              {isSubmitting ? "Logging in..." : "Login"}
            </button>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default LoginForm;
