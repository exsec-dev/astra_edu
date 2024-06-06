import React from 'react';

export default function Image({ image }) {
  return (
    <img
      width='100%'
      style={{ borderRadius: '1.625rem', border: '1px solid rgba(255, 255, 255, 5%)', margin: '1rem 0' }}
      src={image}
      alt='Img'
    />
  );
}