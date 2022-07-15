import React from "react";
import { Link } from "react-router-dom";

import "../stylesheets/css/footer.min.css"

function Footer() {
  return (
    <footer>
      <span>
        2022 Ⓒ Visos teisės saugomos | <Link to="/">NoteApp</Link>
      </span>
    </footer>
  );
}

export default Footer;
