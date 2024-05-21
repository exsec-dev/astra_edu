import React from 'react';
import { Typography, Box } from '@mui/material';

export default function Subtitle({ text }) {
  return (
    <Box mt='15px' mb='5px'>
      <Typography fontSize='18px' fontWeight={800} color='#e9e9ea'>{text}</Typography>
    </Box>
  );
}