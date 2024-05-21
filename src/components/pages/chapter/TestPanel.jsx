import React, { useEffect, useState } from 'react';
import { Box, Typography, Button } from '@mui/material';
import { useMutation, useQueryClient } from 'react-query';
import { addAchievement } from '../../ui/AchievementSnackbar';
import { useSnackbar } from 'notistack';
import { RotateLeftRounded, ArrowBackIosNewRounded, ArrowForwardIosRounded } from '@mui/icons-material';
import { Requests } from '../../../Requests';
import Title from '../../ui/article/Title';

const answerMap = ["A", "B", "C", "D"];
const Answer = ({ isAnswered, isCorrect, isChosen, index, text, handleClick, isLoading }) => {
    return (
        <Box
            sx={{
                display: 'flex', gap: '25px', py: '12px', px: '25px', 
                borderRadius: '15px', border: '1px solid rgba(255, 255, 255, 5%)',
                bgcolor: !isAnswered || !isChosen ? '#2B2E3B' : ( isCorrect ? 'var(--green)' : 'var(--red)'),
                opacity: isAnswered && !isChosen ? '0.5' : '1',
                cursor: isAnswered ? 'auto' : 'pointer', alignItems: 'center',
                transition: 'background-color .1s linear', pointerEvents: isLoading ? 'none' : 'auto',
                '&:hover': { bgcolor: !isAnswered ? 'var(--third-color)' : '' }
            }}
            onClick={isAnswered ? null : () => handleClick(answerMap[index])}
        >
            <Typography fontSize='22px' fontWeight={500} color='#e9e9ea'>
                {answerMap[index]}
            </Typography>
            <Typography fontSize='16px' fontWeight={500} color='#e9e9ea'>
                {text}
            </Typography>
        </Box>
    );
}

export default function TestPanel({ chapterId, tests, retryCount, data, achievements }) {
    const [current, setCurrent] = useState(0);
    const [isLoading, setIsLoading] = useState(false);

    const { enqueueSnackbar } = useSnackbar();
    const queryClient = useQueryClient();

    useEffect(() => {
        if (data?.every(el => !!el) && chapterId === 0 && !achievements?.includes('first_steps')) {
            addAchievement({name: "first_steps", enqueueSnackbar, queryClient, timeout: 3000});
        }
        if (data?.every((el, i) => el === tests?.[i]?.correct) && retryCount === 3 && !achievements?.includes('virtuoso')) {
            addAchievement({name: "virtuoso", enqueueSnackbar, queryClient, timeout: 3000});
        }
        if (data?.every((el, i) => el === tests?.[i]?.correct) && retryCount === 0 && !achievements?.includes('fortune')) {
            addAchievement({name: "fortune", enqueueSnackbar, queryClient, timeout: 3000});
        }
    }, [data, retryCount, achievements, chapterId, enqueueSnackbar, queryClient, tests]);

    useEffect(() => {
        setCurrent(0);
    }, [chapterId])

    const setAnswer = useMutation(Requests.setChapterAnswer, {
        onSuccess: (data) => {
            setIsLoading(false);
            if (data?.data?.message === "Bonus" && !achievements?.includes('without_interrupting')&& !achievements?.includes('refill')) {
                addAchievement({name: "without_interrupting", enqueueSnackbar, queryClient, timeout: 3000});
                addAchievement({name: "refill", enqueueSnackbar, queryClient, timeout: 6000});
            } else {
                queryClient.invalidateQueries(['userdata']);
                queryClient.invalidateQueries(['leaderboard']);
            }
        },
        onError: (error) => {
            setIsLoading(false);
            console.error(error);
        }
    });

    const setRetry = useMutation(Requests.setRetryCount, {
        onSuccess: () => {
            queryClient.invalidateQueries(['userdata']);
        },
        onError: (error) => {
            console.error(error);
        }
    });

    const handleSubmit = (answer, isCorrect) => {
        if (!isLoading) {
            setIsLoading(true);
            return setAnswer.mutate({ answer, question: current, module: "Командная строка", chapter: chapterId, is_correct: isCorrect });
        }
    };

    const handleRetry = () => {
        return setRetry.mutate({ question: current, module: "Командная строка", chapter: chapterId });
    };

    return (
        <Box sx={{
            display: 'flex', gap: '10px', flexDirection: 'column',
            px: '40px', pt: '15px', pb: '25px', border: '1px solid rgba(255, 255, 255, 5%)',
            borderRadius: '25px', bgcolor: 'var(--main-color)', color: '#DDDDDD'
        }}>
            <Title text="Тестовые задания"/>
            <Box sx={{ display: 'flex', gap: '15px', flexDirection: 'column', }}>
                <Typography fontSize='18px' fontWeight={700} color='#e9e9ea' whiteSpace='break-spaces'>{tests?.[current]?.name}</Typography>
                <Box sx={{ display: 'flex', gap: '8px', flexDirection: 'column', position: 'relative'}}>
                    <ArrowBackIosNewRounded sx={{
                        position: 'absolute', left: '-30px', top: 'calc(50% - 12px)',
                        opacity: '0.5', visibility: current === 0 ? 'hidden' : 'visible',
                        cursor: 'pointer', '&:hover': { opacity: '0.75' }, transform: 'scaleY(1.5)'
                    }} onClick={() => setCurrent(current - 1)}/>
                    {
                        tests?.[current]?.answers?.map((el, i) => {
                            return (
                                <Answer
                                    key={i} index={i}
                                    isAnswered={!!data?.[current]}
                                    text={el} isLoading={isLoading}
                                    isCorrect={["A", "B", "C", "D"][i] === tests?.[current]?.correct}
                                    isChosen={data?.[current] === ["A", "B", "C", "D"][i]}
                                    handleClick={(answer) => handleSubmit(answer, answer === tests?.[current]?.correct)}
                                />
                            );
                        })
                    }
                    <ArrowForwardIosRounded sx={{
                        position: 'absolute', right: '-30px', top: 'calc(50% - 12px)',
                        opacity: '0.5', visibility: current === 4 ? 'hidden' : 'visible',
                        cursor: 'pointer', '&:hover': { opacity: '0.75' }, transform: 'scaleY(1.5)'
                    }} onClick={() => setCurrent(current + 1)}/>
                </Box>
                <Box sx={{ display: 'flex', gap: '10px', opacity: retryCount <= 0 || !data?.[current] || data?.[current] === tests?.[current]?.correct ? '0.5' : '1' }}>
                    <Button
                        disabled={retryCount <= 0 || !data?.[current] || data?.[current] === tests?.[current]?.correct}
                        onClick={handleRetry}
                        sx={{ 
                            display: 'flex', gap: '5px', alignItems: 'center', textTransform: 'none',
                            color: '#D0D4DA !important', bgcolor: '#42536C', borderRadius: '25px', padding: '7px 22px 7px 25px',
                            '&:hover': { bgcolor: '#4D617E' }, fontWeight: '600'
                        }}
                    >
                        Повторить
                        <RotateLeftRounded sx={{ fill: '#D0D4DA', fontSize: '22px' }}/>
                    </Button>
                    <Button
                        disabled
                        sx={{ 
                            display: 'flex', gap: '5px', alignItems: 'center', textTransform: 'none',
                            color: '#D0D4DA !important', bgcolor: '#2B2E3B', borderRadius: '25px', padding: '7px 22px',
                            '&:hover': { bgcolor: '#2B2E3B' }, fontWeight: '600', cursor: 'auto'
                        }}
                    >
                        Осталось попыток: {retryCount}
                    </Button>
                </Box>
            </Box>
        </Box>
    );
}