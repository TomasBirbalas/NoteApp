import React, { Component } from 'react';
import Logo from './logo';
import SearchBar from './searchBar';

class Header extends Component {
    state = {  } 
    render() { 
        return (
            <div>
                <h1>Hello</h1>
                <Logo />
                <SearchBar />
            </div>
        );
    }
}
 
export default Header;
