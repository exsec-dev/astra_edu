import React from 'react';
import { Box } from '@mui/material';

export default function Content({ children }) {
  return (
    <Box sx={{ display: 'flex', gap: '25px', flexDirection: 'column', alignItems: 'flex-start', width: '100%' }}>
        {children}
    </Box>
  );
}