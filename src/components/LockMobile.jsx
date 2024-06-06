import React from "react";
import { Box, Typography } from "@mui/material";
import { ScreenRotationRounded } from '@mui/icons-material';

export default function LockMobile() {
    return (
        <Box sx={{
            position: 'fixed', zIndex: '2000', bgcolor: '#000000c2', 
            top: 0, left: 0, right: 0, bottom: 0, backdropFilter: 'blur(15px)',
            display: 'var(--mobile)', alignItems: 'center', justifyContent: 'center', 
        }}>
            <Box display='flex' flexDirection='column' alignItems='center' gap='1.8rem'>
                <ScreenRotationRounded sx={{ fontSize: "9rem", rotate: '45deg', fill: '#fff', animation: 'rot 2.7s ease-in-out infinite',}}/>
                <Typography fontWeight={450} letterSpacing='0.03rem' fontFamily="'Manrope', sans-serif" width='15rem' color='#fff' fontSize='1.2rem' textAlign='center'>Пожалуйста, смените ориентацию экрана</Typography>
            </Box>
        </Box>
    );
}