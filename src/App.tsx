import React from "react";
import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Login from "./pages/auth/login";
import Register from "./pages/auth/register";
import Verify from "./pages/auth/verify";
import Dashboard from "./pages/dashboard";
import AuthProvider from "./providers/AuthProvider";
import { ROUTES } from "./constants/routes";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <AuthProvider>
          <Routes>
            <Route path={ROUTES.Login} element={<Login />} />
            <Route path={ROUTES.Register} element={<Register />} />
            <Route path={ROUTES.Verify} element={<Verify />} />
            <Route path={ROUTES.Home} element={<Dashboard />} />
          </Routes>
        </AuthProvider>
      </BrowserRouter>
    </div>
  );
}

export default App;
