import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import {
  Navigation,
  Footer,
  Home,
  About,
  Contacts,
  Portfolio,
  SignUp
} from "./components";

const container = document.getElementById('root');

// Create a root.
const root = ReactDOM.createRoot(container);

// Initial render
root.render(
  <Router>
    <Navigation />
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/Portfolio" element={<Portfolio />} />
      <Route path="/About" element={<About />} />
      <Route path="/Contacts" element={<Contacts />} />
      <Route path="/SignUp" element={<SignUp />} />
    </Routes>
    <Footer />
  </Router>
);