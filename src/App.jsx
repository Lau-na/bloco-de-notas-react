import React, { useState } from "react";
import { Routes, Route } from "react-router-dom";

import { Template } from "./components/template";
import Notes from "./pages/notes";
import Categories from "./pages/categories";
import Login from "./pages/login";
import Users from "./pages/users";

import getUserRole from "./components/token";

import GlobalSearchContext from "./contexts/globalSearchContext";

function App() {
  const [globalSearch, setGlobalSearch] = useState("");
  const role = getUserRole();
  return (
    <GlobalSearchContext.Provider value={{ globalSearch, setGlobalSearch }}>
      <Routes>
        <Route path="/" element={<Template page={Notes} />} />
        <Route path="/categories" element={<Template page={Categories} />} />
        {role === "admin" && <Route path="/users" element={<Template page={Users} />} />}
        <Route path="/login" element={<Login />} />
      </Routes>
    </GlobalSearchContext.Provider>
  );
}

export default App;
