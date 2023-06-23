import React from 'react';
import { ThemeContext } from '../App';

export default function Text(props) {
    const isDarkMode = React.useContext(ThemeContext);

    let color = 'black';
    if (isDarkMode) {
        if (props.hugeTemp || props.city || props.cityInfo || props.subTitle) {
            color = 'white'
        } else if (props.timing) {
            color = '#93909f'
        }
    } else {
        if (props.hugeTemp) {
            color = '#6c40b5'
        } else if (props.city || props.cityInfo) {
            color = '#808080'
        }
    }

    return (
        <p
            style={{
                fontSize: props.hugeTemp ? 72 : 16,
                fontWeight: props.hugeTemp || props.city ? 'bold' : 600,
                color: color,
                margin: props.hugeTemp ? "-25px 0 -15px 0" : 0
            }}
        >
            {props.value}
        </p>
    );
}