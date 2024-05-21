import React from 'react';
import { Typography, Box } from '@mui/material';
import reactStringReplace from 'react-string-replace';
import { ContentCopyRounded } from '@mui/icons-material';

const replaceStr = (text) => {
  let replacedText = reactStringReplace(text, /!(.+?)!/g, (match, i) => (
    <b key={i} style={{ fontWeight: '700' }}>{match}</b>
  ));
  replacedText = reactStringReplace(replacedText, /<lb>(.+?)<\/lb>/g, (match, i) => (
    <span key={i + 'lb'} style={{ color: '#00dcff' }}>{match}</span>
  ));
  return reactStringReplace(replacedText, /<b>(.+?)<\/b>/g, (match, i) => (
    <span key={i + 'b'} style={{ color: '#4371ff' }}>{match}</span>
  ));
};

export default function CodeBlock({ text, canCopy=false }) {
  return (
    <Box
      bgcolor='#2B2E3B' border='#383B4A 3px solid' borderRadius='10px'
      display='flex' padding='15px 25px' my='15px' position='relative'
    >
      <Typography
        fontSize='16px' fontWeight={500} width='100%' color='#85899A' fontFamily='Consolas !important'
        lineHeight='26px' whiteSpace='pre-wrap' letterSpacing='0.01rem'
      >
        {replaceStr(text)}
      </Typography>
      {canCopy && <ContentCopyRounded
        sx={{
          position: 'absolute', color: '#fff',
          opacity: '0.25', '&:hover': { opacity: '0.5' },
          right: '12.5px', top: '10px', cursor: 'pointer',
          transition: 'opacity .1s linear'
        }}
        onClick={() => navigator.clipboard.writeText(text?.replace(/!(.+?)!/g, '')?.split('\n')?.[0] || "")}
      />}
    </Box>
  );
}
