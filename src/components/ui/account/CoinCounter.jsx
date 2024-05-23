import React, { useState } from 'react';
import { Box, Typography } from '@mui/material';
import coin_icon from '../../../icons/badges/coin.webp';
import CoinsModal from './modal/CoinsModal';

export default function CoinCounter({ coins }) {
    const [open, setOpen] = useState(false);

    return (<>
        <Box
            sx={{
                display: 'flex',
                height: '2.563rem',
                alignItems: 'center',
                flexDirection: 'row',
                gap: '0.188rem',
                pl: '1.125rem',
                pr: '0.938rem',
                bgcolor: 'var(--panel-color)',
                color: '#fff',
                border: '1px solid rgba(255, 255, 255, 5%)',
                borderRadius: '100px',
                cursor: 'pointer',
            }}
            onClick={() => setOpen(true)}
        >
            <Typography fontSize='1.125rem' fontWeight={800}>{coins}</Typography>
            <img src={coin_icon} alt='Coin' style={{height: '1.313rem', width: '1.313rem'}}/>
        </Box>
        <CoinsModal open={open} coins={coins} handleClose={() => setOpen(false)}/>
    </>);
}