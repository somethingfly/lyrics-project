import React from "react";
import LyricsItem from "./LyricsItem";

function LyricsList({ lyrics }) {

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
        <section id="lyrics" className="default-container">
            <h2>My Lyrics</h2>
            <div id="lyrics-list">{lyricsItems}</div>
        </section>
    );
}

export default LyricsList;
