import React from "react";
import Header from "./components/Header";
import Hero from "./components/Hero";
import Card from "./components/Card";
import Featured from "./components/Featured";
import HowItWork from "./components/HowItWork";
import Cta from "./components/Cta";
import Footer from "./components/Footer";
import Testimonials from "./components/Testimonials";
import Register from "./components/Register";
import Login from "./components/Login";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";

const MainContent = () => (
  <>
    <Hero />
    <div id="about"><HowItWork /></div>
    <div id="properties"><Featured /></div>
    <div id="services"><Cta /></div>
    <Card />
    <Testimonials />
  </>
);

const App = () => (
  <Router>
    <Header />
    <Routes>
      <Route path="/register" element={<Register />} />
      <Route path="/login" element={<Login />} />
      <Route path="/" element={<MainContent />} />
      {/* Redirect any unknown route to home */}
      <Route path="*" element={<Navigate to="/" />} />
    </Routes>
    <div id="contact">
      <Footer />
    </div>
  </Router>
);

export default App;