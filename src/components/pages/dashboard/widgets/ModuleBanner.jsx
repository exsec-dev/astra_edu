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
            padding='30px 50px 40px 50px'
            sx={{
                justifyContent: 'space-between',
                flexDirection: 'row', width: '100%',
            }}
        >
            <Box display='flex' flexDirection='column' gap='20px' width='100%'>
                <Box display='flex' flexDirection='row' gap='25px'>
                    <Box display='flex' flexDirection='row' gap='10px' pb='2px' alignItems='center'>
                        <Typography fontWeight={800} fontSize='25px'>Текущий модуль</Typography>
                        <EastRounded sx={{ mt: '4px', fontSize: '35px' }}/>
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
                            gap='10px' padding='7px 35px 7px 30px' bgcolor='var(--widget-color)'
                            sx={{
                                cursor: 'pointer', letterSpacing: '0.03rem',
                                '&:hover': {bgcolor: 'var(--third-color)'},
                                transition: 'background-color .1s linear'
                            }}
                        >
                            <Box height='9px' width='9px' borderRadius='50%' bgcolor={statusMap[status]}/>
                            <Typography fontWeight={500} fontSize='14px'>{title}</Typography>
                        </Box>
                    </MuiLink>
                </Box>
                <Box position='relative' maxWidth={700}>
                    <Box height='9px' borderRadius='100px' bgcolor='var(--widget-color)'/>
                    <Box
                        height='9px' width='0%' left='0'
                        borderRadius='100px' bgcolor='var(--done)' top='0'
                        position='absolute' id="module-bar"
                    />
                </Box>
            </Box>
            <Box display='flex' flexDirection='row' alignItems='flex-end' ml='30px' sx={{ textWrap: 'nowrap' }}>
                <Typography fontWeight={800} fontSize='38px'>{
                    title !== "Введение" ? progress : data?.filter(el => el?.status === 2)?.length * 5
                }</Typography>
                <Typography fontWeight={800} fontSize='26px' sx={{ opacity: '0.5', mb: '5px' }}>{
                    title !== "Введение" ? "/20" : "/10"
                }</Typography>
            </Box>
        </Widget>
    );
}