import React from 'react';
import LightBackground from '../assets/bg-light.png';
import DarkBackground from '../assets/bg-dark.png';
import { ThemeContext } from '../App';

export default function Background(props) {
    const isDarkMode = React.useContext(ThemeContext);
    return (
        <div style={{
            backgroundImage: `url(${isDarkMode ? DarkBackground : LightBackground})`,
            backgroundPosition: 'center',
            backgroundRepeat: "no-repeat",
            backgroundSize: "cover",
            height: "100vh",
            padding: 20
        }
        }>
            {props.children}
        </div >
    );
}