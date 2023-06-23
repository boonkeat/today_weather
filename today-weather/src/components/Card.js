import React from 'react';
import { ThemeContext } from '../App';
import { Card } from '@material-ui/core';

export default function ThemeCard(props) {
    const isDarkMode = React.useContext(ThemeContext);
    return (
        <Card style={{
            borderRadius: 20,
            backgroundColor: isDarkMode ? props.mainCard ? '#4b3590' : props.itemCard ? '#2b2343' : '#3c2d6c' : props.mainCard ? '#c1aae9' : props.itemCard ? '#e5daf5' : '#d5c1ef',
            padding: props.mainCard ? '25px 20px' : '15px 20px',
            marginTop: props.itemCard ? 15 : 0,
            overflow: props.overflow
        }}>
            {props.children}
        </Card>
    );
}