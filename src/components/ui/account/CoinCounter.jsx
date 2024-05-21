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
                height: '41px',
                alignItems: 'center',
                flexDirection: 'row',
                gap: '3px',
                pl: '18px',
                pr: '15px',
                bgcolor: 'var(--panel-color)',
                color: '#fff',
                border: '1px solid rgba(255, 255, 255, 5%)',
                borderRadius: '100px',
                cursor: 'pointer',
            }}
            onClick={() => setOpen(true)}
        >
            <Typography fontSize='18px' fontWeight={800}>{coins}</Typography>
            <img src={coin_icon} alt='Coin' height={21} width={21}/>
        </Box>
        <CoinsModal open={open} coins={coins} handleClose={() => setOpen(false)}/>
    </>);
}