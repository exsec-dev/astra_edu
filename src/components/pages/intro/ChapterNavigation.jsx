import React, { useState, useEffect, useRef } from 'react';
import { Box, Typography } from '@mui/material';
import { introData } from '../../ui/article/introData';
import { chapterData } from '../../ui/article/chapterData';
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
                    const z = getComputedStyle(document.body).getPropertyValue('--zoom');
                    return (el?.offsetTop + el?.offsetHeight + el?.offsetParent?.offsetTop + el?.offsetParent?.offsetParent?.offsetTop - 170)*z < window.scrollY
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
    const currentDataset = moduleName === "Введение" ? introData?.[chapterId]?.content : chapterData?.[chapterId]?.content;
    const [current, setCurrent] = useState(currentDataset?.find(el => el.component === Title)?.text);

    const handleClick = (id) => {
        setCurrent(id);
        const z = getComputedStyle(document.body).getPropertyValue('--zoom');
        window.scrollTo({ top: (document.getElementById(id)?.getBoundingClientRect()?.top - 100)*z + window.scrollY, behavior: 'smooth' });
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
            position='fixed' left='50px' top='106px' width='290px'
            display='flex' flexDirection='column' gap='10px' color='rgba(255, 255, 255, 90%)'
        >
            <Typography fontSize='20px' fontWeight={600}>Навигация</Typography>
            <Box width='210px' bgcolor='rgba(255, 255, 255, 30%)' height='1.5px' my='5px' borderRadius='5px'/>
            <Box display='flex' flexDirection='column' gap='3px' letterSpacing='0.02rem'>
                {
                    currentDataset?.filter(el => el.component === Title)?.map(el => {
                        return (
                            <Typography
                                key={el?.text} width='fit-content'
                                fontSize='14px' fontWeight={current === el?.text ? 550 : 300}
                                sx={{ opacity: current === el?.text ? '1' : '0.5', cursor: 'pointer'}}
                                onClick={() => handleClick(el?.text)}
                            >
                                {el?.text}
                            </Typography>
                        );
                    })
                }
            </Box>
            <Box display={moduleName === "Введение" || chapterId === 4 ? 'none' : 'flex'} flexDirection='column' gap='3px' letterSpacing='0.02rem'>
                <Typography
                    fontSize='14px' fontWeight={500}
                    sx={{ opacity: current === "Тестовые задания" ? '1' : '0.5', cursor: 'pointer'}}
                    onClick={() => handleClick("Тестовые задания")}
                >
                    Тестовые задания
                </Typography>
                <Typography
                    fontSize='14px' fontWeight={500}
                    sx={{ opacity: current === "Итого" ? '1' : '0.5', cursor: 'pointer'}}
                    onClick={() => handleClick("Итого")}
                >
                    Итого
                </Typography>
            </Box>
        </Box>
    );
}