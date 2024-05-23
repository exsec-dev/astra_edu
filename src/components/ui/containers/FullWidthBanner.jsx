import React, { useState } from 'react';
import { Box, Typography } from '@mui/material';
import hello from '../../../icons/robocat/hello.webp';
import pattern from '../../../icons/pattern.svg';
import { FilledButton } from '../form/FilledButton';
import { OutlinedButton } from '../form/OutlinedButton';
import ArrowOutwardRoundedIcon from '@mui/icons-material/ArrowOutwardRounded';
import AuthModal from '../modals/AuthModal';

const bannerStyle = {
    display: 'flex',
    padding: '1.5rem 3.125rem 2rem',
    background: `url(${pattern}) 50% 50%, radial-gradient(100% 100% at 100% 100%, rgba(195, 194, 255, 0.01) 0%, rgba(195, 194, 255, 0.01) 50%, rgba(195, 194, 255, 0) 100%)`,
    backgroundColor: 'var(--main-color)',
    gap: '1.5rem',
    alignItems: 'center',
    border: '#ffffff0d 1px solid',
    borderRadius: '1.5rem',
    color: '#fff',
    width: '100%',
    justifyContent: 'space-between',
    boxShadow: '#00000010 0 0 30px 5px',
}

export default function FullWidthBanner({ isWelcome=false }) {
    const [openModal, setOpenModal] = useState(false);
    const [isLogin, setIsLogin] = useState();

    return (
        <Box sx={bannerStyle}>
            <Box sx={{ display: 'flex', gap: '1.5rem', flexDirection: 'column' }}>
                <Box sx={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-around' }}>
                    <Box sx={{ display: 'flex', alignItems: 'flex-start', flexDirection: 'column', gap: '0.625rem', }}>
                        <Typography sx={{ fontSize: '1.5rem', fontWeight: '800', fontFamily: '"Manrope", sans-serif !important' }}>
                            Погружение в мир <span style={{ color: "var(--astra)" }}>Astra Linux</span> —<br/>обучение в новом формате!
                        </Typography>
                        <Typography sx={{ fontSize: '0.875rem', fontWeight: '400', fontFamily: '"Manrope", sans-serif !important', letterSpacing: '0.035rem' }}>
                            На AstraEdu вы сможете погрузиться в изучение операционной системы Astra Linux через интерактивные и увлекательные уроки с персонажем-наставником
                        </Typography>
                    </Box>
                </Box>
                {isWelcome &&
                    <Box sx={{ display: 'flex', gap: '0.875rem' }}>
                        <FilledButton handleClick={() => { setIsLogin(false); setOpenModal(true); }} label="Начать обучение" icon={<ArrowOutwardRoundedIcon sx={{ fontSize: '1.25rem !important' }}/>}/>
                        <OutlinedButton handleClick={() => { setIsLogin(true); setOpenModal(true); }} label="У меня уже есть аккаунт"/>
                    </Box>
                }
            </Box>
            <Box sx={{ height: '8.75rem', display: 'flex' }}>
                <img src={hello} alt="Robocat" sx={{width: '12.25rem', height: '8.75rem'}}/>
            </Box>
            <AuthModal open={openModal} handleClose={() => setOpenModal(false)} isLogin={isLogin}/>
        </Box>
    );
}