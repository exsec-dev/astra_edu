import React from 'react';
import { Box } from '@mui/material';

export default function Cover({ image }) {
  return (
    <Box
      height='18.75rem'
      sx={{ background: `url(${image}) no-repeat scroll center transparent`, backgroundSize: 'cover' }}
      borderRadius='1.625rem 1.625rem 0.3rem 0.3rem' border='1px solid rgba(255, 255, 255, 5%)'
    />
  );
}