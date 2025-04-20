import React, { useContext, useEffect } from 'react';
import { Box, IconButton, Link as MuiLink } from '@mui/material';
import { Requests } from '../../../Requests';
import { useMutation, useQueryClient } from 'react-query';
import { Link } from 'react-router-dom';
import PageWrapper from '../../ui/wrappers/PageWrapper';
import { commandlineData, filesystemData } from '../../ui/article/chapterData';
import { UserContext } from '../../../context';
import { NavPanel } from '../../ui/article/NavPanel';
import { ArrowForwardIosRounded, ArrowBackIosRounded } from '@mui/icons-material';
import ChapterNavigation from '../intro/ChapterNavigation';
import TestPanel from './TestPanel';

export default function ChapterPage({ id, module }) {
    const articleData = module === 'command_line' ? commandlineData?.[id] : filesystemData?.[id];
    const queryClient = useQueryClient();
    const { userData } = useContext(UserContext);

    useEffect(() => {
        window.scrollTo({ top: 0 });
        const isLast = (module === 'command_line' && userData?.command_line?.[4]?.status === 1) || (module === 'file_system' && userData?.file_system?.[4]?.status === 1);
        if (id === 4 && isLast) {
            changeStatus.mutate({module: module === 'command_line' ? "Командная строка" : "Файловая система", id: 4, status: 2});
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
        <PageWrapper id='chapter-container' gap='1.875rem' position='relative'>
            <ChapterNavigation moduleName={module === 'command_line' ? "Командная строка" : "Файловая система"} chapterId={id}/>
            <Box sx={{ display: 'flex', gap: '1.875rem', flexDirection: 'column', py: '0.3rem', width: '100%' }}>
                <NavPanel moduleName={module === 'command_line' ? "Командная строка" : "Файловая система"} chapterName={articleData?.chapter}/>
                <Box sx={{
                    position: 'relative', display: 'flex', gap: '0.625rem', flexDirection: 'column',
                    px: '2.5rem', pt: '0.94rem', pb: '1.25rem', border: '1px solid rgba(255, 255, 255, 5%)',
                    borderRadius: '1.56rem', bgcolor: 'var(--main-color)'
                }}>
                    <Box position='fixed' top='calc(50% + 1.3rem)' id='arrow-left-chapter'>
                        <IconButton sx={{ color: 'rgba(255, 255, 255, 25%)' }} disabled={id === 0}>
                            <MuiLink
                                component={Link}
                                to={`/module/${module.replace('_', '')}/?id=` + (id - 1)}
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
                    <Box position='fixed' top='calc(50% + 1.3rem)' id='arrow-right-chapter'>
                        <IconButton sx={{ color: 'rgba(255, 255, 255, 25%)' }} disabled={id === 4 || (module === 'command_line' ? userData?.command_line : userData?.file_system)?.[id + 1]?.status === 0}>
                            <MuiLink
                                component={Link}
                                to={`/module/${module.replace('_', '')}/?id=` + (id + 1)}
                                sx={{ color: '#fff', maxHeight: '1.875rem' }}
                            >
                                <ArrowForwardIosRounded sx={{
                                    fontSize: '1.875rem',
                                    transition: 'opacity linear .1s',
                                    fill: '#fff',
                                    opacity: id === 4 || (module === 'command_line' ? userData?.command_line : userData?.file_system)?.[id + 1]?.status === 0 ? '0.08' : '0.25',
                                    '&:hover': { opacity: '0.5' }}}
                                />
                            </MuiLink>
                        </IconButton>
                    </Box>
                </Box>
                {!(module === 'command_line' ? userData?.command_line : userData?.file_system)?.[id]?.bonus &&
                    <>
                        <TestPanel
                            chapterId={id}
                            tests={articleData?.tests}
                            module={module}
                            data={(module === 'command_line' ? userData?.command_line : userData?.file_system)?.[id]?.details}
                            achievements={userData?.achievements}
                            retryCount={(module === 'command_line' ? userData?.command_line : userData?.file_system)?.[id]?.retry_count}
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