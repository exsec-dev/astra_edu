import React from 'react';
import { Typography } from '@mui/material';

export default function PageText({ value }) {
  return (
    <Typography
        sx={{
            fontWeight: '475',
            fontSize: '1rem',
            color: '#f2f2f2e6',
            fontFamily: '"Manrope", sans-serif !important',
            lineHeight: '1.5rem'
        }}>
        {value}
    </Typography>
  );
}