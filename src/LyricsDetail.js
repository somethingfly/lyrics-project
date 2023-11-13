import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import LyricsWord from "./LyricsWord"
import { useNavigate } from "react-router-dom";

function LyricsDetail({lyrics, setLyrics}) {
    const [songLyrics, setSongLyrics] = useState(null);
    const { id } = useParams();
    const [modified, setModified] = useState("");
    const navigate = useNavigate();
    const songLyricsOrig = {};

    /*
    useEffect(() => {
        fetch(`http://localhost:3001/lyrics/${id}`)
            .then(r => r.json())
            .then(data => {
                setSongLyrics(data);
            })
    }, [id])
    */

    useEffect(() => {
        const tempSongLyrics = lyrics.find(item => item.id === parseInt(id, 10));
        setSongLyrics(tempSongLyrics);
    }, [lyrics, id])

    if (!songLyrics) return <h2>Loading...</h2>;

    if (!songLyricsOrig.song) {
        Object.assign(songLyricsOrig,songLyrics);
    }

    function changeLyrics(lineIndex, wordIndex, newWord) {
        const newSongLyrics = songLyrics;
        newSongLyrics.lines[lineIndex].words[wordIndex] = newWord;
        setModified("different");
        setSongLyrics(newSongLyrics);
        return
    }

    function timeFormat(time) {
        const startTime = 11 + ((time < 60 * 60000) ? 3 : 0);
        const endTime = 23 - ((time % 1000 === 0) ? 4 : 0);
        return new Date(time).toISOString().slice(startTime, endTime)
    }

    function textFormat() {
        let text = "";
        songLyrics.lines.forEach((line, index) => {
            text += "[" + timeFormat(line.time) + "]";
            line.words.forEach((word) => (text += " " + word));
            text += (index < songLyrics.lines.length - 1) ? "\n": "";
        });
        return text
    }


    const linesList = songLyrics.lines.map((line, lineIndex) => (
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
        const song = songLyrics.song;
        const artist = songLyrics.artist;
        const length = songLyrics.length;
        const lines = songLyrics.lines;
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
                const newLyrics = lyrics;
                newLyrics.push(data);
                setLyrics(newLyrics);
                navigate(`/lyrics/${data.id}`)
            })
    }

    function onUpdate() {
        const text = textFormat();
        const formData = { ...songLyrics, text };
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
                const updatedLyrics = lyrics.map((item) => (item.id === data.id) ? data : item);
                setLyrics(updatedLyrics);
                setSongLyrics(data);
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
                    <h1>{songLyrics.song}</h1>
                    <p>{songLyrics.artist}</p>
                    <p>{timeFormat(songLyrics.length)}</p>
                    <div>{linesList}</div>
                </div>
                {buttons}
           </div>
        </section>
    );
}

export default LyricsDetail;
