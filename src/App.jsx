import { useState } from "react";
import "./App.css";
import { useSelector } from "react-redux";
import { selectDarkMode } from "./features/darkmodeSlice";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import Main from "./components/Main";
import CountryDetails from "./components/CountryDetails";
import Home from "./pages/Home";
import ChatBot from "./components/ChatBot";
function App() {
  const darkmode = useSelector(selectDarkMode);
  return (
    <Router>
      <div className={`app ${darkmode && "darkmode"}`}>
        <Header />
        <div>
          <ChatBot />
          <Routes>
            <Route path="/country/:id" element={<CountryDetails />} />
            <Route path="/" element={<Home />} />
            <Route path="/all" element={<Main />} />
            <Route path="/chat" element={<ChatBot />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;
