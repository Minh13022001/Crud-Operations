import { Navigate, Outlet, useRoutes } from "react-router-dom";
import MainLayout from "./Layout/MainLayout";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Student from "./pages/Student";
import { useContext } from "react";
import { AppContext } from "./contexts/app.context";

function ProtectedRoute() {
  const { isAuthenticated } = useContext(AppContext);
  return isAuthenticated ? <Outlet /> : <Navigate to="/login" />;
}

function RejectedRoute() {
  const { isAuthenticated } = useContext(AppContext);
  return !isAuthenticated ? <Outlet /> : <Navigate to="/" />;
}
export default function useRouteElements() {
  const routeElements = useRoutes([
    {
      path: "/login",
      element: <RejectedRoute />,
      children: [
        {
          path: "/login",
          element: <Login />,
        },
      ],
    },
    {
      path: "",
      element: <ProtectedRoute />,
      children: [
        {
          path: "/",
          element: (
            <MainLayout>
              <Home />
            </MainLayout>
          ),
        },
        {
          path: "/students",
          element: (
            <MainLayout>
              <Student />
            </MainLayout>
          ),
        },
      ],
    },
  ]);
  return routeElements;
}
