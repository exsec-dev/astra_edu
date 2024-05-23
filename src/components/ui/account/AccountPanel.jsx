import React, { useState } from 'react';
import { Box, Typography, Skeleton } from '@mui/material';
import { MenuRounded } from '@mui/icons-material';
import { achievementsData } from '../../../utlis/AchievementsData';
import { convertToImage } from '../../../utlis/utils';
import MenuModal from './modal/MenuModal';
import AchievementModal from './modal/AchievementModal';

export default function AccountPanel({ userData }) {
    const [anchorEl, setAnchorEl] = useState(null);
    const [open, setOpen] = useState(false);

    const avatar = convertToImage(userData?.avatar);
    const username = userData?.username;
    const favoriteAchievement = userData?.favorite_achievement;
    const achievements = JSON.parse(userData?.achievements);

    return (
        <Box sx={{
            display: 'flex',
            height: '2.563rem',
            alignItems: 'center',
            flexDirection: 'row',
            gap: '0.813rem',
            pr: '1.125rem',
            bgcolor: 'var(--panel-color)',
            border: '1px solid rgba(255, 255, 255, 5%)',
            borderRadius: '100px',
        }}>
            <Box
                sx={{
                    display: 'flex',
                    height: '100%',
                    alignItems: 'center',
                    flexDirection: 'row',
                    gap: '0.813rem',
                    pl: '0.375rem',
                    pr: '1.875rem',
                    bgcolor: 'var(--second-color)',
                    color: '#fff',
                    borderRadius: '100px',
                    cursor: 'pointer',
                }}
                onClick={() => setOpen(true)}
            >
                { avatar ?
                    <img src={avatar} alt='Img' style={{ borderRadius: '50%', width: '1.875rem', height: '1.875rem' }}/>
                    : <Skeleton variant="circular" sx={{ bgcolor: 'var(--accent-color)', width: '1.875rem', height: '1.875rem' }}/>
                }
                <Box sx={{ gap: '0.75rem', display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
                    <Typography fontWeight={600} fontSize='0.875rem'>{username}</Typography>
                    <img
                        style={{ width: '1.375rem'}}
                        src={achievementsData[favoriteAchievement]?.icon}
                        alt={achievementsData[favoriteAchievement]?.title}
                    />
                </Box>
            </Box>
            <Box id="anchor-el" onClick={(e) => setAnchorEl(e.currentTarget)} sx={{ cursor: 'pointer', display: 'flex' }}>
                <MenuRounded sx={{
                    fill: 'rgba(239, 239, 241, 30%)',
                    width: '1.4rem',
                    '&:hover': {
                        fill: 'rgba(239, 239, 241, 45%)',
                    },
                }}/>
            </Box>
            <MenuModal
                anchorEl={anchorEl} handleClose={() => setAnchorEl(null)}
                handleOpenAchievement={() => setOpen(true)}
                anchorRight={document?.getElementById('anchor-el')?.getBoundingClientRect()?.right || 0}
            />
            <AchievementModal
                favorite={favoriteAchievement}
                achievements={achievements}
                open={open}
                handleClose={() => setOpen(false)}
            />
        </Box>
    );
}