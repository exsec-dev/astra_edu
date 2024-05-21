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
    padding: '30px 35px',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    color: '#fff',
    width: '500px',
    gap: '20px',
    borderRadius: '20px',
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
            if (!JSON.parse(userData?.achievements)?.includes("magic")) {
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
                        right: '10px',
                        top: '10px',
                        color: '#ffffff50'
                    }}
                >
                    <ClearRoundedIcon />
                </IconButton>
                <DialogContent sx={{ padding: '0' }}>
                    <Box sx={{
                        gap: '20px',
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center'
                    }}>
                        <img height={130} width={124} src={coins > 0 ? smile : tongue_cat} alt='Котобот'/>
                        <Box sx={{
                            gap: '15px',
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center'
                        }}>
                            <Typography fontWeight={750} fontSize='20px' letterSpacing='0.03rem'>
                                {coins > 0 ? "Обмен коинов" : "Недостаточно коинов"}
                            </Typography>
                            <Box sx={{
                                padding: '15px 10px',
                                display: 'flex',
                                textAlign: 'center',
                                bgcolor: 'var(--accent-color)',
                                border: '1px solid rgba(255, 255, 255, 5%)',
                                borderRadius: '12px',
                            }}>
                                <Typography
                                    fontSize='12px'
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
                            gap: '2px',
                        }}
                    >
                        <FilledGreyButton 
                            label="Обменять 1 коин"
                            handleClick={() => handleSubmit(1)}
                            fontSize="14px"
                            padding="10px 20px"
                            height="40px"
                            width="100%"
                        />
                        <OutlinedButton 
                            label="Обменять все коины"
                            disabled={coins === 1}
                            handleClick={() => handleSubmit(coins)}
                            fontSize="14px"
                            padding="10px 20px"
                            height="40px"
                            width="100%"
                        />
                    </DialogActions>
                }
            </Box>
        </Dialog>
    );
}