import React from 'react';
import { Box, Typography } from '@mui/material';
import { Requests } from '../../Requests';
import { achievementsData } from '../../utlis/AchievementsData';
import alert_sound from '../../sounds/alert.mp3';

const snackbarStyles = {
    backgroundColor: 'var(--second-color)',
    color: '#fff',
    height: '6rem',
    alignItems: 'center',
    width: '20.625rem',
    borderRadius: '0.75rem',
    border: '1px solid #ffffff25',
    display: 'flex',
    flexDirection: 'row',
    padding: '1rem 1.25rem',
    gap: '1rem',
    boxShadow: '0 0 15px #0000001c',
    marginLeft: '60px'
};

export const addAchievement = ({name, enqueueSnackbar, queryClient, timeout}) => {
    Requests.addAchievement({ achievement: name })
    .then(() => {
        setTimeout(() => {
            playSound();
            enqueueSnackbar({ variant: 'achievement', name: name });
            queryClient.invalidateQueries(['userdata']);
            queryClient.invalidateQueries(['leaderboard']);
        }, timeout);
    })
    .catch((error) => {
        console.error(error);
    });
};

export const playSound = () => {
    const audio = new Audio(alert_sound);
    audio.play().catch(e => console.log("Не удалось воспроизвести звук"));
};

export const AchievementSnackbar = React.forwardRef(({ style, name }, ref) => {
    return (
        <div style={style} ref={ref}>
            <Box sx={snackbarStyles}>
                <img src={achievementsData[name].icon} alt={achievementsData[name].title} style={{width: '4.375rem'}}/>
                <Box sx={{ display: 'flex', flexDirection: 'column', gap: '0.18rem' }}>
                    <Typography fontWeight={700} fontSize='1rem'>{achievementsData[name].title}</Typography>
                    <Typography fontWeight={300} fontSize='0.75rem' sx={{ letterSpacing: '0.01rem' }}>
                        {achievementsData[name].description}
                    </Typography>
                </Box>
            </Box>
        </div>
    );
});