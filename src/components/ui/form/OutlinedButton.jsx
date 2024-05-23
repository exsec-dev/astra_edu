import React from 'react';
import { Button } from '@mui/material';

export const OutlinedButton = ({ label, isRed=false, handleClick, icon, disabled=false, ...otherProps }) => {
    const style = {
        borderColor: isRed ? 'var(--accent-red)' : 'var(--button-color)',
        color: isRed ? 'var(--accent-red) !important' : 'var(--button-color) !important',
        border: '1.5px solid !important',
        borderRadius: '100px',
        padding: '0 2.5rem',
        height: '2.5rem',
        textTransform: 'none',
        fontWeight: '550',
        fontSize: '0.938rem',
        '&:hover': {
            backgroundColor: isRed ? 'var(--accent-red) !important' : 'var(--button-color) !important',
            color: 'var(--bg-color) !important',
            borderColor: isRed ? 'var(--accent-red) !important' : 'var(--button-color) !important',
        }
    };
    return (
        <Button
            sx={{...style, opacity: disabled ? '0.5' : '1', ...otherProps}}
            variant="outlined"
            onClick={handleClick}
            endIcon={icon}
            disabled={disabled}
        >
            {label}
        </Button>
    );
};