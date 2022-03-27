import "./App.css";
import { useAuth0 } from "@auth0/auth0-react";
import Profile from "./routes/Profile";
import Navigation from "./components/Navigation";
import { Route, Routes } from "react-router-dom";
import HomePage from "./routes/HomePage";
import NotFound from "./routes/NotFound";
import Menu from "./routes/Menu";
import AddFood from "./routes/AddFood";
import { useState } from "react";

function App() {
  const { user, isAuthenticated, isLoading } = useAuth0();
  const [foodAdded, setFoodAdded] = useState(false);

  return (
    <>
      <Navigation />
      <Routes>
        <Route
          path='/'
          element={
            <HomePage isAuthenticated={isAuthenticated} isLoading={isLoading} />
          }
        />
        <Route path='profile' element={<Profile user={user} />} />
        <Route
          path='menu'
          element={
            <Menu isAuthenticated={isAuthenticated} foodAdded={foodAdded} />
          }
        />
        <Route
          path='admin'
          element={
            <AddFood
              isAuthenticated={isAuthenticated}
              setFoodAdded={setFoodAdded}
            />
          }
        />
        <Route path='*' element={<NotFound />} />
      </Routes>
    </>
  );
}

export default App;
