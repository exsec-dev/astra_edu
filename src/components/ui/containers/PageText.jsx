import React from 'react';
import { Typography } from '@mui/material';

export default function PageText({ value }) {
  return (
    <Typography
        sx={{
            fontWeight: '475',
            fontSize: '16px',
            color: '#f2f2f2e6',
            fontFamily: '"Manrope", sans-serif !important',
            lineHeight: '24px'
        }}>
        {value}
    </Typography>
  );
}