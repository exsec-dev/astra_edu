import React from 'react';
import { Typography, Box } from '@mui/material';
import { InfoRounded } from '@mui/icons-material';

export default function InfoBlock({ text }) {
  return (
    <Box
      bgcolor='#42536C' border='rgba(255, 255, 255, 5%) 3px solid' borderRadius='10px'
      display='flex' padding='15px 55px 15px 25px' my='15px' position='relative'
    >
      <Typography fontSize='14px' fontWeight={500} width='100%' color='rgba(255, 255, 255, 75%)' lineHeight='22px'>
        {text}
      </Typography>
      <InfoRounded sx={{ opacity: '0.5', position: 'absolute', right: '12.5px', top: '10px' }}/>
    </Box>
  );
}
