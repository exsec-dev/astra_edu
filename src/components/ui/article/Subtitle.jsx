import React from 'react';
import { Typography, Box } from '@mui/material';

export default function Subtitle({ text }) {
  return (
    <Box mt='0.94rem' mb='0.31rem'>
      <Typography fontSize='1.125rem' fontWeight={800} color='#e9e9ea'>{text}</Typography>
    </Box>
  );
}