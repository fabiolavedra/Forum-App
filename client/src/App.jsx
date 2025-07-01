import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";
import AuthView from "./views/AuthView";
import Fyp from "./views/Fyp";
import Profile from "./views/Profile";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<AuthView />} path="/login"></Route>
        <Route element={<Fyp />} path="/fyp"></Route>
        <Route element={<Profile />} path="/profile"></Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
