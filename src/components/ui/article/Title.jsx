import React from 'react';
import { Typography, Box } from '@mui/material';

export default function Title({ text }) {
  return (
    <Box mt='0.94rem' mb='0.31rem' id={text} className='Title'>
      <Typography fontSize='1.375rem' fontWeight={800} color='#e9e9ea'>{text}</Typography>
    </Box>
  );
}