import React from "react";

function About() {
    return (
        <section id="about">
            <h2>About Lyrics</h2>
            <p>
            Lyrics connects to your database of lyrics (we're not going to host it).<br />
            It can also be any database that you can read from--and ideally add lyrics to.
</p>
            <img src="lyrics.svg" alt="lyrics" />
            
<p>
Then, when music is playing on your device (computer, phone, etc.);<br />
Lyrics will read the info being shared about the song being played;<br />
and Lyrics will use that info to find and display the lyrics.
            </p>
            <div>
                <h3>Links</h3>
                <a href="https://github.com/somethingfly/lyrics-project">GitHub</a>
            </div>
        </section>
    );
}

export default About;
