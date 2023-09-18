import React from "react";
import { Link } from "react-router-dom";

function LyricsItem({ id, song, artist, text }) {

  /*
  const linesList = lines.map((line) => (
    <div className="lines" key={line.time}>
      <div>{line.time}</div>
      {line.words.map((word, index) => (
          <span key={line.time + index}>{word}</span>
      ))}
    </div>
    ));

  */

  const textFormat = text.split("\n").map((line) => (
     <p className="line">{line}</p>
  ));
     
  return (
    <div className="lyrics-item">
      <h3>{song}</h3>
      <p>{artist}</p>
      {textFormat}
      <Link to={`/lyrics/${id}`}>Edit</Link>
    </div>
  );
}

export default LyricsItem;
