import React, { useState, useContext, useEffect } from 'react';
import { Box, Menu, MenuItem, Typography } from '@mui/material';
import { useQueryClient } from 'react-query';
import SettingsIcon from '../../icons/SettingsIcon';
import StarIcon from '../../icons/StarIcon';
import LeaveIcon from '../../icons/LeaveIcon';
import { UserContext } from '../../../../context';
import SettingsModal from './SettingsModal';

const formStyle = {
    padding: '0.625rem 0.5rem',
    display: 'flex',
    flexDirection: 'column',
    color: '#fff',
};

const menuItemStyle = {
    display: 'flex',
    gap: '0.75rem',
    padding: '0.5rem 0.75rem',
    borderRadius: '0.5rem',
    transition: 'background-color .1s ease-in-out',
    '&:hover': {
        backgroundColor: 'rgba(255, 255, 255, 0.05)',
    }
};

export default function MenuModal({anchorEl, anchorRight, handleClose, handleOpenAchievement}) {
    const { setIsAuthorized, userData } = useContext(UserContext);
    const queryClient = useQueryClient();
    const [open, setOpen] = useState(false);

    return (
        <Menu
            anchorEl={anchorEl}
            open={Boolean(anchorEl)}
            onClose={handleClose}
            anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'right',
            }}
            transformOrigin={{
                vertical: 'top',
                horizontal: 'right',
            }}
            sx={{
                '& .MuiPaper-root': {
                    mt: '1.25rem',
                    ml: '1.25rem',
                    backgroundColor: 'rgba(0, 0, 0, 50%)',
                    backdropFilter: 'blur(1px)',
                    borderRadius: '0.75rem',
                    width: '13.75rem',
                },
                '& .MuiList-root': {
                    padding: '0'
                },
            }}
        >
            <Box sx={formStyle}>
                <MenuItem onClick={() => setOpen(true)} sx={menuItemStyle}>
                    <SettingsIcon sx={{ opacity: '0.5', width: '1.25rem' }}/>
                    <Typography fontWeight={600} fontSize='0.94rem' letterSpacing='0.03rem' sx={{ opacity: '0.5' }}>
                        Настройки
                    </Typography>
                </MenuItem>
                <MenuItem onClick={handleOpenAchievement} sx={menuItemStyle}>
                    <StarIcon sx={{ opacity: '0.5', width: '1.25rem' }}/>
                    <Typography fontWeight={600} fontSize='0.94rem' letterSpacing='0.03rem' sx={{ opacity: '0.5' }}>
                        Достижения
                    </Typography>
                </MenuItem>
                <MenuItem onClick={() => { handleClose(); setIsAuthorized(false); localStorage.removeItem('token'); queryClient.removeQueries();  window.location.replace('/');}} sx={menuItemStyle}>
                    <LeaveIcon sx={{ fill: '#EE6049', width: '1.25rem' }}/>
                    <Typography fontWeight={700} fontSize='0.94rem' letterSpacing='0.03rem' color='#EE6049'>
                        Выйти
                    </Typography>
                </MenuItem>
            </Box>
            <SettingsModal open={open} handleClose={() => setOpen(false)} userData={userData}/>
        </Menu>
    );
}