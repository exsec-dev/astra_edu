import React from 'react';
import reactStringReplace from 'react-string-replace';
import { Typography } from '@mui/material';

export const CodeSpan = ({ children }) => {
  return (
    <Typography
      color='#868D9A' fontFamily='"Source Code Pro", monospace !important' height='1.56rem' px='0.3rem' mx='0.19rem'
      bgcolor='#282A36' display='inline-block' borderRadius='0.31rem' fontWeight={500}
    >
      {children}
    </Typography>
  );
}

export default function Paragraph({ text }) {
  return (
      <Typography fontSize='1rem' fontWeight={375} width='100%' color='#DDDDDD' lineHeight='1.5rem'>
        {reactStringReplace(text, /<(.+?)>/g, (match, i) => (
          <CodeSpan key={i}>{match}</CodeSpan>
        ))}
      </Typography>
  );
}
