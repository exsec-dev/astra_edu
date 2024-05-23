import React from 'react';
import { Typography, Box } from '@mui/material';

export default function Replica({ image, text, isRight, align, height }) {
  return (
    <Box
      display='flex' flexDirection={isRight ? 'row-reverse' : 'row'}
      gap='1.25rem' alignItems={align} width='100%' my='1.25rem'
    >
      <img src={image} alt='Cat' style={{height: height || '6.25rem'}}/>
      <Box
        display='flex' flexDirection='row' border='3px solid rgba(255, 255, 255, 5%)'
        gap='1.25rem' alignItems='flex-end' bgcolor='#243541' color='#9BC4CF'
        maxWidth='100%' padding={isRight ? '0.94rem 1.563rem 1.2rem 1.25rem' : '0.94rem 1.25rem 1.2rem 1.563rem'}
        borderRadius={isRight ? '1.25rem 1.25rem 0.3rem 1.25rem' : '1.25rem 1.25rem 1.25rem 0.3rem'}
      >
        <Typography fontSize='0.875rem' fontWeight={575} width='100%' textAlign={isRight ? 'end' : 'left'}>{text}</Typography>
      </Box>
    </Box>
  );
}