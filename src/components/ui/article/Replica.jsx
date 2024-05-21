import React from 'react';
import { Typography, Box } from '@mui/material';

export default function Replica({ image, text, isRight, align, height }) {
  return (
    <Box
      display='flex' flexDirection={isRight ? 'row-reverse' : 'row'}
      gap='20px' alignItems={align} width='100%' my='20px'
    >
      <img src={image} alt='Cat' height={height || '100px'}/>
      <Box
        display='flex' flexDirection='row' border='3px solid rgba(255, 255, 255, 5%)'
        gap='20px' alignItems='flex-end' bgcolor='#243541' color='#9BC4CF'
        maxWidth='100%' padding={isRight ? '15px 25px 19px 20px' : '15px 20px 19px 25px'}
        borderRadius={isRight ? '20px 20px 5px 20px' : '20px 20px 20px 5px'}
      >
        <Typography fontSize='14px' fontWeight={575} width='100%' textAlign={isRight ? 'end' : 'left'}>{text}</Typography>
      </Box>
    </Box>
  );
}