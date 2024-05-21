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
    padding: '25px 50px 32px',
    background: `url(${pattern}) 50% 50%, radial-gradient(100% 100% at 100% 100%, rgba(195, 194, 255, 0.01) 0%, rgba(195, 194, 255, 0.01) 50%, rgba(195, 194, 255, 0) 100%)`,
    backgroundColor: 'var(--main-color)',
    gap: '25px',
    alignItems: 'center',
    border: '#ffffff0d 1px solid',
    borderRadius: '25px',
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
            <Box sx={{ display: 'flex', gap: '25px', flexDirection: 'column' }}>
                <Box sx={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-around' }}>
                    <Box sx={{ display: 'flex', alignItems: 'flex-start', flexDirection: 'column', gap: '10px', }}>
                        <Typography sx={{ fontSize: '24px', fontWeight: '800', fontFamily: '"Manrope", sans-serif !important' }}>
                            Погружение в мир <span style={{ color: "var(--astra)" }}>Astra Linux</span> —<br/>обучение в новом формате!
                        </Typography>
                        <Typography sx={{ fontSize: '14px', fontWeight: '400', fontFamily: '"Manrope", sans-serif !important', letterSpacing: '0.56px' }}>
                            На AstraEdu вы сможете погрузиться в изучение операционной системы Astra Linux через интерактивные и увлекательные уроки с персонажем-наставником
                        </Typography>
                    </Box>
                </Box>
                {isWelcome &&
                    <Box sx={{ display: 'flex', gap: '15px' }}>
                        <FilledButton handleClick={() => { setIsLogin(false); setOpenModal(true); }} label="Начать обучение" icon={<ArrowOutwardRoundedIcon />}/>
                        <OutlinedButton handleClick={() => { setIsLogin(true); setOpenModal(true); }} label="У меня уже есть аккаунт"/>
                    </Box>
                }
            </Box>
            <Box sx={{ height: '140px', display: 'flex' }}>
                <img src={hello} alt="Robocat" width={196} height={140}/>
            </Box>
            <AuthModal open={openModal} handleClose={() => setOpenModal(false)} isLogin={isLogin}/>
        </Box>
    );
}