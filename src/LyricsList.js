import React, { useEffect, useState } from "react";
import LyricsItem from "./LyricsItem";

function LyricsList() {
    const [lyrics, setLyrics] = useState([]);
    
    useEffect(() => {
        fetch("http://localhost:3001/lyrics")
            .then(r => r.json())
            .then(data => setLyrics(data))
    }, [])
    
    const lyricsItems = lyrics.map((lyrics) => (
        <LyricsItem
            key={lyrics.id}
            id={lyrics.id}
            song={lyrics.song}
            artist={lyrics.artist}
            length={lyrics.length}
            text={lyrics.text}
        />
    ));
    
    return (
        <section id="lyrics">
            <h2>My Lyrics</h2>
            <div id="lyrics-list">{lyricsItems}</div>
        </section>
    );
}

export default LyricsList;
