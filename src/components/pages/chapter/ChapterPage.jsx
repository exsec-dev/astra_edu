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
        <PageWrapper padding='0 240px 0 350px' gap='30px' position='relative'>
            <ChapterNavigation moduleName="Командная строка" chapterId={id}/>
            <Box sx={{ display: 'flex', gap: '30px', flexDirection: 'column', py: '5px', width: '100%' }}>
                <NavPanel moduleName="Командная строка" chapterName={articleData?.chapter}/>
                <Box sx={{
                    position: 'relative', display: 'flex', gap: '10px', flexDirection: 'column',
                    px: '40px', pt: '15px', pb: '20px', border: '1px solid rgba(255, 255, 255, 5%)',
                    borderRadius: '25px', bgcolor: 'var(--main-color)'
                }}>
                    <Box position='fixed' top='50%' left='250px'>
                        <IconButton sx={{ color: 'rgba(255, 255, 255, 25%)' }} disabled={id === 0}>
                            <MuiLink
                                component={Link}
                                to={"/module/commandline/?id=" + (id - 1)}
                                sx={{ color: '#fff', maxHeight: '30px' }}
                            >
                                <ArrowBackIosRounded sx={{
                                    fontSize: '30px',
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
                    <Box position='fixed' top='50%' right='140px'>
                        <IconButton sx={{ color: 'rgba(255, 255, 255, 25%)' }} disabled={id === 4 || JSON.parse(userData?.command_line || "{}")?.[id + 1]?.status === 0}>
                            <MuiLink
                                component={Link}
                                to={"/module/commandline/?id=" + (id + 1)}
                                sx={{ color: '#fff', maxHeight: '30px' }}
                            >
                                <ArrowForwardIosRounded sx={{
                                    fontSize: '30px',
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
                            position: 'relative', display: 'flex', gap: '10px', flexDirection: 'column',
                            px: '40px', pt: '15px', pb: '20px', border: '1px solid rgba(255, 255, 255, 5%)',
                            borderRadius: '25px', bgcolor: 'var(--main-color)'
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