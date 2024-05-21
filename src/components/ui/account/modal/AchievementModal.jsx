import React from 'react';
import { Box, Dialog, DialogContent, Typography } from '@mui/material';
import { useSnackbar } from 'notistack';
import { useMutation, useQueryClient } from 'react-query';
import ClearRoundedIcon from '@mui/icons-material/ClearRounded';
import { Requests } from '../../../../Requests';
import AchievementBlock from '../AchievementBlock';
import { achievementsData } from '../../../../utlis/AchievementsData';

const formStyle = {
    backgroundColor: 'var(--main-color)',
    padding: '20px 30px 35px',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    color: '#fff',
    width: '750px',
    borderRadius: '20px',
    border: '1px solid rgba(255, 255, 255, 5%)',
};

export default function AchievementModal({open, favorite, achievements, handleClose}) {
    const { enqueueSnackbar } = useSnackbar();
    const queryClient = useQueryClient();

    const changeFavorite = useMutation(Requests.setFavoriteAchievement, {
        onSuccess: (data) => {
            queryClient.invalidateQueries(['userdata']);
            queryClient.invalidateQueries(['leaderboard']);
            enqueueSnackbar('Отображаемое достижение изменено', { variant: 'success' });
        },
        onError: (error) => {
            console.error(error);
            const mes = error?.response?.data?.message;
            enqueueSnackbar(mes ? mes : 'Достижение не изменено', { variant: 'error' });
        }
    });

    const handleSubmit = (favorite) => {
        return changeFavorite.mutate({ favorite });
    };

    return (
        <Dialog
            open={open}
            onBackdropClick={handleClose}
            sx={{ 
                '& .MuiPaper-root': {
                    backgroundColor: 'transparent',
                    overflow: 'visible',
                    maxWidth: '750px',
                },
                '& .MuiDialog-container': {
                    overflow: 'auto',
                    "@-moz-document url-prefix()": [
                        {
                          scrollbarColor: 'var(--main-color) var(--accent-color)',
                          scrollbarWidth: 'thin',
                        }
                    ],
                    '&::-webkit-scrollbar': {
                        background: 'var(--main-color)',
                        borderRadius: '10px',
                        width: '10px',
                    },
                    '&::-webkit-scrollbar-thumb': { 
                        borderRadius: '10px',
                        background: 'var(--accent-color)',
                    },
                    '&::-webkit-scrollbar-thumb:hover': {
                        background: 'var(--focused-color)',
                    }
                }
            }}
        >
            <Box sx={formStyle}>
                <DialogContent sx={{ padding: '0' }}>
                    <Box sx={{
                        gap: '25px',
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'flex-start',
                        overflow: 'hidden',
                    }}>
                        <Box width='100%' display='flex' justifyContent='space-between' position='relative'>
                            <Typography fontWeight={800} fontSize='22px'>Достижения</Typography>
                            <ClearRoundedIcon
                                onClick={handleClose}
                                sx={{
                                    fill: '#ffffff50',
                                    width: '30px',
                                    height: '30px',
                                    position: 'absolute',
                                    right: '-6px',
                                    cursor: 'pointer',
                                    '&:hover': {
                                        fill: '#ffffffbb',
                                    }
                                }}
                            />
                        </Box>
                        <Box sx={{
                            gap: '20px',
                            display: 'inline-grid',
                            gridTemplateColumns: 'auto auto',
                        }}>
                            {Object.keys(achievementsData)?.map(el => {
                                return (
                                    <AchievementBlock
                                        key={el}
                                        id={el}
                                        title={achievementsData[el].title}
                                        description={achievementsData[el].description}
                                        icon={achievementsData[el].icon}
                                        isReceived={achievements?.includes(el)}
                                        isFavorite={favorite === el}
                                        handleClick={handleSubmit}
                                    />
                                );
                            })}
                        </Box>
                    </Box>
                </DialogContent>
            </Box>
            <Box minHeight='32px'/>
        </Dialog>
    );
}