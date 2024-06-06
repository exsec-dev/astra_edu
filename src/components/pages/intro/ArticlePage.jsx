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
        <PageWrapper id='chapter-container' gap='1.875rem' position='relative'>
            <ChapterNavigation moduleName="Введение" chapterId={id}/>
            <Box sx={{ display: 'flex', gap: '1.875rem', flexDirection: 'column', py: '0.3rem', width: '100%' }}>
                <NavPanel moduleName='Введение' chapterName={articleData?.chapter}/>
                <Box sx={{
                    position: 'relative', display: 'flex', gap: '0.625rem', flexDirection: 'column',
                    px: '2.5rem', pt: '1.56rem', pb: '2.5rem', border: '1px solid rgba(255, 255, 255, 5%)',
                    borderRadius: '1.56rem', bgcolor: 'var(--main-color)',
                }}>
                    <Box position='fixed' top='calc(50% + 1.3rem)' id='arrow-left'>
                        <IconButton sx={{ color: 'rgba(255, 255, 255, 25%)' }} disabled={id === 0}>
                            <MuiLink
                                component={Link}
                                to={"/module/intro/?id=" + (id - 1)}
                                sx={{ color: '#fff', maxHeight: '1.875rem' }}
                            >
                                <ArrowBackIosRounded sx={{
                                    fontSize: '1.875rem',
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
                    <Box position='fixed' top='calc(50% + 1.3rem)' id='arrow-right'>
                        <IconButton sx={{ color: 'rgba(255, 255, 255, 25%)' }} disabled={id === 1}>
                            <MuiLink
                                component={Link}
                                to={"/module/intro/?id=" + (id + 1)}
                                sx={{ color: '#fff', maxHeight: '1.875rem' }}
                            >
                                <ArrowForwardIosRounded sx={{
                                    fontSize: '1.875rem',
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