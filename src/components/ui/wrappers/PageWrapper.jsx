import React from 'react';
import { Box } from '@mui/material';
import Transition from '../../Transition';

export default function PageWrapper({ children, ...otherProps }) {
  return (
    <Transition sx={{ flex: 1, width: '100%', display: 'flex' }}>
      <Box sx={{ display: 'flex', padding: `0 13%`, width: '100%', flex: '1', ...otherProps }}>
          {children}
      </Box>
    </Transition>
  );
}