import React, { useContext } from 'react';
import { UserContext } from '../../../context';
import { Box, Typography, Stack, Link as MuiLink, Button } from '@mui/material';
import { Link } from 'react-router-dom';
import LoadingPage from '../../ui/containers/LoadingPage';
import PageWrapper from '../../ui/wrappers/PageWrapper';
import PageTitle from '../../ui/containers/PageTitle';
import Content from '../../ui/wrappers/Content';
import FullWidthBanner from '../../ui/containers/FullWidthBanner';
import Widget from '../../ui/containers/Widget';
import relax from '../../../icons/robocat/relax.webp';
import target from '../../../icons/badges/target.webp';
import cup from '../../../icons/badges/cup.webp';
import puzzle from '../../../icons/badges/puzzle.webp';
import EastRoundedIcon from '@mui/icons-material/EastRounded';
import smile from '../../../icons/robocat/smile_small.webp';

const stackImageStyle = {
  spacing: '0.438rem',
  direction: 'row',
  fontWeight: 800,
  fontSize: '1.75rem',
  alignItems: 'center',
  gap: '0.438rem'
}

export default function WelcomePage() {
  const { isLoading } = useContext(UserContext);

  return (
    <PageWrapper>
      { isLoading ?
          <LoadingPage />
        :
          <Content>
            <PageTitle value="Мое обучение"/>
            <FullWidthBanner isWelcome={true}/>
            <Box sx={{ display: 'flex', gap: '1.5rem', width: '100%' }}>
              <Widget padding='1.25rem 3.125rem 1.25rem 1.875rem' gap='1.5rem' sx={{ width: '100%' }}>
                <Box sx={{ height: '7.5rem', display: 'flex' }}>
                  <img src={relax} loading='lazy' alt="Robocat" style={{width: '7.5rem', height: '7.5rem'}}/>
                </Box>
                <Box sx={{ gap: '0.625rem', display: 'flex', flexDirection: 'column', color: '#fff', justifyContent: 'flex-start', maxWidth: '37.5rem' }}>
                  <Typography sx={{ fontSize: '1.375rem', fontWeight: '800' }}>
                    Курс «Базовое администрирование»
                  </Typography>
                  <Typography sx={{ fontSize: '0.8rem', fontWeight: '400', letterSpacing: '0.016rem' }}>
                    Вы познакомитесь с основными принципами работы Astra Linux, научитесь понимать, настраивать и поддерживать систему, а также освоите основные команды и инструменты администрирования.
                  </Typography>
                </Box>
              </Widget>
              <Widget padding='1.25rem 2.2rem'>
                <Box sx={{ display: 'flex', flexDirection: 'column', gap: '0.2rem', color: '#fff', }}>
                  <Stack spacing='0.625rem' direction='row' alignItems='center'>
                    <Stack {...stackImageStyle}><img style={{width: '1.875rem', height: '1.875rem'}} src={target} alt="Модулей"/>8</Stack>
                    <Typography fontSize='1.125rem' fontWeight={500}>модулей</Typography>
                  </Stack>
                  <Stack spacing='0.625rem' direction='row' alignItems='center'>
                    <Stack {...stackImageStyle}><img style={{width: '1.875rem', height: '1.875rem'}} src={puzzle} alt="Заданий"/>200</Stack>
                    <Typography fontSize='1.125rem' fontWeight={500}>заданий</Typography>
                  </Stack>
                  <Stack spacing='0.625rem' direction='row' alignItems='center'>
                    <Stack {...stackImageStyle}><img style={{width: '1.875rem', height: '1.875rem'}} src={cup} alt="Достижений"/>35</Stack>
                    <Typography fontSize='1.125rem' fontWeight={500}>достижений</Typography>
                  </Stack>
                </Box>
              </Widget>
            </Box>
            <MuiLink
              component={Link}
              to="/faq"
              sx={{ width: '100%' }}
            >
              <Button sx={{ padding: '0', textTransform: 'none', width: '100%', color: '#fff', borderRadius: '1.5rem', height: '3.5rem' }}>
                <Widget padding='1rem 3.125rem' gap='1.5rem' sx={{ width: '100%', height: '3.5rem', justifyContent: 'space-between', position: 'relative' }}>
                  <Typography fontSize='1.125rem' fontWeight='700'>Остались вопросы?</Typography>
                  <img src={smile} alt="Robocat" style={{ position: 'absolute', bottom: '0', left: '35%', width: '4.125rem' }}/>
                  <EastRoundedIcon sx={{ fontSize: '1.875rem' }}/>
                </Widget>
              </Button>
            </MuiLink>
          </Content>
      }
    </PageWrapper>
  );
}