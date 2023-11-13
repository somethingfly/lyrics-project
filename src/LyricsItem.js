import React from "react";
import { Link } from "react-router-dom";

function LyricsItem({ key, id, song, artist, text }) {

  const textFormat = text.split("\n").map((line) => (
     <p className="line">{line}</p>
  ));
     
  return (
    <div className="lyrics-item" key={key} id={id}>
      <h3>{song}</h3>
      <p>{artist}</p>
      {textFormat}
      <Link to={`/lyrics/${id}`}>Edit</Link>
    </div>
  );
}

export default LyricsItem;
