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


     function timeFormat(time) {
        const startTime = 11 + ((time < 60 * 60000) ? 3 : 0);
        const endTime = 23 - ((time % 1000 === 0) ? 4 : 0)
       return new Date(time).toISOString().slice(startTime,endTime)
    }
    

    
    const linesList = lines.map((line) => (
        <div className="lines" key={line.time}>
          <span>{timeFormat(line.time)}</span>
          {line.words.map((word, index) => (
              <span key={line.time + index} className="lines-word">{word}</span>
          ))}
        </div>
        ));

    return (
        <section>
            <div className="lyrics-item">
                <h1>{song}</h1>
                <p>{artist}</p>
                <p>{timeFormat(length)}</p>
                <div>{linesList}</div>
            </div>
        </section>
    );
}

export default LyricsDetail;
