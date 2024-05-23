import React, { useContext } from 'react';
import { UserContext } from '../../../context';
import { useLocation } from 'react-router';
import { Box, IconButton, Typography, Link as MuiLink, Button } from '@mui/material';
import { Link } from 'react-router-dom';
import { ArrowForwardIosRounded, ArrowBackIosRounded, HomeRounded, EastRounded } from '@mui/icons-material';
import PageWrapper from '../../ui/wrappers/PageWrapper';
import LoadingPage from '../../ui/containers/LoadingPage';
import { moduleMap, statusMap } from '../module/Module';

const linkMap = {
  "Введение": "intro",
  "Командная строка": "commandline"
}

const Module = ({ id, isBonus, status, points, title, moduleName }) => {
  let color = 'var(--widget-color)';
  if (status === 2) {
    color = 'var(--second-color)';
  }
  
  return (
    <Button disabled={status === 0} sx={{ padding: '0', color: 'rgba(255, 255, 255, 15%)', borderRadius: '0.938rem', textTransform: 'none', cursor: status !== 0 ? 'pointer' : 'auto', }}>
      <MuiLink
        component={Link}
        to={`/module/${linkMap[moduleName]}/?id=${id}`}
        sx={{ color: '#fff', width: '100%', textDecoration: 'none !important' }}
      >
        <Box
          display='flex' alignItems='center' border='1px solid rgba(255, 255, 255, 5%)' flexDirection='row'
          padding='0.625rem 3.125rem 0.625rem 1.875rem' borderRadius='0.938rem' justifyContent='space-between' width='100%'
          bgcolor={color} letterSpacing='0.03rem'
          sx={{
            position: 'relative', background: isBonus ? "#2c2154" : null, overflow: 'hidden',
            '&::after': {
              position: 'absolute', height: '100%', width: '100%', content: '""', left: '0',
              backgroundColor: 'rgba(255, 255, 255, 3%)', opacity: '0', zIndex: '2', transition: 'opacity .1s linear',
            }, '&:hover::after': { opacity: status !== 0 ? '1' : '0' },
            '&::before': {
              animation: isBonus ? 'slide 3s infinite ease-in-out' : null, left: '0', transform: 'translateX(100%)',
              position: 'absolute', height: '100%', width: '100%', content: '""',
              background: isBonus ? 'linear-gradient(90.22deg, #2c215400 0%, #40266e9e 60%, #2a1f5500 100%)' : null,
            }
          }}
        >
          <Box display='flex' flexDirection='row' gap='1.25rem' alignItems='center' zIndex={2}>
            <Box minWidth='0.75rem' minHeight='0.75rem' bgcolor={statusMap[status]} borderRadius='50%'/>
            <Box display='flex' flexDirection='row' gap='0.625rem' alignItems='center' zIndex={2}>
              <Typography fontSize='1rem' fontWeight={600} sx={{ opacity: status === 2 ? '0.5' : '1'}}>{title}</Typography>
              <EastRounded sx={{ fontSize: '1.5rem', visibility: status === 1 ? 'visible' : 'hidden' }}/>
            </Box>
          </Box>
          <Typography
            visibility={["Знакомство", "Обучение на платформе"].includes(title) ? 'hidden' : 'visible'}
            fontSize='1.5rem' fontWeight={800}
            sx={{ opacity: status === 2 ? '0.5' : '1', zIndex: 2}}
          >
            {points || 0}/5
          </Typography>
        </Box>
      </MuiLink>
    </Button>
  );
}

export default function ChaptersPage() {
  const { userData, isLoading } = useContext(UserContext);
  const location = useLocation();
  const name = new URLSearchParams(location.search).get("name");
  const moduleData = moduleMap?.find(el => el?.title === name);
  const moduleDataIndex = moduleMap?.findIndex(el => el?.title === name);
  !moduleData?.description && window.location.replace('/');

  const map = {
    "Введение": JSON.parse(userData?.["intro"] || "[]"),
    "Командная строка": JSON.parse(userData?.["command_line"] || "[]"),
  };

  return (
    <PageWrapper padding='0 !important'>
      { isLoading ?
          <LoadingPage />
        :
          <Box sx={{ display: 'flex', flexDirection: 'row', width: '100%' }}>
            <Box width='15.62rem' height='100%' display='flex' alignItems='center' justifyContent='flex-end' pr='3.125rem'>
              <IconButton sx={{ color: 'rgba(255, 255, 255, 25%)' }} disabled={!moduleMap?.[moduleDataIndex - 1]?.title}>
                <MuiLink
                  component={Link}
                  to={"/module?name=" + moduleMap?.[moduleDataIndex - 1]?.title}
                  sx={{ color: '#fff', maxHeight: '1.875rem' }}
                >
                  <ArrowBackIosRounded sx={{ fontSize: '1.875rem', transition: 'opacity linear .1s', fill: '#fff', opacity: moduleMap?.[moduleDataIndex - 1]?.title ? '0.25' : '0.08', '&:hover': { opacity: '0.5' }}}/>
                </MuiLink>
              </IconButton>
            </Box>
            <Box width='100%' display='flex' flexDirection='column' gap='1.875rem' py='0.3rem'>
              <Box width='100%' display='flex' flexDirection='row' gap='1.25rem'>
                <MuiLink
                  component={Link}
                  to="/"
                  sx={{ color: '#fff', }}
                >
                  <HomeRounded
                    sx={{
                      fontSize: '2.25rem', transition: 'opacity linear .1s',
                      opacity: '0.5', cursor: 'pointer', mt: '0.375rem',
                      '&:hover': { opacity: '0.75' }
                    }}
                  />
                </MuiLink>
                <Box width='100%' display='flex' flexDirection='column' gap='0.625rem' alignItems='flex-start'>
                  <Typography fontSize='2rem' fontWeight={800}>{moduleData?.title}</Typography>
                  <Typography fontSize='1rem' fontWeight={400} color='#DDDDDD'>{moduleData?.description}</Typography>
                </Box>
              </Box>
              <Box width='100%' display='flex' flexDirection='column' gap='0.625rem' padding='1.875rem 2.5rem' bgcolor='var(--main-color)' borderRadius='1.56rem'>
                {
                  moduleData?.chapters?.map((el, i) => {
                    const curr = map?.[name]?.[i];
                    const points = !curr.bonus && curr.details?.filter((v, i) => v === el?.answers?.[i]).length;
                    return (
                      <Module
                        key={i} id={i}
                        title={el?.title}
                        isBonus={curr?.bonus}
                        status={curr?.status}
                        points={points}
                        moduleName={moduleData?.title}
                      />
                    );
                  })
                }
              </Box>
            </Box>
            <Box width='15.62rem' height='100%' display='flex' alignItems='center' pl='3.125rem'>
              <IconButton sx={{ color: 'rgba(255, 255, 255, 25%)' }} disabled={moduleDataIndex > 0} /*ограничение по модулям*/ >
                <MuiLink
                  component={Link}
                  to={"/module?name=" + moduleMap?.[moduleDataIndex + 1]?.title}
                  sx={{ color: '#fff', maxHeight: '1.875rem' }}
                >
                  <ArrowForwardIosRounded sx={{ fontSize: '1.875rem', transition: 'opacity linear .1s', fill: '#fff', opacity: moduleDataIndex > 0 ? '0.08' : '0.25', '&:hover': { opacity: '0.5' }}}/>
                </MuiLink>
              </IconButton>
            </Box>
          </Box>
      }
    </PageWrapper>
  );
}