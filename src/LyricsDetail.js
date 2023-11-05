import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import LyricsWord from "./LyricsWord"
import { useNavigate } from "react-router-dom";

function LyricsDetail() {
    const [lyrics, setLyrics] = useState(null);
    const { id } = useParams();
    const [modified, setModified] = useState("");
    const navigate = useNavigate();
    const lyricsOrig = {};

    useEffect(() => {
        fetch(`http://localhost:3001/lyrics/${id}`)
            .then(r => r.json())
            .then(data => {
                setLyrics(data);
            })
    }, [id])

    if (!lyrics) return <h2>Loading...</h2>;

    if (!lyricsOrig.song) {
        Object.assign(lyricsOrig,lyrics);
    }

    function changeLyrics(lineIndex, wordIndex, newWord) {
        const newLyrics = lyrics;
        newLyrics.lines[lineIndex].words[wordIndex] = newWord;
        setModified("different");
        setLyrics(newLyrics);
        return
    }

    function timeFormat(time) {
        const startTime = 11 + ((time < 60 * 60000) ? 3 : 0);
        const endTime = 23 - ((time % 1000 === 0) ? 4 : 0);
        return new Date(time).toISOString().slice(startTime, endTime)
    }

    function textFormat() {
        let text = "";
        lyrics.lines.forEach((line, index) => {
            text += "[" + timeFormat(line.time) + "]";
            line.words.forEach((word) => (text += " " + word));
            console.log(index, lyrics.lines.length);
            text += (index < lyrics.lines.length - 1) ? "\n": "";
        });
        return text
    }


    const linesList = lyrics.lines.map((line, lineIndex) => (
        <div className="lines" key={line.time}>
            <span>{timeFormat(line.time)}</span>
            {line.words.map((word, wordIndex) => (
                <LyricsWord
                    key={line.time + wordIndex}
                    word={word}
                    wordIndex={wordIndex}
                    lineIndex={lineIndex}
                    changeLyrics={changeLyrics}
                />
            ))}
        </div>
    ));

    function onAdd() {
        const text = textFormat();
        const song = lyrics.song;
        const artist = lyrics.artist;
        const length = lyrics.length;
        const lines = lyrics.lines;
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
                setModified("added!");
                navigate(`/lyrics/${data.id}`)
            })
    }

    function onUpdate() {
        const text = textFormat();
        const formData = { ...lyrics, text };
        fetch(`http://localhost:3001/lyrics/${id}`, {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(formData)
        })
            .then(r => r.json())
            .then(data => {
                setModified("Updated!");
                setLyrics(data)
            })
    }

    let buttons = null

    if (modified === "different") {
        buttons = (
            <div id="ui-button-container">
                <span className="ui-button" id="update" onClick={onUpdate}> Update </span>
                <span className="ui-button" id="add" onClick={onAdd}> Add </span>
            </div>
        )
    } else if (modified) {
        buttons = (
            <div id="ui-button-container">
                <span className="success"> {modified} </span>
            </div>
        )
    }


    return (
        <section id="lyrics-detail">
            <div className="lyrics-item">            
                <div className="default-container">
                    <h1>{lyrics.song}</h1>
                    <p>{lyrics.artist}</p>
                    <p>{timeFormat(lyrics.length)}</p>
                    <div>{linesList}</div>
                </div>
                {buttons}
           </div>
        </section>
    );
}

export default LyricsDetail;
