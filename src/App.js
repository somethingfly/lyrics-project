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

import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import NavBar from "./NavBar";
import Home from "./Home";
import About from "./About";
import LyricsList from "./LyricsList";
import LyricsDetail from "./LyricsDetail";
import NewLyrics from "./NewLyrics";

// Need to make it so the the words are editable by clicking
// Need to make the text value parse into the words array.
// constraining form, e.g. preLength on NewLyrics (must 00:00:00.000)
// using text-align left important in css is a bit hackish.

function App() {
    return (
        <Router>
            <NavBar />
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/about" element={<About />} />
                <Route path="/lyrics" element={<LyricsList />} />
                <Route path="/lyrics/new" element={<NewLyrics />} />
                <Route path="/lyrics/:id" element={<LyricsDetail />} />
                <Route path="*" element={<h1>404 not found</h1>} />
            </Routes>
        </Router>
    );
}

export default App;
