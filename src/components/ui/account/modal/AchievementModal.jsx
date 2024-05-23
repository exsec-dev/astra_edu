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
    padding: '1.25rem 1.875rem 2.2rem',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    color: '#fff',
    width: '46.875rem',
    borderRadius: '1.25rem',
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
                    maxWidth: '46.875rem',
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
                        borderRadius: '0.625rem',
                        width: '0.625rem',
                    },
                    '&::-webkit-scrollbar-thumb': { 
                        borderRadius: '0.625rem',
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
                        gap: '1.56rem',
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'flex-start',
                        overflow: 'hidden',
                    }}>
                        <Box width='100%' display='flex' justifyContent='space-between' position='relative'>
                            <Typography fontWeight={800} fontSize='1.375rem'>Достижения</Typography>
                            <ClearRoundedIcon
                                onClick={handleClose}
                                sx={{
                                    fill: '#ffffff50',
                                    width: '1.875rem',
                                    height: '1.875rem',
                                    position: 'absolute',
                                    right: '-0.375rem',
                                    cursor: 'pointer',
                                    '&:hover': {
                                        fill: '#ffffffbb',
                                    }
                                }}
                            />
                        </Box>
                        <Box sx={{
                            gap: '1.25rem',
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
            <Box minHeight='2rem'/>
        </Dialog>
    );
}