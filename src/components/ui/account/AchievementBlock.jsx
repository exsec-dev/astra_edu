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
                gap: '17px',
                padding: '15px 20px',
                opacity: isReceived ? '1' : '0.4',
                cursor: isReceived && !isFavorite ? 'pointer' : 'auto',
                bgcolor: isFavorite ? 'var(--third-color)' : 'var(--second-color)',
                transition: 'background-color linear .3s',
                width: '327px',
                height: '100px',
                borderRadius: '12px',
                border: '1px solid rgba(255, 255, 255, 5%)',
                position: 'relative',
            }}
            onClick={isReceived && !isFavorite ? () => handleClick(id) : null}
        >
            {isFavorite &&
                <Box sx={{
                    display: 'flex',
                    width: '30px',
                    height: '30px',
                    position: 'absolute',
                    top: '12.5px',
                    right: '12.5px',
                    bgcolor: '#4D5169',
                    borderRadius: '50%',
                    alignItems: 'center',
                    justifyContent: 'center',
                }}>
                    <CheckIcon sx={{ fill: '#71768C', marginTop: '1px', marginLeft: '2px', }}/>
                </Box>
            }
            <img src={icon} alt='Достижение' width={70}/>
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: '5px', width: '200px', color: '#fffffff0', }}>
                <Typography fontSize='16px' fontWeight='800'>{title}</Typography>
                <Typography fontSize='12px' maxWidth='190px'>{description}</Typography>
            </Box>
        </Box>
    );
}