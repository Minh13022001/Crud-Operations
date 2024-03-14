import { useRoutes } from "react-router-dom";
import MainLayout from "./Layout/MainLayout";
import MovieList from "./pages/MovieList/MovieList";

export default function useRouteElements() {
  const routeElements = useRoutes([
    {
      path: "/",
      element: (
        <MainLayout>
          <MovieList />
        </MainLayout>
      ),
    },
  ]);
  return routeElements;
}
