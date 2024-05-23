import React from 'react';
import { Box } from '@mui/material';

export default function Content({ children }) {
  return (
    <Box sx={{ display: 'flex', gap: '1.5rem', flexDirection: 'column', alignItems: 'flex-start', width: '100%' }}>
        {children}
    </Box>
  );
}