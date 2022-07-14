import React from "react";
import Logo from "./logo";
import SearchBar from "./searchBar";
import "../stylesheets/css/header.min.css";
import MyAccountMenu from "./accountSymbol";
function Header() {
  return (
    <header>
      <Logo />
      <SearchBar />
      <MyAccountMenu />
    </header>
  );
}

export default Header;
