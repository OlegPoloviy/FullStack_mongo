import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import RegisterForm from "../pages/RegisterPage";
import LoginForm from "../pages/LoginPage";
import { MainPage } from "../pages/MainPage";

export const router = createBrowserRouter([
  {
    path: "/",
    Component: App,
    children: [
      {
        path: "/",
        Component: MainPage,
      },
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
