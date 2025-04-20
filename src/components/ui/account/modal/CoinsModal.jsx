import React, { useContext } from 'react';
import { UserContext } from '../../../../context';
import { Box, Dialog, DialogActions, DialogContent, IconButton, Typography } from '@mui/material';
import { useSnackbar } from 'notistack';
import { useMutation, useQueryClient } from 'react-query';
import ClearRoundedIcon from '@mui/icons-material/ClearRounded';
import { Requests } from '../../../../Requests';
import { FilledGreyButton } from '../../form/FilledGreyButton';
import { OutlinedButton } from '../../form/OutlinedButton';
import tongue_cat from '../../../../icons/robocat/tongue.webp';
import smile from '../../../../icons/robocat/smile.webp';
import { addAchievement } from '../../AchievementSnackbar';

const formStyle = {
    backgroundColor: 'var(--main-color)',
    padding: '1.875rem 2.19rem',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    color: '#fff',
    width: '31.25rem',
    gap: '1.25rem',
    borderRadius: '1.25rem',
    border: '1px solid rgba(255, 255, 255, 5%)',
};

export default function CoinsModal({open, coins, handleClose}) {
    const { enqueueSnackbar } = useSnackbar();
    const { userData } = useContext(UserContext);
    const queryClient = useQueryClient();

    const exchangeCoins = useMutation(Requests.exchangeCoins, {
        onSuccess: (data) => {
            enqueueSnackbar('Дополнительный опыт начислен', { variant: 'success' });
            queryClient.invalidateQueries(['userdata']);
            queryClient.invalidateQueries(['leaderboard']);
            if (!userData?.achievements?.includes("magic")) {
                addAchievement({name: "magic", enqueueSnackbar, queryClient, timeout: 3000});
            }
        },
        onError: (error) => {
            console.error(error);
            const mes = error?.response?.data?.message;
            enqueueSnackbar(mes ? mes : 'Обмен не совершен', { variant: 'error' });
        }
    });

    const handleSubmit = (coinsNumber) => {
        return exchangeCoins.mutate({coins: coinsNumber});
    };

    return (
        <Dialog
            open={open}
            onBackdropClick={handleClose}
            sx={{ 
                '& .MuiPaper-root': {
                    backgroundColor: 'transparent',
                }
            }}
        >
            <Box sx={formStyle}>
                <IconButton
                    onClick={handleClose}
                    sx={{
                        position: 'absolute',
                        right: '0.625rem',
                        top: '0.625rem',
                        color: '#ffffff50'
                    }}
                >
                    <ClearRoundedIcon />
                </IconButton>
                <DialogContent sx={{ padding: '0' }}>
                    <Box sx={{
                        gap: '1.25rem',
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center'
                    }}>
                        <img style={{ height: '8.125rem', width: '7.75rem' }} src={coins > 0 ? smile : tongue_cat} alt='Котобот'/>
                        <Box sx={{
                            gap: '0.94rem',
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center'
                        }}>
                            <Typography fontWeight={750} fontSize='1.25rem' letterSpacing='0.03rem'>
                                {coins > 0 ? "Обмен коинов" : "Недостаточно коинов"}
                            </Typography>
                            <Box sx={{
                                padding: '0.94rem 0.625rem',
                                display: 'flex',
                                textAlign: 'center',
                                bgcolor: 'var(--accent-color)',
                                border: '1px solid rgba(255, 255, 255, 5%)',
                                borderRadius: '0.75rem',
                            }}>
                                <Typography
                                    fontSize='0.75rem'
                                    letterSpacing='0.03rem'
                                    sx={{ opacity: '0.5' }}
                                    fontWeight={300}
                                >
                                    Вы можете зарабатывать коины за успешное прохождение модулей и обменивать их на дополнительные 10 очков опыта или доступ к бонусным урокам
                                </Typography>
                            </Box>
                        </Box>
                    </Box>
                </DialogContent>
                {coins > 0 && 
                    <DialogActions
                        sx={{
                            display: 'flex',
                            flexDirection: 'row',
                            alignItems: 'center',
                            justifyContent: 'center',
                            width: '100%',
                            padding: '0',
                            gap: '0.125rem',
                        }}
                    >
                        <FilledGreyButton 
                            label="Обменять 1 коин"
                            handleClick={() => handleSubmit(1)}
                            fontSize="0.875rem"
                            padding="0.625rem 1.25rem"
                            height="2.5rem"
                            width="100%"
                        />
                        <OutlinedButton 
                            label="Обменять все коины"
                            disabled={coins === 1}
                            handleClick={() => handleSubmit(coins)}
                            fontSize="0.875rem"
                            padding="0.625rem 1.25rem"
                            height="2.5rem"
                            width="100%"
                        />
                    </DialogActions>
                }
            </Box>
        </Dialog>
    );
}