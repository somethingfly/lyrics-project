import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import NavBar from "./NavBar";
import Home from "./Home";
import About from "./About";
import LyricsList from "./LyricsList";
import LyricsDetail from "./LyricsDetail";
import LyricsNew from "./LyricsNew";

// Need to make it so the the words are editable by clicking
// Need to make the text value parse into the words array.
// constraining form, e.g. preLength on LyricsNew (must 00:00:00.000)
// using text-align left important in css is a bit hackish.

function App() {
  const [formPreData, setFormPreData] = useState({
    song: "",
    artist: "",
    text: "",
    preLength: "00:00.000"
  });

  function handleChange(event) {
    const name = event.target.name;
    let value = event.target.value;

    setFormPreData({
      ...formPreData,
      [name]: value,
    });
  }

  function timeClean(time) {
    const timeSplit = time.split(':');
    let timeClean = (+timeSplit[[timeSplit.length -2]]) * 60000 + (+timeSplit[timeSplit.length -1]  * 1000);
    timeClean += ((timeSplit.length === 3) ? +timeSplit[[timeSplit.length -3]] : 0) * 60 * 60000;
    return timeClean
  }
  
  function handleSubmit() {
    const textSplit = formPreData.text.split('\n');
    const lines = textSplit.map((line) => {
      const tempTime = timeClean(line.substring(line.indexOf("[") + 1, line.indexOf("]")));
      const tempLine = line.substring(line.indexOf("]") + 2);
      const tempLineSplit = tempLine.split(' ');
      const lineClean = {
        "time": tempTime,
        "words": tempLineSplit
      };
      return lineClean
    })
    const length = timeClean(formPreData.preLength);
    const song = formPreData.song;
    const artist = formPreData.artist;
    const text = formPreData.text;
    const formData = { song, artist, text, length, lines }
    return fetch("http://localhost:3001/lyrics", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(formData)
    })
      .then(r => r.json())
      .then(data => {
        return data.id
      })
  }

  return (
    <Router>
      <NavBar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/lyrics" element={<LyricsList />} />
        <Route path="/lyrics/new" element={<LyricsNew
          handleSubmit={handleSubmit}
          handleChange={handleChange}
          formPreData={formPreData}
        />} />
        <Route path="/lyrics/:id" element={<LyricsDetail />} />
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