import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";

// Pages
import Home from "./pages/Home";
import About from "./pages/About";
import Events from "./pages/Events";
import Leaderboard from "./pages/Leaderboard";
import Downloads from "./pages/Downloads";

import NotFound from "./pages/NotFound";

import VideoPlayer from "./pages/VideoPlayer"

// Context
import { AppProvider } from "./context/AppContext";

function App() {
  return (
    <AppProvider>
      <Router>
        <div className="App">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/events" element={<Events />} />
            <Route path="/leaderboard" element={<Leaderboard />} />
            <Route path="/downloads" element={<Downloads />} />
            <Route path="/VideoPlayer" element={<VideoPlayer />} />
            <Route path="*" element={<NotFound />} />

          </Routes>
        </div>
      </Router>
    </AppProvider>
  );
}

export default App;
