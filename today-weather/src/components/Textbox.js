import React from 'react';
import { ThemeContext } from '../App';
import { TextField } from '@material-ui/core';

export default function Textbox(props) {
    const isDarkMode = React.useContext(ThemeContext);
    return (
        <TextField
            label={props.label}
            variant="filled"
            InputProps={{
                style: {
                    borderRadius: "15px",
                    color: isDarkMode ? "white" : "black",
                }, disableUnderline: true
            }}
            InputLabelProps={{
                style: { color: 'grey' },
            }}
            onChange={props.onChange}
            value={props.value}
            fullWidth
        />
    );
}