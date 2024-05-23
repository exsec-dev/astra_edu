import React from 'react';
import { Logo } from '../icons/Logo';
import { Box, AppBar, Typography, Link} from '@mui/material';

const footerStyle = {
    backgroundColor: 'var(--main-color)',
    padding: '0 2.8rem',
    border: '#ffffff10 solid 0.5px',
    height: '6.25rem',
    display: 'flex',
    justifyContent: 'space-between',
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%',
    marginTop: '3.25rem',
    borderRadius: '0.75rem 0.75rem 0 0',
};

const typoStyle = {
    fontSize: '0.875rem',
    fontWeight: '300',
    letterSpacing: '0.03rem',
    lineHeight: '1.5rem',
    color: '#ffffff50'
};

const linkStyle = {
    textDecoration: 'none',
    cursor: 'pointer',
    '&:hover': {
        textDecoration: 'underline',
    }
};

export default function Footer() {
    return (
        <AppBar position="sticky" sx={{ ...footerStyle }}>
            <Box display='flex' gap='1.5rem' alignItems='center' flexDirection='row' height='1.75rem'>
                <Logo opacity='0.3'/>
                <Typography {...typoStyle}>© 2024  Прожирко Екатерина</Typography>
            </Box>
            <Box display='flex' gap='1rem' alignItems='center' flexDirection='row' height='1.125rem'>
                <Link href='https://github.com/exsecantb/astra_edu' target="_blank" rel="noopener" {...typoStyle} sx={linkStyle}>Файлы проекта</Link>
                <Typography {...typoStyle} sx={{ fontSize: '1.375rem', color: '#ffffff40', fontWeight: '100' }}>|</Typography>
                <Link href='https://t.me/exsec2' target="_blank" rel="noopener" {...typoStyle} sx={linkStyle}>Контакты</Link>
                <Typography {...typoStyle} sx={{ fontSize: '1.375rem', color: '#ffffff40', fontWeight: '100' }}>|</Typography>
                <Link href='https://astralinux.ru/' target="_blank" rel="noopener" {...typoStyle} sx={linkStyle}>astralinux.ru</Link>
            </Box>
        </AppBar>
    );
}