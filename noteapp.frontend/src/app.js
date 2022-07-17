import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from "./components/header";
import Footer from "./components/footer";
import Home from "./pages/home";
import LoginUser from "./pages/login";
import ErrorPage from "./pages/errorPage";
import Register from "./pages/register";
import EditNote from "./components/editNote";
import CreateNote from "./pages/createNote";

function App() {
  return (
    <>
      <Router>
        <Header />
        <div className="main-content">
          <Routes>
            <Route path="/" exact element={<Home />}></Route>
            <Route path="/createNote" exact element={<CreateNote />}></Route>
            <Route path="/login" element={<LoginUser />}></Route>
            <Route path="/register" element={<Register />}></Route>
            <Route path="/editNote/:id" component={EditNote}></Route>
          </Routes>
        </div>
        <Footer />
      </Router>
    </>
  );
}

export default App;
