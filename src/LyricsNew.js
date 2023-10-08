import React from "react";
import { useNavigate } from "react-router-dom";

function LyricsNew({ handleSubmit, handleChange, formPreData }) {
  
  const navigate = useNavigate();

  function onHandleSubmit(e) {
    e.preventDefault()
    handleSubmit()
    .then(id => {
      navigate(`/lyrics/${id}`);
    });
  }

  return (
    <section id="form">
      <h3>Add new lyrics</h3>
      <form onSubmit={onHandleSubmit}>
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