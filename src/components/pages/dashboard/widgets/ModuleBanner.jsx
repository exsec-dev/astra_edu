import React, { useEffect } from 'react';
import { Box, Typography, Link as MuiLink } from '@mui/material';
import { animate } from 'framer-motion';
import { Link } from 'react-router-dom';
import Widget from '../../../ui/containers/Widget';
import { EastRounded } from '@mui/icons-material';
import { statusMap } from '../../module/Module';

export default function ModuleBanner({ data, index, title, status, progress, percentage }) {
    useEffect(() => {
        const bar = document.getElementById("module-bar")
        animate(bar, { width: `${percentage}%` }, { duration: 1 })
    }, [percentage])

    return (
        <Widget
            padding='1.875rem 2.3rem 2.5rem 3.125rem'
            sx={{
                justifyContent: 'space-between',
                flexDirection: 'row', width: '100%',
            }}
        >
            <Box display='flex' flexDirection='column' gap='1.25rem' width='100%'>
                <Box display='flex' flexDirection='row' gap='0.8rem' alignItems='center'>
                    <Box display='flex' flexDirection='row' gap='0.625rem' pb='0.125rem' alignItems='center'>
                        <Typography fontWeight={800} fontSize='1.563rem'>Текущий модуль</Typography>
                        <EastRounded sx={{ mt: '0.25rem', fontSize: '2.19rem' }}/>
                    </Box>
                    <MuiLink
                        component={Link}
                        to={`/module?name=` + title}
                        sx={{
                            color: '#fff', textDecoration: 'none',
                            fontWeight: '500', display: 'flex',
                            pointerEvents: status === 0 ? 'none' : 'auto'
                        }}
                    >
                        <Box
                            display='flex' flexDirection='row' alignItems='center' borderRadius='100px'
                            gap='0.625rem' padding='0.5rem 1.8rem 0.5rem 1.475rem' bgcolor='var(--widget-color)'
                            sx={{
                                cursor: 'pointer', letterSpacing: '0.03rem',
                                '&:hover': {bgcolor: 'var(--third-color)'},
                                transition: 'background-color .1s linear', maxHeight: '2.9rem'
                            }}
                        >
                            <Box height='0.56rem' width='0.56rem' borderRadius='50%' bgcolor={statusMap[status]}/>
                            <Typography fontWeight={500} fontSize='0.8rem' sx={{ textWrap: 'nowrap' }}>{title}</Typography>
                        </Box>
                    </MuiLink>
                </Box>
                <Box position='relative'>
                    <Box height='0.56rem' borderRadius='100px' bgcolor='var(--widget-color)'/>
                    <Box
                        height='0.56rem' width='0%' left='0'
                        borderRadius='100px' bgcolor='var(--done)' top='0'
                        position='absolute' id="module-bar"
                    />
                </Box>
            </Box>
            <Box display='flex' flexDirection='row' alignItems='flex-end' ml='1.5rem' sx={{ textWrap: 'nowrap' }}>
                <Typography fontWeight={800} fontSize='2.375rem'>{
                    title !== "Введение" ? progress : data?.filter(el => el?.status === 2)?.length * 5
                }</Typography>
                <Typography fontWeight={800} fontSize='1.625rem' sx={{ opacity: '0.5', mb: '0.31rem' }}>{
                    title !== "Введение" ? "/20" : "/10"
                }</Typography>
            </Box>
        </Widget>
    );
}