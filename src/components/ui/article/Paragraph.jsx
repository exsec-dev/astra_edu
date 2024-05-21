import React from 'react';
import reactStringReplace from 'react-string-replace';
import { Typography } from '@mui/material';

export const CodeSpan = ({ children }) => {
  return (
    <Typography
      color='#868D9A' fontFamily='Consolas !important' height='25px' px='5px' mx='3px'
      bgcolor='#282A36' display='inline-block' borderRadius='5px'
    >
      {children}
    </Typography>
  );
}

export default function Paragraph({ text }) {
  return (
      <Typography fontSize='16px' fontWeight={375} width='100%' color='#DDDDDD' lineHeight='24px'>
        {reactStringReplace(text, /<(.+?)>/g, (match, i) => (
          <CodeSpan key={i}>{match}</CodeSpan>
        ))}
      </Typography>
  );
}
