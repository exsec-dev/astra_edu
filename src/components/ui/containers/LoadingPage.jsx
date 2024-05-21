import React from 'react';
import { Box, CircularProgress } from '@mui/material';

export default function LoadingPage() {
    return (
        <Box sx={{ display: 'flex', width: '100%', alignItems: 'center', justifyContent: 'center' }}>
            <CircularProgress size={70} sx={{ color: 'var(--focused-color)' }}/>
        </Box>
    );
}