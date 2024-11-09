import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import RegisterForm from "../pages/RegisterPage";
import LoginForm from "../pages/LoginPage";

export const router = createBrowserRouter([
  {
    path: "/",
    Component: App,
    children: [
      {
        path: "/register",
        Component: RegisterForm,
      },
      {
        path: "/login",
        Component: LoginForm,
      },
    ],
  },
]);
