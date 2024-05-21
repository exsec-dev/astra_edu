import React from 'react';
import { Box, Skeleton } from '@mui/material';
import CoinCounter from './CoinCounter';
import AccountPanel from './AccountPanel';

export default function UserPanel({ userData, isLoading }) {
    return (
        isLoading || !userData ?
            <Box sx={{ display: 'flex', flexDirection: 'row', alignItems: 'center', gap: '15px' }}>
                <Skeleton variant="rounded" width={70} height={41} sx={{ borderRadius: '100px', bgcolor: 'var(--accent-color)' }}/>
                <Skeleton variant="rounded" width={220} height={41} sx={{ borderRadius: '100px', bgcolor: 'var(--accent-color)' }}/>
            </Box>
        :
            <Box sx={{ display: 'flex', flexDirection: 'row', alignItems: 'center', gap: '15px' }}>
                <CoinCounter coins={userData?.coins || 0}/>
                <AccountPanel userData={userData}/>
            </Box>
    );
}