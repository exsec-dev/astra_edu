import React from 'react';
import { Button } from '@mui/material';

const style = {
    color: 'rgba(255, 255, 255, 50%) !important',
    backgroundColor: 'var(--panel-color) !important',
    borderRadius: '100px',
    padding: '10px 40px',
    height: '40px',
    textTransform: 'none',
    fontWeight: '550',
    fontSize: '14px',
    border: '1px solid rgba(255, 255, 255, 5%)',
    '&:hover': {
        backgroundColor: 'var(--fourth-color) !important',
    }
};

export const FilledGreyButton = ({ label, handleClick, icon, disabled=false, ...otherProps }) => {
    return (
    <Button
        sx={{...style, opacity: disabled ? '0.5' : '1', ...otherProps}}
        variant="filled"
        onClick={handleClick}
        endIcon={icon}
        disabled={disabled}
    >
        {label}
    </Button>
    );
};