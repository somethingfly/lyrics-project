import React from "react";
import { NavLink } from "react-router-dom"

function NavBar() {
    return (
        <nav>
            <NavLink end to="/">Home</NavLink>
            <NavLink to="/about">About</NavLink>
            <NavLink end to="/lyrics">Lyrics</NavLink>
            <NavLink end to="/lyrics/new">Add Lyrics</NavLink>
        </nav>
    );
}

export default NavBar;
