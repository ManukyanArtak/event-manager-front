import React from "react";
import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Login from "./pages/auth/login";
import Register from "./pages/auth/register";
import Verify from "./pages/auth/verify";
import Dashboard from "./pages/dashboard";
import AuthProvider from "./providers/auth/AuthProvider";
import { ROUTES } from "./constants/routes";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

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
      <ToastContainer />
    </div>
  );
}

export default App;
