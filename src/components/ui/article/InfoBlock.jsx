import React from 'react';
import { Typography, Box } from '@mui/material';
import { InfoRounded } from '@mui/icons-material';

export default function InfoBlock({ text }) {
  return (
    <Box
      bgcolor='#42536C' border='rgba(255, 255, 255, 5%) 0.2rem solid' borderRadius='0.625rem'
      display='flex' padding='0.94rem 3.44rem 0.94rem 1.56rem' my='0.94rem' position='relative'
    >
      <Typography fontSize='0.875rem' fontWeight={500} width='100%' color='rgba(255, 255, 255, 75%)' lineHeight='1.375rem'>
        {text}
      </Typography>
      <InfoRounded sx={{ opacity: '0.5', position: 'absolute', right: '0.78rem', top: '0.625rem' }}/>
    </Box>
  );
}
