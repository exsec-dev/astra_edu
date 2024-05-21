import React from 'react';
import { Box, Typography } from '@mui/material';
import Widget from '../../../ui/containers/Widget';
import { ArticleRounded } from '@mui/icons-material';

export default function StatBanner({ modules, levels, achievements }) {
    return (
        <Widget
            padding='21px 35px 21px 25px' gap='20px'
            sx={{
                flexDirection: 'row', width: '100%', maxWidth: '450px',
            }}
        >
            <Box
                display='flex' alignItems='center' justifyContent='center'
                minWidth='90px' minHeight='90px' bgcolor='var(--second-color)' borderRadius='50%'
            >
                <ArticleRounded sx={{ fill: '#D2D2D2', fontSize: '46px' }}/>
            </Box>
            <Box display='flex' flexDirection='column' width='100%' gap='1px'>
                <Box display='flex' flexDirection='row' justifyContent='space-between' alignItems='center' width='100%' letterSpacing='0.03rem'>
                    <Typography fontSize='14px' fontWeight={400} sx={{ opacity: '0.5' }}>
                        Модулей пройдено:
                    </Typography>
                    <Box display='flex' alignItems='baseline'>
                        <Typography fontSize='20px' fontWeight={700}>{modules}</Typography>
                        <Typography fontSize='16px' fontWeight={700} sx={{ opacity: '0.5' }}>/8</Typography>
                    </Box>
                </Box>
                <Box width='100%' height='1.5px' bgcolor='var(--second-color)' borderRadius='2px'/>
                <Box display='flex' flexDirection='row' justifyContent='space-between' alignItems='center' width='100%' letterSpacing='0.03rem'>
                    <Typography fontSize='14px' fontWeight={400} sx={{ opacity: '0.5' }}>
                        Уровней пройдено:
                    </Typography>
                    <Box display='flex' alignItems='baseline'>
                        <Typography fontSize='20px' fontWeight={700}>{levels}</Typography>
                        <Typography fontSize='16px' fontWeight={700} sx={{ opacity: '0.5' }}>/11</Typography>
                    </Box>
                </Box>
                <Box width='100%' height='1.5px' bgcolor='var(--second-color)' borderRadius='2px'/>
                <Box display='flex' flexDirection='row' justifyContent='space-between' alignItems='center' width='100%' letterSpacing='0.03rem'>
                    <Typography fontSize='14px' fontWeight={400} sx={{ opacity: '0.5' }}>
                        Достижений получено:
                    </Typography>
                    <Box display='flex' alignItems='baseline'>
                        <Typography fontSize='20px' fontWeight={700}>{achievements}</Typography>
                        <Typography fontSize='16px' fontWeight={700} sx={{ opacity: '0.5' }}>/22</Typography>
                    </Box>
                </Box>
            </Box>
        </Widget>
    );
}