import { useRoutes } from "react-router-dom";
import MainLayout from "./Layout/MainLayout";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Student from "./pages/Student";

export default function useRouteElements() {
  const routeElements = useRoutes([
    {
      path: "/",
      element: (
        <MainLayout>
          <Home/>
        </MainLayout>
      ),
    },
    {
      path: "/login",
      element: (
        <Login/>
      ),
    },
    {
      path: "/students",
      element: (
        <MainLayout>
          <Student/>
        </MainLayout>
      ),
    }
  ]);
  return routeElements;
}
