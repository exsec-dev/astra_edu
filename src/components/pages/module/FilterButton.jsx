import React from 'react';
import { Button, } from '@mui/material';

const styleClicked = {
    color: 'var(--main-color) !important',
    backgroundColor: 'var(--button-color) !important',
    outline: '1.5px var(--button-color) solid !important',
    borderRadius: '100px',
    padding: '10px 25px',
    height: '38px',
    textTransform: 'none',
    fontWeight: '500',
    fontSize: '13px',
};

const styleNotClicked = {
    outline: '1.5px var(--button-color) solid !important',
    color: 'var(--button-color) !important',
    opacity: '0.5',
    borderRadius: '100px',
    padding: '10px 25px',
    height: '38px',
    textTransform: 'none',
    fontWeight: '500',
    fontSize: '13px',
    '&:hover': {
        backgroundColor: 'var(--button-color) !important',
        color: 'var(--bg-color) !important',
        borderColor: 'var(--button-color) !important',
        opacity: '1',
    }
};

export default function FilterButton({ handleClick, isClicked, label, disabled=false }) {
  return (
    <Button
        sx={isClicked ? styleClicked : styleNotClicked}
        onClick={handleClick}
        disabled={disabled}
    >
        {label}
    </Button>
  );
}