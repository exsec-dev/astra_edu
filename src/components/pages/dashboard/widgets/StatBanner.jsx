import React from 'react';
import { Box, Typography } from '@mui/material';
import Widget from '../../../ui/containers/Widget';
import { ArticleRounded } from '@mui/icons-material';

export default function StatBanner({ modules, levels, achievements }) {
    return (
        <Widget
            padding='1.3rem 2.25rem 1.25rem 1.5rem' gap='1rem'
            sx={{
                flexDirection: 'row', width: '100%', maxWidth: '28.15rem',
            }}
        >
            <Box
                display='flex' alignItems='center' justifyContent='center'
                minWidth='5.625rem' minHeight='5.625rem' bgcolor='var(--second-color)' borderRadius='50%'
            >
                <ArticleRounded sx={{ fill: '#D2D2D2', fontSize: '2.875rem' }}/>
            </Box>
            <Box display='flex' flexDirection='column' width='100%' gap='0.06rem'>
                <Box display='flex' flexDirection='row' justifyContent='space-between' alignItems='center' width='100%'>
                    <Typography fontSize='0.875rem' fontWeight={400} sx={{ opacity: '0.5' }}>
                        Модулей пройдено:
                    </Typography>
                    <Box display='flex' alignItems='baseline'>
                        <Typography fontSize='1.25rem' fontWeight={700}>{modules}</Typography>
                        <Typography fontSize='1rem' fontWeight={700} sx={{ opacity: '0.5' }}>/8</Typography>
                    </Box>
                </Box>
                <Box width='100%' height='0.1rem' bgcolor='var(--second-color)' borderRadius='0.125rem'/>
                <Box display='flex' flexDirection='row' justifyContent='space-between' alignItems='center' width='100%'>
                    <Typography fontSize='0.875rem' fontWeight={400} sx={{ opacity: '0.5' }}>
                        Уровней пройдено:
                    </Typography>
                    <Box display='flex' alignItems='baseline'>
                        <Typography fontSize='1.25rem' fontWeight={700}>{levels}</Typography>
                        <Typography fontSize='1rem' fontWeight={700} sx={{ opacity: '0.5' }}>/11</Typography>
                    </Box>
                </Box>
                <Box width='100%' height='0.1rem' bgcolor='var(--second-color)' borderRadius='0.125rem'/>
                <Box display='flex' flexDirection='row' justifyContent='space-between' alignItems='center' width='100%'>
                    <Typography fontSize='0.875rem' fontWeight={400} sx={{ opacity: '0.5' }}>
                        Достижений получено:
                    </Typography>
                    <Box display='flex' alignItems='baseline'>
                        <Typography fontSize='1.25rem' fontWeight={700}>{achievements}</Typography>
                        <Typography fontSize='1rem' fontWeight={700} sx={{ opacity: '0.5' }}>/22</Typography>
                    </Box>
                </Box>
            </Box>
        </Widget>
    );
}