import React from 'react';
import { Box, Typography } from '@mui/material';
import { Requests } from '../../Requests';
import { achievementsData } from '../../utlis/AchievementsData';
import alert_sound from '../../sounds/alert.mp3';

const snackbarStyles = {
    backgroundColor: 'var(--second-color)',
    color: '#fff',
    height: '97px',
    alignItems: 'center',
    width: '330px',
    borderRadius: '12px',
    border: '1px solid #ffffff25',
    display: 'flex',
    flexDirection: 'row',
    padding: '15px 20px',
    gap: '17px',
    boxShadow: '0 0 15px #0000001c',
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
                <img src={achievementsData[name].icon} alt={achievementsData[name].title} width={70}/>
                <Box sx={{ display: 'flex', flexDirection: 'column', gap: '3px' }}>
                    <Typography fontWeight={700} fontSize='16px'>{achievementsData[name].title}</Typography>
                    <Typography fontWeight={300} fontSize='12px' sx={{ letterSpacing: '0.01rem' }}>
                        {achievementsData[name].description}
                    </Typography>
                </Box>
            </Box>
        </div>
    );
});