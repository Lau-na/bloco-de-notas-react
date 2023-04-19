import React, { useState } from "react";
import { Routes, Route } from "react-router-dom";
import { Container } from "react-bootstrap";

import Header from "./components/header/header";

import Notes from "./pages/notes";
import Categories from "./pages/categories";

import GlobalSearchContext from "./contexts/globalSearchContext";

function App() {
  const [globalSearch, setGlobalSearch] = useState("");
  return (
    <GlobalSearchContext.Provider value={{ globalSearch, setGlobalSearch }}>
      <div className="h-100">
        <Header />
        <div className="h-100 py-4">
          <Container
            className="bg-white p-5 shadow"
            style={{ minHeight: "85%" }}
          >
            <Routes>
              <Route path="/" element={<Notes />} />
              <Route path="/categories" element={<Categories />} />
            </Routes>
          </Container>
        </div>
      </div>
    </GlobalSearchContext.Provider>
  );
}

export default App;
