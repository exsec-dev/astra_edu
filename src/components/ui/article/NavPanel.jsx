import React from 'react';
import { Box, Typography, Link as MuiLink } from '@mui/material';
import { Link } from 'react-router-dom';
import { HomeRounded, EastRounded } from '@mui/icons-material';

export const NavPanel = ({ moduleName, chapterName }) => {
    return (
        <Box sx={{ display: 'flex', gap: '0.75rem', flexDirection: 'row', alignItems: 'center', }}>
            <MuiLink component={Link} to={"/"} sx={{ color: '#fff', maxHeight: '1.75rem' }}>
                <HomeRounded sx={{
                    fontSize: '1.75rem', transition: 'opacity linear .1s',
                    opacity: '0.5', cursor: 'pointer', mt: '-0.06rem',
                    '&:hover': { opacity: '0.75' }
                }}/>
            </MuiLink>
            <MuiLink component={Link} to={"/module?name=" + moduleName} sx={{ color: '#fff', textDecoration: 'underline rgba(255, 255, 255, 0)' }}>
                <Typography fontWeight={750} fontSize='1.375rem'>{moduleName}</Typography>
            </MuiLink>
            <EastRounded sx={{ fontSize: '1.625rem', mt: '0.125rem' }}/>
            <Typography fontWeight={550} fontSize='1.25rem' mt='0.2rem'>{chapterName}</Typography>
        </Box>
    );
};