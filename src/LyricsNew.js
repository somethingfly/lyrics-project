import React, { useState } from "react";
import { useNavigate } from "react-router-dom";


function LyricsNew({ lyrics, setLyrics }) {
  const [formPreData, setFormPreData] = useState({
    song: "",
    artist: "",
    text: "",
    preLength: "00:00.000"
  });
  const navigate = useNavigate();

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
  
  function handleSubmit(e) {
    e.preventDefault()
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
    fetch("http://localhost:3001/lyrics", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(formData)
    })
      .then(r => r.json())
      .then(data => {
        const newLyrics = [...lyrics, data];
        setLyrics(newLyrics);
        navigate(`/lyrics/${data.id}`);
      })
  }


  return (
    <section id="form" className="default-container">
      <h3>Add new lyrics</h3>
      <form onSubmit={handleSubmit}>
        <label htmlFor="song">Song:</label>
        <input type="text" id="song" name="song" value={formPreData.song} onChange={handleChange} />

        <label htmlFor="artist">Artist:</label>
        <input type="text" id="artist" name="artist" value={formPreData.artist} onChange={handleChange} />

        <label htmlFor="preLength">Length:</label>
        <input type="text" id="preLength" name="preLength" value={formPreData.preLength} onChange={handleChange} />

        <label htmlFor="text">Lyrics:</label>
        <textarea id="text" name="text" value={formPreData.text} onChange={handleChange} />

        <button type="submit">Submit</button>
      </form>
    </section>
  )
}

export default LyricsNew