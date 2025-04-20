import React, { useState, useEffect, useRef } from 'react';
import { Box, Typography } from '@mui/material';
import { introData } from '../../ui/article/introData';
import { commandlineData, filesystemData } from '../../ui/article/chapterData';
import Title from '../../ui/article/Title';

const useVisibleElement = (chapterId) => {
    const [visibleElementId, setVisibleElementId] = useState(null);
    const timeoutId = useRef(null);
    const elements = useRef(Array.from(document.getElementsByClassName('Title')));

    useEffect(() => {
        elements.current = Array.from(document.getElementsByClassName('Title'));
    }, [chapterId]);

    useEffect(() => {
        const checkVisibility = () => {
            if (!elements.current?.[0]) return;
            clearTimeout(timeoutId.current);
            timeoutId.current = setTimeout(() =>
                setVisibleElementId(elements.current?.findLast((el) => {
                    return el?.offsetTop + el?.offsetHeight + el?.offsetParent?.offsetTop + el?.offsetParent?.offsetParent?.offsetTop - 170 < window.scrollY
                })?.id)
            , 100);
        };

        const handleScroll = () => {
            checkVisibility();
        };
    
        window.addEventListener("scroll", handleScroll);
        return () => {
            window.removeEventListener("scroll", handleScroll);
        };
    }, [elements]);
  
    return visibleElementId;
};


export default function ChapterNavigation({ moduleName, chapterId }) {
    const currentDataset = moduleName === "Введение" ? introData?.[chapterId]?.content : (
        moduleName === "Командная строка" ? commandlineData?.[chapterId]?.content : filesystemData?.[chapterId]?.content
    );
    const [current, setCurrent] = useState(currentDataset?.find(el => el.component === Title)?.text);

    const handleClick = (id) => {
        setCurrent(id);
        window.scrollTo({ top: document.getElementById(id)?.getBoundingClientRect()?.top - 100 + window.scrollY, behavior: 'smooth' });
    };
    
    const visibleElementId = useVisibleElement(chapterId);
    useEffect(() => {
        !!visibleElementId && setCurrent(visibleElementId);
    }, [visibleElementId]);

    useEffect(() => {
        setCurrent(currentDataset?.find(el => el.component === Title)?.text);
    }, [chapterId, currentDataset]);

    return (
        <Box
            position='fixed' left='3.125rem' top='6.625rem' width='18.125rem'
            display='flex' flexDirection='column' gap='0.625rem' color='rgba(255, 255, 255, 90%)'
        >
            <Typography fontSize='1.25rem' fontWeight={600}>Содержание</Typography>
            <Box width='13.125rem' bgcolor='rgba(255, 255, 255, 30%)' height='0.09rem' my='0.3rem' borderRadius='0.3rem'/>
            <Box display='flex' flexDirection='column' gap='0.19rem' letterSpacing='0.02rem'>
                {
                    currentDataset?.filter(el => el.component === Title)?.map(el => {
                        return (
                            <Typography
                                key={el?.text} width='fit-content'
                                fontSize='0.875rem' fontWeight={current === el?.text ? 550 : 300}
                                sx={{ opacity: current === el?.text ? '1' : '0.5', cursor: 'pointer'}}
                                onClick={() => handleClick(el?.text)}
                            >
                                {el?.text}
                            </Typography>
                        );
                    })
                }
            </Box>
            <Box display={moduleName === "Введение" || chapterId === 4 ? 'none' : 'flex'} flexDirection='column' gap='0.188rem' letterSpacing='0.02rem'>
                <Typography
                    fontSize='0.875rem' fontWeight={500}
                    sx={{ opacity: current === "Тестовые задания" ? '1' : '0.5', cursor: 'pointer'}}
                    onClick={() => handleClick("Тестовые задания")}
                >
                    Тестовые задания
                </Typography>
                <Typography
                    fontSize='0.875rem' fontWeight={500}
                    sx={{ opacity: current === "Итого" ? '1' : '0.5', cursor: 'pointer'}}
                    onClick={() => handleClick("Итого")}
                >
                    Итого
                </Typography>
            </Box>
        </Box>
    );
}