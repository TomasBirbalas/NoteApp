import React, { Component } from 'react';
import AppLogo from '../../Images/svg/appLogo.svg'

class Logo extends Component {
    state = {  } 
    render() { 
        return (
            <div className="logo">
                <span className='app-logo-title'><b>App</b>Note</span>
                <span className='app-logo-subtitle'>Some content</span>
                <img src={AppLogo} />
            </div>
        );
    }
}
export default Logo;