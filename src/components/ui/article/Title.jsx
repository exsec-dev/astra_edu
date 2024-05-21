import React from 'react';
import { Typography, Box } from '@mui/material';

export default function Title({ text }) {
  return (
    <Box mt='15px' mb='5px' id={text} className='Title'>
      <Typography fontSize='22px' fontWeight={800} color='#e9e9ea'>{text}</Typography>
    </Box>
  );
}