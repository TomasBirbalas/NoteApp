import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from "./components/header";
import Footer from "./components/footer";
import Home from "./pages/home";
import LoginUser from "./pages/login";
import ErrorPage from "./pages/errorPage";
import Register from "./pages/register";
import NotesByCategory from "./components/notesByCategory";
import CustomerDetailsPage from "./pages/customerDetails";

function App() {
  return (
    <>
      <Router>
        <Header />
        <div className="main-content">
          <Routes>
            <Route path="/" exact element={<Home />}></Route>
            <Route path="/login" element={<LoginUser />}></Route>
            <Route path="/register" element={<Register />}></Route>
            <Route path="/customer-details" element={<CustomerDetailsPage />}></Route>
            <Route path="/category/:id" element={<NotesByCategory />}></Route>
            <Route path="*" element={<ErrorPage />}></Route>
          </Routes>
        </div>
        <Footer />
      </Router>
    </>
  );
}

export default App;
