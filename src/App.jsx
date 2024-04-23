import React from "react";
import { Route, Routes } from "react-router-dom";

import Dashboard from "./pages/Dashboard";
import Table from "./pages/Table";
import AuthLayout from "./components/Layout/AuthLayout";
import GuestLayout from "./components/Layout/GuestLayout";
import Login from "./pages/auth/Login";
import Import from "./pages/Import";
import NotFound from "./pages/NotFound";
import Form from "./pages/Form";


function App() {
  return (
    <Routes>
      <Route path="/" element={<AuthLayout />}>
        <Route path="/" element={<Dashboard />}></Route>
        <Route path="/table" element={<Table />}></Route>
        <Route path="/Import" element={<Import />}></Route>
        <Route path="/404" element={<NotFound />}></Route>
        <Route path="/form" element={<Form />}></Route>
      </Route>
      <Route path="/auth" element={<GuestLayout />}>
        <Route path="/auth/login" element={<Login />}></Route>
      </Route>
    </Routes>
  );
}

export default App;
