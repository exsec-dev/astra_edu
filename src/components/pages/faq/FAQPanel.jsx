import React from 'react';
import { Box, Typography } from '@mui/material';
import QACollapse from './QACollapse';

export default function FAQPanel({ title, data }) {
  return (
    <Box display='flex' flexDirection='column' gap='20px' width='100%'>
        <Typography fontWeight={600} fontSize='22px'>{title}</Typography>
        <Box display='flex' flexDirection='column' width='100%'>
            {
                data?.map((el, i) => <QACollapse key={i} question={el?.q} answer={el?.a} first={i === 0} last={i === data?.length - 1}/>)
            }
        </Box>
    </Box>
  );
}