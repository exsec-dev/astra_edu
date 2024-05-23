import React, { useEffect, useState } from 'react';
import { Box, Typography } from '@mui/material';
import Widget from '../../../ui/containers/Widget';
import like from '../../../../icons/robocat/like.webp';

export default function MasterpieceBanner({ value }) {
    const [percent, setPercent] = useState(0);
    const label = value > 200 ? "Настоящий профессионал" :
    value > 100 ? "Опытный учитель" : "Начинающий наставник";

    useEffect(() => {
        setPercent(Math.round(value * 100 / 330) || 0);
    }, [value])

    return (
        <Widget
            padding='1.125rem 3.125rem 1rem' gap='3rem'
            sx={{
                justifyContent: 'flex-start',
                flexDirection: 'row',
                width: '100%', minWidth: '31.5rem',
            }}
        >
            <Box display='flex' flexDirection='column' gap='0.25rem' width='100%'>
                <Typography fontWeight={800} fontSize='1.5rem'>Мастерство Котобота</Typography>
                <Typography fontWeight={400} fontSize='0.875rem' sx={{ opacity: '0.5' }}>
                    {label}
                </Typography>
                <Box width='100%' display='flex' justifyContent='space-between' alignItems='center'>
                    <Box width='100%' display='flex' justifyContent='space-between' alignItems='center' position='relative'>
                        <Box height='0.56rem' borderRadius='6.25rem' bgcolor='var(--widget-color)' width='100%'/>
                        <Box
                            height='0.56rem' width={percent + '%'} left='0'
                            borderRadius='6.25rem' bgcolor='var(--done)' top='0'
                            position='absolute' sx={{ transition: 'width ease-in-out 1s' }}
                        />
                    </Box>
                    <Box ml='1.25rem' display='flex' justifyContent='space-between' alignItems='center' sx={{ textWrap: 'nowrap' }}>
                        <Typography fontWeight={700} fontSize='1.25rem' mb='0.19rem'>{percent}</Typography>
                        <Typography fontWeight={700} fontSize='1rem' sx={{opacity: '0.5'}}>/100</Typography>
                    </Box>
                </Box>
            </Box>
            <img src={like} alt='Котобот' style={{width: '5.375rem', height: '5.625rem'}}/>
        </Widget>
    );
}