import React from 'react';
import { Box, Typography, Link as MuiLink } from '@mui/material';
import { Link } from 'react-router-dom';
import { HomeRounded, EastRounded } from '@mui/icons-material';

export const NavPanel = ({ moduleName, chapterName }) => {
    return (
        <Box sx={{ display: 'flex', gap: '12px', flexDirection: 'row', alignItems: 'center', }}>
            <MuiLink component={Link} to={"/"} sx={{ color: '#fff', maxHeight: '28px' }}>
                <HomeRounded sx={{
                    fontSize: '28px', transition: 'opacity linear .1s',
                    opacity: '0.5', cursor: 'pointer', mt: '-1px',
                    '&:hover': { opacity: '0.75' }
                }}/>
            </MuiLink>
            <MuiLink component={Link} to={"/module?name=" + moduleName} sx={{ color: '#fff', textDecoration: 'underline rgba(255, 255, 255, 0)' }}>
                <Typography fontWeight={750} fontSize='22px'>{moduleName}</Typography>
            </MuiLink>
            <EastRounded sx={{ fontSize: '26px', mt: '2px' }}/>
            <Typography fontWeight={550} fontSize='20px' mt='1px'>{chapterName}</Typography>
        </Box>
    );
};