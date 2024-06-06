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
      bgcolor='#2B2E3B' border='#383B4A 0.18rem solid' borderRadius='0.625rem'
      display='flex' padding='0.94rem 1.56rem' my='0.94rem' position='relative'
    >
      <Typography
        fontSize='1rem' fontWeight={500} width='100%' color='#85899A' fontFamily='"Source Code Pro", monospace !important'
        lineHeight='1.625rem' whiteSpace='pre-wrap' letterSpacing='0.01rem'
      >
        {replaceStr(text)}
      </Typography>
      {canCopy && <ContentCopyRounded
        sx={{
          position: 'absolute', color: '#fff',
          opacity: '0.25', '&:hover': { opacity: '0.5' },
          right: '0.78rem', top: '0.625rem', cursor: 'pointer',
          transition: 'opacity .1s linear'
        }}
        onClick={() => navigator.clipboard.writeText(text?.replace(/!(.+?)!/g, '')?.split('\n')?.[0] || "")}
      />}
    </Box>
  );
}
