import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import NavBar from "./NavBar";
import Home from "./Home";
import About from "./About";
import LyricsList from "./LyricsList";
import LyricsDetail from "./LyricsDetail";
import LyricsNew from "./LyricsNew";

// constraining form, e.g. preLength on LyricsNew (must 00:00:00.000)
// Could put the POST form into App (previous commit shows how) for DRY
// -- is in both LyricsDetail and LyricsNew
// switch to user / client-side encryption for database?
// fix update/add buttons to not be in lyrics-item, without white background

// eventually the lyrics will not be blue rectangles
// instead they will show squiggles when there are possible interpretation
// theme will be white or black, with toggle
// eventually customizable fonts colors / sizes and background
// pinch zoom for mobile will adjust font size
// urls will capture display backgrounds so won't req. login
// url might also capture a separate/choose-able db for content

// also there will be no update or add, it will just be add
// to occur after each word or phrase change
// tap on a word will highlight word, but highlight can be extended

function App() {
  const [lyrics, setLyrics] = useState([]);
    
  useEffect(() => {
      fetch("http://localhost:3001/lyrics")
          .then(r => r.json())
          .then(data => setLyrics(data))
  }, [])
  
  return (
    <Router>
      <NavBar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/lyrics" element={<LyricsList lyrics={lyrics}/>} />
        <Route path="/lyrics/new" element={<LyricsNew lyrics={lyrics} setLyrics={setLyrics}/>} />
        <Route path="/lyrics/:id" element={<LyricsDetail lyrics={lyrics} setLyrics={setLyrics} />} />
        <Route path="*" element={<h1>404 not found</h1>} />
      </Routes>
    </Router>
  );
}

export default App;

/* 
import logo from './logo.svg';
import './App.css';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}

export default App;
*/