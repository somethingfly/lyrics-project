import React, { useState } from "react";

function LyricsWord({ word, wordIndex, lineIndex, changeLyrics }) {  
  const [finalWord, setFinalWord] = useState(word);

  function promptWord () {
    const newWord = prompt(finalWord,finalWord);
    if (newWord) {
      setFinalWord(newWord);
      changeLyrics(lineIndex, wordIndex, newWord);
    }
  }
 
  return (
    <span className="lines-word" onClick={promptWord}>{finalWord}</span>
  )
}

export default LyricsWord;

