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
            height: '41px',
            alignItems: 'center',
            flexDirection: 'row',
            gap: '13px',
            pr: '18px',
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
                    gap: '13px',
                    pl: '6px',
                    pr: '30px',
                    bgcolor: 'var(--second-color)',
                    color: '#fff',
                    borderRadius: '100px',
                    cursor: 'pointer',
                }}
                onClick={() => setOpen(true)}
            >
                { avatar ?
                    <img src={avatar} alt='Img' width={30} height={30} style={{ borderRadius: '50%' }}/>
                    : <Skeleton variant="circular" width={30} height={30} sx={{ bgcolor: 'var(--accent-color)' }}/>
                }
                <Box sx={{ gap: '12px', display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
                    <Typography fontWeight={600} fontSize='14px'>{username}</Typography>
                    <img
                        width={22}
                        src={achievementsData[favoriteAchievement]?.icon}
                        alt={achievementsData[favoriteAchievement]?.title}
                    />
                </Box>
            </Box>
            <Box id="anchor-el" onClick={(e) => setAnchorEl(e.currentTarget)} sx={{ cursor: 'pointer', display: 'flex' }}>
                <MenuRounded sx={{
                    fill: 'rgba(239, 239, 241, 30%)',
                    width: '22.5px',
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