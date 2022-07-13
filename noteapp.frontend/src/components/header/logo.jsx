import React, { Component } from 'react';
import LogoSvg from '../../images/Logo.png';

class Logo extends React.Component {
    render() { 
        return (
            <div className="logo">
                <img src={LogoSvg} alt="NoteApp logotype" />
                <h1 className="LogoTitle"><b>Note</b>App</h1>
            </div>
        );
    }
}
 
export default Logo;