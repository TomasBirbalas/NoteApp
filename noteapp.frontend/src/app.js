import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from "./components/header";
import Footer from "./components/footer"

function App() {
  return (
    <>
      <Router>
        <Header />
        <Footer />
        <Routes>
          <Route path="/" exact></Route>
        </Routes>
      </Router>
    </>
  );
}

export default App;
