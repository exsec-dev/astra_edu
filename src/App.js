import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Dashboard from './components/pages/dashboard/Dashboard';
import WelcomePage from './components/pages/welcome/WelcomePage';
import { useQuery } from 'react-query';
import { UserContext } from './context';
import { Requests } from './Requests';
import Header from './components/Header';
import ScrollToTop from './components/ScrollToTop';
import { ThemeProvider, createTheme, Box, styled } from '@mui/material';
import { SnackbarProvider, MaterialDesignContent, } from 'notistack';
import Footer from './components/Footer';
import ModulesPage from './components/pages/module/ModulesPage';
import ChaptersPage from './components/pages/chapters/ChaptersPage';
import FAQPage from './components/pages/faq/FAQPage';
import { AchievementSnackbar } from './components/ui/AchievementSnackbar';
import IntroRouter from './components/pages/intro/IntroRouter';
import { AnimatePresence } from 'framer-motion';
import ChapterRouter from './components/pages/chapter/ChapterRouter';

const StyledMaterialDesignContent = styled(MaterialDesignContent)(() => ({
  '&.notistack-MuiContent-success': {
    backgroundColor: 'var(--green)',
    color: '#fff',
    height: '3.25rem',
    minWidth: '15.6rem',
    borderRadius: '0.75rem',
    border: '1px solid #ffffff25',
    fontWeight: '450',
    fontSize: '0.875rem',
    padding: '0 1.5rem',
    '& #notistack-snackbar': {
      gap: '1rem'
    }
  },
  '&.notistack-MuiContent-error': {
    backgroundColor: 'var(--red)',
    color: '#fff',
    height: '3.25rem',
    minWidth: '15.6rem',
    borderRadius: '0.75rem',
    border: '1px solid #ffffff25',
    fontWeight: '450',
    fontSize: '0.875rem',
    padding: '0 1.5rem',
    '& #notistack-snackbar': {
      gap: '1rem'
    }
  },
  '&.notistack-MuiContent-default': {
    backgroundColor: 'var(--second-color)',
    height: '5rem',
    width: '18.75rem',
    borderRadius: '0.75rem',
    border: '1px solid #ffffff25'
  },
}));


function App() {
  const [isAuthorized, setIsAuthorized] = useState(!!localStorage.getItem('token'));
  const [userData, setUserData] = useState({});

  const { isLoading } = useQuery(['userdata'], () => Requests.getUserData(), {
    enabled: isAuthorized,
    refetchOnWindowFocus: false,
    onSuccess: (data) => {
      setUserData(data?.data);
    },
    onError: (e) => {
      console.error('Ошибка авторизации: ' + e, { variant: 'error' });
      setIsAuthorized(false);
      localStorage.removeItem('token');
    }
  });

  const THEME = createTheme({
    typography: {
      "fontFamily": '"Manrope", sans-serif',
      "color": '#fff'
    },
  });

  return (<ThemeProvider theme={THEME}>
    <UserContext.Provider
        value={{ userData, isLoading, isAuthorized, setIsAuthorized }}>
        <SnackbarProvider
          maxSnack={3}
          anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'right',
          }}
          Components={{
            success: StyledMaterialDesignContent,
            error: StyledMaterialDesignContent,
            default: StyledMaterialDesignContent,
            achievement: AchievementSnackbar,
          }}
        >
          <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '1.5rem', minHeight: '100vh', color: 'white', width: '100%' }}>
            <Router>
              <ScrollToTop />
              <Header/>
              <AnimatePresence mode="wait">
                <Routes>
                  <Route path="/" element={isAuthorized ? <Dashboard /> : <WelcomePage />} />
                  <Route path="/module" element={isAuthorized ? <ChaptersPage />: <WelcomePage />} />
                  <Route path="/module/intro" element={isAuthorized ? <IntroRouter />: <WelcomePage />} />
                  <Route path="/module/commandline" element={isAuthorized ? <ChapterRouter />: <WelcomePage />} />
                  <Route path="/modules" element={<ModulesPage />} />
                  <Route path="/books" element={<Books />} />
                  <Route path="/faq" element={<FAQPage />} />
                </Routes>
              </AnimatePresence>
              <Footer />
            </Router>
          </Box>
        </SnackbarProvider>
    </UserContext.Provider>
  </ThemeProvider>);
}

export default App;


const Books = () => {
  return <div>Books Page</div>;
};