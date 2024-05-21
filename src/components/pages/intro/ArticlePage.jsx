import React, { useEffect, useContext } from 'react';
import { Box, IconButton, Link as MuiLink } from '@mui/material';
import { Link } from 'react-router-dom';
import { useMutation, useQueryClient } from 'react-query';
import { useSnackbar } from 'notistack';
import { Requests } from '../../../Requests';
import PageWrapper from '../../ui/wrappers/PageWrapper';
import { introData } from '../../ui/article/introData';
import { UserContext } from '../../../context';
import { NavPanel } from '../../ui/article/NavPanel';
import { addAchievement } from '../../ui/AchievementSnackbar';
import { ArrowForwardIosRounded, ArrowBackIosRounded } from '@mui/icons-material';
import ChapterNavigation from './ChapterNavigation';


export default function ArticlePage({ id }) {
    const articleData = introData?.[id];
    const { enqueueSnackbar } = useSnackbar();
    const queryClient = useQueryClient();
    const { userData } = useContext(UserContext);

    const changeStatus = useMutation(Requests.setChapterStatus, {
        onSuccess: () => {
            queryClient.invalidateQueries(['userdata']);
            queryClient.invalidateQueries(['leaderboard']);
        },
        onError: (error) => {
            console.error(error);
        }
    });

    useEffect(() => {
        window.scrollTo({ top: 0 });
        const currentChapterStatus = JSON.parse(userData?.intro || "{}")?.[id]?.status;
        if (currentChapterStatus && currentChapterStatus !== 2) {
            changeStatus.mutate({module: "Введение", id, status: 2});
            if (id === 0) {
                changeStatus.mutate({module: "Введение", id: 1, status: 1});
            } else if (id === 1) {
                changeStatus.mutate({module: "Командная строка", id: 0, status: 1});
            }
        }
        if (id === 1 && userData?.achievements && !JSON.parse(userData?.achievements)?.includes?.("beginning")) {
            addAchievement({name: "beginning", enqueueSnackbar, queryClient, timeout: 3000});
        }
    }, [id]);

    return (
        <PageWrapper padding='0 240px 0 350px' gap='30px' position='relative'>
            <ChapterNavigation moduleName="Введение" chapterId={id}/>
            <Box sx={{ display: 'flex', gap: '30px', flexDirection: 'column', py: '5px', width: '100%' }}>
                <NavPanel moduleName='Введение' chapterName={articleData?.chapter}/>
                <Box sx={{
                    position: 'relative', display: 'flex', gap: '10px', flexDirection: 'column',
                    px: '40px', pt: '25px', pb: '40px', border: '1px solid rgba(255, 255, 255, 5%)',
                    borderRadius: '25px', bgcolor: 'var(--main-color)',
                }}>
                    <Box position='fixed' top='50%' left='225px'>
                        <IconButton sx={{ color: 'rgba(255, 255, 255, 25%)' }} disabled={id === 0}>
                            <MuiLink
                                component={Link}
                                to={"/module/intro/?id=" + (id - 1)}
                                sx={{ color: '#fff', maxHeight: '30px' }}
                            >
                                <ArrowBackIosRounded sx={{
                                    fontSize: '30px',
                                    transition: 'opacity linear .1s',
                                    fill: '#fff',
                                    opacity: id === 1 ? '0.25' : '0.08',
                                    '&:hover': { opacity: '0.5' }}}
                                />
                            </MuiLink>
                        </IconButton>
                    </Box>
                    {articleData?.content?.map((el, i) => {
                        const Component = el?.component;
                        return <Component key={i} {...el}/>;
                    })}
                    <Box position='fixed' top='50%' right='115px'>
                        <IconButton sx={{ color: 'rgba(255, 255, 255, 25%)' }} disabled={id === 1}>
                            <MuiLink
                                component={Link}
                                to={"/module/intro/?id=" + (id + 1)}
                                sx={{ color: '#fff', maxHeight: '30px' }}
                            >
                                <ArrowForwardIosRounded sx={{
                                    fontSize: '30px',
                                    transition: 'opacity linear .1s',
                                    fill: '#fff',
                                    opacity: id === 0 ? '0.25' : '0.08',
                                    '&:hover': { opacity: '0.5' }}}
                                />
                            </MuiLink>
                        </IconButton>
                    </Box>
                </Box>
            </Box>
        </PageWrapper>
    );
}