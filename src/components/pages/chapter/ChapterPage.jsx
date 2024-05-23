import React, { useContext, useEffect } from 'react';
import { Box, IconButton, Link as MuiLink } from '@mui/material';
import { Requests } from '../../../Requests';
import { useMutation, useQueryClient } from 'react-query';
import { Link } from 'react-router-dom';
import PageWrapper from '../../ui/wrappers/PageWrapper';
import { chapterData } from '../../ui/article/chapterData';
import { UserContext } from '../../../context';
import { NavPanel } from '../../ui/article/NavPanel';
import { ArrowForwardIosRounded, ArrowBackIosRounded } from '@mui/icons-material';
import ChapterNavigation from '../intro/ChapterNavigation';
import TestPanel from './TestPanel';

export default function ChapterPage({ id }) {
    const articleData = chapterData?.[id];
    const queryClient = useQueryClient();
    const { userData } = useContext(UserContext);

    useEffect(() => {
        window.scrollTo({ top: 0 });
        if (id === 4 && JSON.parse(userData?.command_line || "{}")?.[4]?.status === 1) {
            changeStatus.mutate({module: "Командная строка", id: 4, status: 2});
        }
    }, [id]);

    const changeStatus = useMutation(Requests.setChapterStatus, {
        onSuccess: () => {
            queryClient.invalidateQueries(['userdata']);
        },
        onError: (error) => {
            console.error(error);
        }
    });

    return (
        <PageWrapper padding='0 15rem 0 21.875rem !important' gap='1.875rem' position='relative'>
            <ChapterNavigation moduleName="Командная строка" chapterId={id}/>
            <Box sx={{ display: 'flex', gap: '1.875rem', flexDirection: 'column', py: '0.3rem', width: '100%' }}>
                <NavPanel moduleName="Командная строка" chapterName={articleData?.chapter}/>
                <Box sx={{
                    position: 'relative', display: 'flex', gap: '0.625rem', flexDirection: 'column',
                    px: '2.5rem', pt: '0.94rem', pb: '1.25rem', border: '1px solid rgba(255, 255, 255, 5%)',
                    borderRadius: '1.56rem', bgcolor: 'var(--main-color)'
                }}>
                    <Box position='fixed' top='50%' left='15.625rem'>
                        <IconButton sx={{ color: 'rgba(255, 255, 255, 25%)' }} disabled={id === 0}>
                            <MuiLink
                                component={Link}
                                to={"/module/commandline/?id=" + (id - 1)}
                                sx={{ color: '#fff', maxHeight: '1.875rem' }}
                            >
                                <ArrowBackIosRounded sx={{
                                    fontSize: '1.875rem',
                                    transition: 'opacity linear .1s',
                                    fill: '#fff',
                                    opacity: id === 0 ? '0.08' : '0.25',
                                    '&:hover': { opacity: '0.5' }}}
                                />
                            </MuiLink>
                        </IconButton>
                    </Box>
                    {articleData?.content?.map((el, i) => {
                        const Component = el?.component;
                        return <Component key={i} {...el}/>;
                    })}
                    <Box position='fixed' top='50%' right='8.75rem'>
                        <IconButton sx={{ color: 'rgba(255, 255, 255, 25%)' }} disabled={id === 4 || JSON.parse(userData?.command_line || "{}")?.[id + 1]?.status === 0}>
                            <MuiLink
                                component={Link}
                                to={"/module/commandline/?id=" + (id + 1)}
                                sx={{ color: '#fff', maxHeight: '1.875rem' }}
                            >
                                <ArrowForwardIosRounded sx={{
                                    fontSize: '1.875rem',
                                    transition: 'opacity linear .1s',
                                    fill: '#fff',
                                    opacity: id === 4 || JSON.parse(userData?.command_line || "{}")?.[id + 1]?.status === 0 ? '0.08' : '0.25',
                                    '&:hover': { opacity: '0.5' }}}
                                />
                            </MuiLink>
                        </IconButton>
                    </Box>
                </Box>
                {!JSON.parse(userData?.command_line || "{}")?.[id]?.bonus &&
                    <>
                        <TestPanel
                            chapterId={id}
                            tests={articleData?.tests}
                            data={JSON.parse(userData?.command_line || "{}")?.[id]?.details}
                            achievements={JSON.parse(userData?.achievements || "[]")}
                            retryCount={JSON.parse(userData?.command_line || "{}")?.[id]?.retry_count}
                        />
                        <Box sx={{
                            position: 'relative', display: 'flex', gap: '0.625rem', flexDirection: 'column',
                            px: '2.5rem', pt: '0.94rem', pb: '1.25rem', border: '1px solid rgba(255, 255, 255, 5%)',
                            borderRadius: '1.56rem', bgcolor: 'var(--main-color)'
                        }}>
                            {articleData?.conclusion?.map((el, i) => {
                                const Component = el?.component;
                                return <Component key={i} {...el}/>;
                            })}
                        </Box>
                    </>
                }
            </Box>
        </PageWrapper>
    );
}