import React, { useState } from "react";
import { useNavigate } from "react-router-dom";


function NewLyrics() {
    const [song, setSong] = useState("");
    const [artist, setArtist] = useState("");
    const [text, setText] = useState("");
    const [preLength, setPreLength] = useState("00:00:00.000");

    const navigate = useNavigate();
    
    function handleSubmit(e) {
        e.preventDefault()
        const lengthSplit = preLength.split(':');
        const length = (+lengthSplit[0]) * 60 * 60000 + (+lengthSplit[1]) * 60000 + (+lengthSplit[2] * 1000);
        const lines = [
            {
              "time": 1000,
              "words": [
                "I",
                "still",
                "need"
              ]
            },
            {
              "time": 4000,
              "words": [
                "to",
                "bulid",
                "this"
              ]
            }
          ]
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
                navigate(`/lyrics/${data.id}`)
            })
    }
    
    
    return (
        <section id="form">
            <h3>Add new lyrics</h3>
            <form onSubmit={handleSubmit}>
                <label htmlFor="song">Song:</label>
                <input type="text" id="song" value={song} onChange={e => setSong(e.target.value)} />
                
                <label htmlFor="artist">Artist:</label>
                <input type="text" id="artist" value={artist} onChange={e => setArtist(e.target.value)} />
                
                <label htmlFor="preLength">Length:</label>
                <input type="text" id="preLength" value={preLength} onChange={e => setPreLength(e.target.value)} />

                <label htmlFor="text">Lyrics:</label>
                <textarea id="text" value={text} onChange={e => setText(e.target.value)} />
                
                <button type="submit">Submit</button>
            </form>
        </section>
    )
}

export default NewLyrics