import React from 'react';
import { Box, Typography } from '@mui/material';
import CheckIcon from '../icons/CheckIcon';

export default function AchievementBlock({ id, title, description, icon, isReceived, isFavorite, handleClick }) {

    return (
        <Box
            sx={{
                display: 'flex',
                flexDirection: 'row',
                alignItems: 'center',
                gap: '1.06rem',
                padding: '0.938rem 1.25rem',
                opacity: isReceived ? '1' : '0.4',
                cursor: isReceived && !isFavorite ? 'pointer' : 'auto',
                bgcolor: isFavorite ? 'var(--third-color)' : 'var(--second-color)',
                transition: 'background-color linear .3s',
                width: '20.44rem',
                height: '6.25rem',
                borderRadius: '0.75rem',
                border: '1px solid rgba(255, 255, 255, 5%)',
                position: 'relative',
            }}
            onClick={isReceived && !isFavorite ? () => handleClick(id) : null}
        >
            {isFavorite &&
                <Box sx={{
                    display: 'flex',
                    width: '1.875rem',
                    height: '1.875rem',
                    position: 'absolute',
                    top: '0.78rem',
                    right: '0.78rem',
                    bgcolor: '#4D5169',
                    borderRadius: '50%',
                    alignItems: 'center',
                    justifyContent: 'center',
                }}>
                    <CheckIcon sx={{ fill: '#71768C', marginTop: '0.063rem', marginLeft: '0.125rem', }}/>
                </Box>
            }
            <img src={icon} alt='Достижение' style={{width: '4.375rem'}}/>
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: '0.313rem', width: '12.5rem', color: '#fffffff0', }}>
                <Typography fontSize='1rem' fontWeight='800'>{title}</Typography>
                <Typography fontSize='0.75rem' maxWidth='11.875rem'>{description}</Typography>
            </Box>
        </Box>
    );
}