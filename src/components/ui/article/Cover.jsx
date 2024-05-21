import React from 'react';
import { Box } from '@mui/material';

export default function Cover({ image }) {
  return (
    <Box
      height='300px'
      sx={{ background: `url(${image}) no-repeat scroll center transparent`, backgroundSize: 'cover' }}
      borderRadius='26px 26px 5px 5px' border='1px solid rgba(255, 255, 255, 5%)'
    />
  );
}