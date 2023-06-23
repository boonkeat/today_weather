import React from 'react';
import { ThemeContext } from '../App';
import { IconButton } from '@material-ui/core';
import { Delete, Search } from '@material-ui/icons';

export default function Button(props) {
    const isDarkMode = React.useContext(ThemeContext);

    let style = {}
    if (!props.isRowItem) {
        style = { backgroundColor: isDarkMode ? "#28124d" : "#6c40b5", color: 'white' }
    } else {
        style = { backgroundColor: isDarkMode ? "#272240" : "white", color: isDarkMode ? "#93909f" : '#808080' }
        if (isDarkMode) {
            style['border'] = "3px solid #93909f";
        }
    }
    if (!props.isRowItem) {
        style['borderRadius'] = "20%";
    }
    return (

        <IconButton
            onClick={props.onClick}
            aria-label={props.type}
            variant="contained"
            style={style}
            size={props.isRowItem ? 'small' : 'medium'}
        >
            {
                props.type === "search" ? <Search /> : <Delete />
            }
        </IconButton>
    );
}