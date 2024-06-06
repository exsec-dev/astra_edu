import React, { useState } from 'react';
import { Box, Typography, Link as MuiLink } from '@mui/material';
import { LockClockRounded, AccessTimeRounded } from '@mui/icons-material';
import { Link } from 'react-router-dom';
import m1 from '../../../icons/module1.webp';
import m2 from '../../../icons/module2.webp';
import m3 from '../../../icons/module3.webp';
import m4 from '../../../icons/module4.webp';
import m5 from '../../../icons/module5.webp';
import m6 from '../../../icons/module6.webp';
import m7 from '../../../icons/module7.webp';
import m8 from '../../../icons/module8.webp';

export const statusMap = {
    2: 'var(--done)',
    1: 'var(--progress)',
    0: 'var(--red)',
};

export const moduleMap = [
    {
        title: 'Введение',
        text: 'Вводный модуль, рассказывающий про организацию обучения и навигацию на платформе',
        img: m1,
        time: '10 мин.',
        color: '#6384B4',
        chapters: [
            { title: "Знакомство", bonus: false },
            { title: "Обучение на платформе", bonus: false }
        ],
        description: 'Это вводный модуль, который познакомит вас с вашим начинающим наставником и позволит получше узнать все возможности этой платформы.',
    },
    {
        title: 'Командная строка',
        text: 'Модуль для начинающих пользователей командной строки и её основных утилит',
        img: m2,
        time: '2,5 ч.',
        color: '#1E1842',
        chapters: [
            { title: "Интерфейс командной строки Linux", bonus: false, answers: ["A", "A", "C", "B", "C"] },
            { title: "Навигация", bonus: false, answers: ["D", "C", "D", "A", "C"] },
            { title: "Исследование системы", bonus: false, answers: ["C", "B", "D", "B", "B"] },
            { title: "Работа с командами", bonus: false, answers: ["A", "D", "C", "A", "D"] },
            { title: "Текстовый редактор Vim", bonus: true }
        ],
        description: 'Модуль для начинающих пользователей командной строки и её основных утилит. Вы изучите основы работы с терминалом Linux, включая основные команды, навигацию по файловой системе и просмотр содержимого файлов. Также модуль включает бонусный урок “Текстовый редактор Vim”.',
    },
    {
        title: 'Графический режим',
        text: 'Модуль, помогающий освоить Astra Linux в графическом режиме',
        img: m3,
        time: '1,5 ч.',
        color: '#5851A1',
    },
    {
        title: 'Файловая система',
        text: 'Модуль, рассказывающий о том, как устроена файловая система в Linux',
        img: m4,
        time: '3 ч.',
        color: '#3F5192',
    },
    {
        title: 'Пользователи',
        text: 'Вы узнаете о создании и управлении учетными записями пользователей и их группами',
        img: m5,
        time: '2 ч.',
        color: '#694B9B',
    },
    {
        title: 'Процессы',
        text: 'Вы узнаете о жизненном цикле процессов, их состояниях и командах',
        img: m6,
        time: '2,5 ч.',
        color: '#C97C87',
    },
    {
        title: 'Bash-скрипты',
        text: 'Вы научитесь писать простые скрипты на языке оболочки Bash для автоматизации рутинных задач',
        img: m7,
        time: '2 ч.',
        color: '#312D57',
    },
    {
        title: 'Безопасность',
        text: 'Вы узнаете об обеспечении безопасности системы с помощью аутентификации и прав доступа',
        img: m8,
        time: '3 ч.',
        color: '#6690B4',
    },
    {
        title: 'Безопасность',
        text: 'Вы узнаете об обеспечении безопасности системы с помощью аутентификации и прав доступа',
        img: m8,
        time: '3 ч.',
        color: '#6690B4',
    },
];

export default function Module({ id, status, isAuthorized }) {
    const [open, setOpen] = useState(false);

    return (
        <MuiLink
            component={Link}
            to={id === 0 ? "/module?name=Введение" : (id === 1 ? "/module?name=Командная%20строка" : null)}
            sx={{
                color: '#fff', textDecoration: 'none', pointerEvents: id > 1 || status === 0 ? 'none' : 'auto',
                width: '20.5rem', minHeight: '20.625rem', position: 'relative',
                flexDirection: 'column', borderRadius: '1.5rem', display: 'flex', visibility: id !== 8 ? 'initial' : 'hidden',
                background: 'linear-gradient(180deg, rgba(46, 48, 67, 0) 0%, rgba(181, 215, 243, 0.2) 200%)',
                backgroundColor: '#2F3245', border: 'solid #ffffff15 1px',
            }}
        >
            <Box sx={{ display: 'flex', borderRadius: '1.5rem 1.5rem 0 0', justifyContent: 'space-around', backgroundColor: moduleMap[id].color }}>
                <img src={moduleMap[id].img} style={{height: '13.125rem'}} alt='Module'/>
            </Box>
            <Box sx={{ display: 'flex', gap: '0.5rem', padding: '0.938rem 1.25rem 1.563rem', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
                <Box sx={{ display: 'flex', gap: '0.938rem', paddingTop: '0.3rem', flexDirection: 'row', justifyContent: 'space-between', width: '100%' }}>
                    <Typography fontSize='1.18rem' fontWeight={800} lineHeight='1.5rem' sx={{ textWrap: 'nowrap' }}>{moduleMap[id].title}</Typography>
                    <Box sx={{ display: 'inline-flex', alignItems: 'center', gap: '0.625rem', flexDirection: 'row', justifyContent: 'center' }}>
                        <Box sx={{ display: 'inline-flex', alignItems: 'center', gap: '0.25rem', flexDirection: 'row', justifyContent: 'center' }}>
                            <AccessTimeRounded sx={{ opacity: '0.5', width: '1rem', height: '1rem' }}/>
                            <Typography fontSize='0.8rem' fontWeight='450' sx={{ opacity: '0.5', textWrap: 'nowrap' }}>
                                {moduleMap[id].time}
                            </Typography>
                        </Box>
                        <Box sx={{ display: isAuthorized ? 'block' : 'none', minWidth: '0.7rem', minHeight: '0.7rem', borderRadius: '50%', backgroundColor: statusMap[status]}}/>
                    </Box>
                </Box>
                <div style={{ display: 'flex', height: '0.1rem', width: '100%', opacity: '0.1', backgroundColor: '#fff', borderRadius: '1px' }}/>
                <Typography width='100%' fontSize='0.656rem' fontWeight={300} sx={{ opacity: '0.5' }} letterSpacing='0.03rem'>{moduleMap[id].text}</Typography>
            </Box>
            {
                id > 1 &&
                <Box onMouseOver={() => setOpen(true)} onMouseOut={() => setOpen(false)}
                    sx={{
                        width: open ? '8.75rem' : '2.5rem', height: '2.5rem', borderRadius: '3.125rem', display: 'flex', alignItems: 'center', transition: 'background-color .2s linear, width .25s linear',
                        bgcolor: 'rgb(255 255 255 / 17%)', position: 'absolute', top: '0.625rem', right: '0.625rem', justifyContent: 'center', overflow: 'hidden',
                        pointerEvents: 'all', color: '#ffffffc2', '&:hover': { bgcolor: 'rgb(255 255 255 / 25%)' }, padding: '0 0.625rem', backdropFilter: 'blur(5px)',
                    }}
                >
                    <LockClockRounded/>
                    {open && <Typography fontSize='0.78rem' fontWeight={500} sx={{ textWrap: 'nowrap', mx: '0.3rem' }}>В разработке</Typography>}
                </Box>
            }
        </MuiLink>
    );
}