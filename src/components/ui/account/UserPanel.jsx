import React from 'react';
import { Box, Skeleton } from '@mui/material';
import CoinCounter from './CoinCounter';
import AccountPanel from './AccountPanel';

export default function UserPanel({ userData, isLoading }) {
    return (
        isLoading || !userData ?
            <Box sx={{ display: 'flex', flexDirection: 'row', alignItems: 'center', gap: '0.94rem' }}>
                <Skeleton variant="rounded" sx={{ borderRadius: '100px', bgcolor: 'var(--accent-color)', width: '4.375rem', height: '2.563rem' }}/>
                <Skeleton variant="rounded" sx={{ borderRadius: '100px', bgcolor: 'var(--accent-color)', width: '13.75rem', height: '2.563rem' }}/>
            </Box>
        :
            <Box sx={{ display: 'flex', flexDirection: 'row', alignItems: 'center', gap: '0.94rem' }}>
                <CoinCounter coins={userData?.coins || 0}/>
                <AccountPanel userData={userData}/>
            </Box>
    );
}