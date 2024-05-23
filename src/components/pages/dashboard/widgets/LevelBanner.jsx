import React, { useEffect, useState, useLayoutEffect } from 'react';
import { PieChart } from '@mui/x-charts';
import { Box, Typography } from '@mui/material';
import Widget from '../../../ui/containers/Widget';
import sparks from '../../../../icons/badges/sparks.webp';

export default function LevelBanner({ level, points, levelPoints }) {
    const [percent, setPercent] = useState(0);
    const [remValue, setRemValue] = useState(16);

    useEffect(() => {
        setPercent((points / levelPoints) || 0);
    }, [points, levelPoints]);

    useLayoutEffect(() => {
        const getRemInPx = () => {    
            setRemValue(parseFloat(getComputedStyle(document.documentElement).fontSize));
        };
        window.addEventListener('resize', getRemInPx);
        getRemInPx();
        return () => window.removeEventListener('resize', getRemInPx);
    }, []);

    return (
        <Widget
            padding='0.56rem 1.875rem 0.56rem 1.56rem' gap='0.94rem'
            sx={{
                justifyContent: 'center',
                flexDirection: 'row',
            }}
        >
            <Box display='flex' flexDirection='column' gap='20px' width='100%' position='relative' sx={{ transform: `scale(${remValue / 16})` }}>
                <Box
                    width='85px' height='85px'
                    bgcolor='var(--widget-color)' borderRadius='50%'
                    position='absolute' top='0'
                    sx={{ '&::after': {
                        content: '""', bgcolor: '#1f2026',
                        width: '65px', height: '65px', position: 'relative',
                        borderRadius: '50%', display: 'block',
                        top: '10px', left: '10px',
                    }}}
                />
                <PieChart
                    width={85} height={85} tooltip={null}
                    sx={{ '& .MuiPieArc-root': { stroke: 'unset' }}}
                    series={[{
                        data: [{id: 'percent', value: 65, color: 'var(--done)'},],
                        innerRadius: 32.5,
                        outerRadius: 42.5,
                        cornerRadius: 13,
                        startAngle: -180,
                        endAngle: (360 * percent) - 180,
                        cx: 37.5, cy: '50%',
                    }]}
                />
                <Typography
                    fontWeight={800} fontSize='32px'
                    position='absolute' sx={{top: '18px', left: '33px',}}
                >{level}</Typography>
            </Box>
            <Box display='flex' flexDirection='column' gap='0.125rem' alignItems='center'>
                <img src={sparks} alt='Искры' style={{width: '3.125rem', height: '3.125rem'}}/>
                <Box display='flex' flexDirection='row' alignItems='flex-end'>
                    <Typography fontWeight={800} fontSize='1.625rem'>{points}</Typography>
                    <Typography fontWeight={800} fontSize='1.125rem' sx={{ opacity: '0.5', mb: '0.188rem' }}>/{levelPoints}</Typography>
                </Box>
            </Box>
        </Widget>
    );
}