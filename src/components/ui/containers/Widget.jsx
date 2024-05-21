import React from 'react';
import { Box } from '@mui/material';

const widgetStyle = {
    background: 'radial-gradient(100% 100% at 100% 100%, rgba(195, 194, 255, 0.03) 0%, rgba(195, 194, 255, 0.03) 50%, rgba(195, 194, 255, 0.01) 100%)',
    backgroundColor: 'var(--main-color)',
    border: '1px solid #ffffff0d',
    borderRadius: '25px',
    boxShadow: '#00000010 0 0 30px 5px',
    fontFamily: '"Manrope", sans-serif !important',
    alignItems: 'center',
    display: 'flex'
}

export default function Widget({ padding, gap, sx, children }) {
  return (
    <Box sx={{ padding, gap, ...widgetStyle, ...sx }}>
        {children}
    </Box>
  );
}