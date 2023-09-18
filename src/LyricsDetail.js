import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom"

function LyricsDetail() {
    const [lyrics, setLyrics] = useState(null);
    const { id } = useParams()
    
    useEffect(() => {
        fetch(`http://localhost:3001/lyrics/${id}`)
            .then(r => r.json())
            .then(data => setLyrics(data))
    }, [id])
    
    if (!lyrics) return <h2>Loading...</h2>;

    const { song, artist, length, lines } = lyrics;

    const linesList = lines.map((line) => (
        <div className="lines" key={line.time}>
          <div>{new Date(line.time).toISOString().slice(11,23)}</div>
          {line.words.map((word, index) => (
              <span key={line.time + index}>{word}</span>
          ))}
        </div>
        ));

    return (
        <section>
            <div className="lyrics-item">
                <h1>{song}</h1>
                <p>{artist}</p>
                <div>{linesList}</div>
                <p>{new Date(length).toISOString().slice(11,23)}</p>
            </div>
        </section>
    );
}

export default LyricsDetail;
