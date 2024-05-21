import React from 'react';
import { Logo } from '../icons/Logo';
import { Box, AppBar, Typography, Link} from '@mui/material';

const footerStyle = {
    backgroundColor: 'var(--main-color)',
    padding: '35px 150px',
    border: '#ffffff10 solid 0.5px',
    height: '100px',
    display: 'flex',
    justifyContent: 'space-between',
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%',
    marginTop: '50px',
    borderRadius: '12px 12px 0 0',
};

const typoStyle = {
    fontSize: 14,
    fontWeight: '300',
    letterSpacing: '0.03rem',
    lineHeight: '25px',
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
            <Box display='flex' gap='25px' alignItems='center' flexDirection='row' height='30px'>
                <Logo opacity='0.3'/>
                <Typography {...typoStyle}>© 2024  Прожирко Екатерина</Typography>
            </Box>
            <Box display='flex' gap='15px' alignItems='center' flexDirection='row' height='19px'>
                <Link href='https://github.com/exsecantb' target="_blank" rel="noopener" {...typoStyle} sx={linkStyle}>Файлы проекта</Link>
                <Typography {...typoStyle} sx={{ fontSize: '22px', color: '#ffffff40', fontWeight: '100' }}>|</Typography>
                <Link href='https://t.me/exsec2' target="_blank" rel="noopener" {...typoStyle} sx={linkStyle}>Контакты</Link>
                <Typography {...typoStyle} sx={{ fontSize: '22px', color: '#ffffff40', fontWeight: '100' }}>|</Typography>
                <Link href='https://astralinux.ru/' target="_blank" rel="noopener" {...typoStyle} sx={linkStyle}>astralinux.ru</Link>
            </Box>
        </AppBar>
    );
}