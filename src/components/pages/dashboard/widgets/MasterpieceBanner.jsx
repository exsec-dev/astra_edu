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
            padding='18px 50px 15px' gap='50px'
            sx={{
                justifyContent: 'flex-start',
                flexDirection: 'row',
                width: '100%', minWidth: '520px',
            }}
        >
            <Box display='flex' flexDirection='column' gap='4px' width='100%'>
                <Typography fontWeight={800} fontSize='25px'>Мастерство Котобота</Typography>
                <Typography fontWeight={400} fontSize='14px' sx={{opacity: '0.5', letterSpacing: '0.03rem' }}>
                    {label}
                </Typography>
                <Box width='100%' display='flex' justifyContent='space-between' alignItems='center'>
                    <Box width='100%' display='flex' justifyContent='space-between' alignItems='center' position='relative'>
                        <Box height='9px' borderRadius='100px' bgcolor='var(--widget-color)' width='100%'/>
                        <Box
                            height='9px' width={percent + '%'} left='0'
                            borderRadius='100px' bgcolor='var(--done)' top='0'
                            position='absolute' sx={{ transition: 'width ease-in-out 1s' }}
                        />
                    </Box>
                    <Box ml='20px' display='flex' justifyContent='space-between' alignItems='center' sx={{ textWrap: 'nowrap' }}>
                        <Typography fontWeight={700} fontSize='20px' mb='3px'>{percent}</Typography>
                        <Typography fontWeight={700} fontSize='16px' sx={{opacity: '0.5'}}>/100</Typography>
                    </Box>
                </Box>
            </Box>
            <img src={like} alt='Котобот' width={86} height={90}/>
        </Widget>
    );
}