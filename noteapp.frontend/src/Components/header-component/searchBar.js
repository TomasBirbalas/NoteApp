import React, { Component } from 'react';

class SearchBar extends Component {
    state = {  } 
    render() { 
        return (
            <div className='search-bar'>
                <input type="text" placeholder='Search'/>
            </div>
        );
    }
}
 
export default SearchBar;