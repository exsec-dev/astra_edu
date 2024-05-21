import React from 'react';
import { useSnackbar } from 'notistack';
import { useQuery, useQueryClient } from 'react-query';
import { Requests } from '../../../../Requests';
import { Box, Typography, Skeleton } from '@mui/material';
import Widget from '../../../ui/containers/Widget';
import { convertToImage } from '../../../../utlis/utils';
import { achievementsData } from '../../../../utlis/AchievementsData';
import { addAchievement } from '../../../ui/AchievementSnackbar';
import { levelMap } from '../Dashboard';

const User = ({ isFirst, isSecond, isThird, isCurrent, isAbove, isLast, index, userData }) => {
    const color = isFirst ? 'linear-gradient(133deg, #FFE176BF 0%, #2a2c3880 100%)' :
    isSecond ? 'linear-gradient(133deg, #DBE9F3BF 0%, #2a2c3880 100%)' :
    isThird ? 'linear-gradient(133deg, #FFCCAABF 0%, #2a2c3880 100%)' :
    isCurrent ? 'var(--current-user-color)' : 'var(--focused-color)';

    return (<>
        {
            ((index > 5 && isAbove) || (isLast && !isCurrent)) &&
            <Box width='100%' height='1.5px' bgcolor='var(--focused-color)' borderRadius='2px'/>
        }
        <Box display='flex' flexDirection='row' alignItems='center' gap='20px' position='relative' width='100%'>
            <Typography fontWeight={700} fontSize='18px' position='absolute' left='-55px' width='40px' textAlign='end'>
                {index}
            </Typography>
            <Box
                display='flex' flexDirection='row'
                alignItems='center' gap='20px' width='100%'
                justifyContent='space-between' pr='40px'
                bgcolor={isCurrent ? 'var(--widget-color)' : 'var(--fourth-color)'} borderRadius='1000px'
            >
                <Box
                    display='flex' flexDirection='row' position='relative'
                    alignItems='center' gap='20px' height='40px'
                    borderRadius='1000px' pl='7px' pr='25px'
                    sx={{
                        background: color,
                        '&::after': {
                            content: '""', position: 'absolute', top: '0', left: '0',
                            border: '1px solid rgba(255, 255, 255, 5%)',
                            height: '100%', width: '100%', borderRadius: '1000px',
                        }
                    }}
                >
                    <img
                        src={convertToImage(userData?.avatar)} alt='Img'
                        width={30} height={30}
                        style={{ borderRadius: '50%' }}
                    />
                    <Box display='flex' flexDirection='row' alignItems='center' gap='10px'>
                        <Typography fontWeight={550} fontSize='14px'>{userData?.username}</Typography>
                        <img
                            width={20}
                            src={achievementsData[userData?.favorite_achievement]?.icon}
                            alt={achievementsData[userData?.favorite_achievement]?.title}
                        />
                    </Box>
                </Box>
                <Box display='flex' flexDirection='row' justifyContent='center' alignItems='flex-end' gap='40px'>
                    <Typography fontWeight={400} fontSize='14px' width='120px' letterSpacing='0.03rem' textAlign='end'>
                        {userData?.points}
                    </Typography>
                    <Typography fontWeight={400} fontSize='14px' width='120px' letterSpacing='0.03rem' textAlign='end'>
                        {levelMap.findLast(el => el.points <= userData?.points)?.level}
                    </Typography>
                    <Typography fontWeight={400} fontSize='14px' width='120px' letterSpacing='0.03rem' textAlign='end'>
                        {JSON.parse(userData?.achievements || "[]")?.length}
                    </Typography>
                </Box>
            </Box>
        </Box>
    </>);
};

export default function Leaderboard({ userData }) {
    const { enqueueSnackbar } = useSnackbar();
    const queryClient = useQueryClient();

    const { isLoading, isFetching, isError, data } = useQuery(['leaderboard'], () => Requests.getLeaderboard(), {
        refetchOnWindowFocus: false,
        onSuccess: (data) => {
            const currentPosition = data?.data?.findIndex(el => el?.username === userData?.username);
            const map = ["gold", "silver", "bronze"];
            if ([0, 1, 2]?.includes(currentPosition) && !JSON.parse(userData?.achievements)?.includes(map?.[currentPosition])) {
                addAchievement({name: map?.[currentPosition], enqueueSnackbar, queryClient, timeout: 3000});
            }
        },
        onError: (e) => {
          enqueueSnackbar('Ошибка получения таблицы лидеров: ' + e, { variant: 'error' });
        }
      });

    console.log(data?.data)

    return (
        <Widget
            padding='30px 50px'
            sx={{ flexDirection: 'column', width: '100%', alignItems: 'flex-start', }}
        >
            <Typography fontWeight={800} fontSize='25px'>Таблица лидеров</Typography>
            <Box display='flex' flexDirection='column' alignItems='flex-end' gap='20px' width='100%'>
                <Box
                    display='flex' flexDirection='row' justifyContent='flex-end'
                    gap='40px' pr='40px' width='100%' letterSpacing='0.03rem'
                >
                    <Typography fontWeight={500} fontSize='14px' width='120px' textAlign='end' sx={{ opacity: '0.5' }}>
                        Опыт
                    </Typography>
                    <Typography fontWeight={500} fontSize='14px' width='120px' textAlign='end' sx={{ opacity: '0.5' }}>
                        Уровень
                    </Typography>
                    <Typography fontWeight={500} fontSize='14px' width='120px' textAlign='end' sx={{ opacity: '0.5' }}>
                        Награды
                    </Typography>
                </Box>
                <Box
                    display='flex' flexDirection='column'
                    gap='10px' pl={isLoading || isError || isFetching ? '0' : '30px'} width='100%'
                >
                    {
                        isLoading || isError || isFetching ?
                        Array.from({length: 5}, (_, i) => i).map(el => 
                            <Skeleton key={el} variant="rounded" width='100%' height={40} sx={{ borderRadius: '1000px', bgcolor: 'var(--panel-color)' }}/>
                        )
                        :
                        data?.data?.map((value, index) => {
                            const isCurrent = value?.username === userData?.username;
                            const isAbove = data?.data?.[index + 1]?.username === userData?.username;
                            const isBelow = data?.data?.[index - 1]?.username === userData?.username;
                            const isLast = index === data?.data?.length - 1;
                            if (index > 3 && !isCurrent && !isAbove && !isBelow && !isLast) return null;

                            return (
                                <User 
                                    key={index}
                                    isFirst={index === 0}
                                    isSecond={index === 1}
                                    isThird={index === 2}
                                    isCurrent={value?.username === userData?.username}
                                    index={index + 1}
                                    isAbove={data?.data?.[index + 1]?.username === userData?.username}
                                    isLast={
                                        isLast &&
                                        data?.data?.[index - 1]?.username !== userData?.username &&
                                        data?.data?.[index - 2]?.username !== userData?.username
                                    }
                                    userData={value}
                                />
                            );
                        })
                    }
                </Box>
            </Box>
        </Widget>
    );
}