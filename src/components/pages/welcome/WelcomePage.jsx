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
  spacing: '7px',
  direction: 'row',
  fontWeight: 800,
  fontSize: 28,
  alignItems: 'center',
  gap: '7px'
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
            <Box sx={{ display: 'flex', gap: '25px', width: '100%' }}>
              <Widget padding='20px 50px 20px 30px' gap='25px' sx={{ width: '100%' }}>
                <Box sx={{ height: '120px', display: 'flex' }}>
                  <img src={relax} loading='lazy' alt="Robocat" width={120} height={120}/>
                </Box>
                <Box sx={{ gap: '10px', display: 'flex', flexDirection: 'column', color: '#fff', justifyContent: 'flex-start', height: '120px', maxWidth: '600px' }}>
                  <Typography sx={{ fontSize: '22px', fontWeight: '800' }}>
                    Курс «Базовое администрирование»
                  </Typography>
                  <Typography sx={{ fontSize: '13px', fontWeight: '400', letterSpacing: '0.26px' }}>
                    Вы познакомитесь с основными принципами работы Astra Linux, научитесь понимать, настраивать и поддерживать систему, а также освоите основные команды и инструменты администрирования.
                  </Typography>
                </Box>
              </Widget>
              <Widget padding='20px 35px'>
                <Box sx={{ display: 'flex', flexDirection: 'column', gap: '3px', color: '#fff', }}>
                  <Stack spacing='10px' direction='row' alignItems='center'>
                    <Stack {...stackImageStyle}><img width='30px' height='30px' src={target} alt="Модулей"/>8</Stack>
                    <Typography fontSize={18} fontWeight={500}>модулей</Typography>
                  </Stack>
                  <Stack spacing='10px' direction='row' alignItems='center'>
                    <Stack {...stackImageStyle}><img width='30px' height='30px' src={puzzle} alt="Заданий"/>200</Stack>
                    <Typography fontSize={18} fontWeight={500}>заданий</Typography>
                  </Stack>
                  <Stack spacing='10px' direction='row' alignItems='center'>
                    <Stack {...stackImageStyle}><img width='30px' height='30px' src={cup} alt="Достижений"/>35</Stack>
                    <Typography fontSize={18} fontWeight={500}>достижений</Typography>
                  </Stack>
                </Box>
              </Widget>
            </Box>
            <MuiLink
              component={Link}
              to="/faq"
              sx={{ width: '100%' }}
            >
              <Button sx={{ padding: '0', textTransform: 'none', width: '100%', color: '#fff', borderRadius: '25px', height: '55px' }}>
                <Widget padding='15px 50px' gap='25px' sx={{ width: '100%', height: '55px', justifyContent: 'space-between', position: 'relative' }}>
                  <Typography fontSize='18px' fontWeight='700'>Остались вопросы?</Typography>
                  <img src={smile} width='66px' alt="Robocat" style={{ position: 'absolute', bottom: '0px', left: '265px' }}/>
                  <EastRoundedIcon sx={{ fontSize: '30px' }}/>
                </Widget>
              </Button>
            </MuiLink>
          </Content>
      }
    </PageWrapper>
  );
}