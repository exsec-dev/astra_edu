import React from 'react';
import reactStringReplace from 'react-string-replace';
import { Typography, Box } from '@mui/material';
import { CodeSpan } from './Paragraph';

export default function List({ list }) {
  return (
    <Box display='flex' flexDirection='column' gap='0.625rem' my='0.94rem'>
      {
        list?.map((el, i) => {
          return (
            <Box display='flex' pl='0.94rem' gap='0.94rem' position='relative' key={i}>
              <Typography fontSize='1rem' fontWeight={300} color='#DDDDDD90' lineHeight='1.5rem'>—</Typography>
              <Typography fontSize='1rem' fontWeight={375} color='#DDDDDD' lineHeight='1.5rem'>
              {reactStringReplace(el, /<(.+?)>/g, (match, j) => (
                <CodeSpan key={j + 'span'}>{match}</CodeSpan>
              ))}
              </Typography>
            </Box>
          );
        })
      }
    </Box>
  );
}
