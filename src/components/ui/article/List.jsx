import React from 'react';
import reactStringReplace from 'react-string-replace';
import { Typography, Box } from '@mui/material';
import { CodeSpan } from './Paragraph';

export default function List({ list }) {
  return (
    <Box display='flex' flexDirection='column' gap='10px' my='15px'>
      {
        list?.map((el, i) => {
          return (
            <Box display='flex' pl='15px' gap='15px' position='relative' key={i}>
              <Typography fontSize='16px' fontWeight={300} color='#DDDDDD90' lineHeight='24px'>—</Typography>
              <Typography fontSize='16px' fontWeight={375} color='#DDDDDD' lineHeight='24px'>
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
