import { Route, Routes } from "react-router-dom";
import HomePage from "./pages/HomePage";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import Header from "./components/layout/Header";
import { Toaster } from "react-hot-toast";
import Footer from "./components/layout/Footer";
import MoviesPage from "./pages/MoviesPage";
import UserPrivateRoute from "./privateRoutes/UserPrivateRoute";
import SingleMoviePage from "./pages/SingleMoviePage";

export default function App() {
  return (
    <div>
      <Toaster />

      <Header />

      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/sign-up" element={<RegisterPage />} />
        <Route
          path="/movie-list"
          element={
            <UserPrivateRoute>
              <MoviesPage />
            </UserPrivateRoute>
          }
        />
        <Route
          path="/movie-list/:id"
          element={
            <UserPrivateRoute>
              <SingleMoviePage />
            </UserPrivateRoute>
          }
        />
      </Routes>
      <Footer />
    </div>
  );
}
