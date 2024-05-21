import React from 'react';
import { Typography } from '@mui/material';

export default function PageTitle({ value }) {
  return (
    <Typography fontWeight={800} fontSize='2rem' color='#fff'>
        {value}
    </Typography>
  );
}