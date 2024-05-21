import React, { useState, useContext } from 'react';
import { Logo } from '../icons/Logo';
import { Box, Stack, AppBar, Link as MuiLink, } from '@mui/material';
import ArrowOutwardRoundedIcon from '@mui/icons-material/ArrowOutwardRounded';
import { Link, useLocation } from 'react-router-dom';
import { OutlinedButton } from './ui/form/OutlinedButton';
import AuthModal from './ui/modals/AuthModal';
import { UserContext } from '../context';
import UserPanel from './ui/account/UserPanel';

const headerStyle = {
    backgroundColor: 'var(--main-color)',
    padding: '14px 45px',
    height: '75px',
    display: 'flex',
    justifyContent: 'space-between',
    flexDirection: 'row',
    boxShadow: '#00000020 0 6px 15px',
    alignItems: 'center',
    borderBottom: '1px solid rgba(255, 255, 255, 5%)',
};

const linkStyle = {
    color: '#fff',
    textDecoration: 'none',
    fontWeight: '550'
};

export default function Header() {
    const { isAuthorized, userData, isLoading } = useContext(UserContext);
    const currentPath = useLocation()?.pathname;
    const [openModal, setOpenModal] = useState(false);

    return (
        <AppBar position="sticky" sx={{ ...headerStyle }}>
            <Box sx={{ display: 'flex', gap: '70px', alignItems: 'center', }}>
                <Logo />
                <Stack direction='row' spacing={6}>
                    <MuiLink
                        component={Link}
                        to="/"
                        sx={{ ...linkStyle, opacity: currentPath === "/" || currentPath === "/module" || currentPath === "/module/learn" ? 1 : 0.5, transition: 'opacity .1s linear'}}
                    > Мое обучение
                    </MuiLink>
                    <MuiLink
                        component={Link}
                        to="/modules"
                        sx={{ ...linkStyle, opacity: currentPath === "/modules" ? 1 : 0.5, transition: 'opacity .1s linear'}}
                    > Модули
                    </MuiLink>
                    {/* <MuiLink
                        component={Link}
                        to="/books"
                        sx={{ ...linkStyle, opacity: currentPath === "/books" ? 1 : 0.5, transition: 'opacity .1s linear'}}
                    > Учебники
                    </MuiLink> */}
                    <MuiLink
                        component={Link}
                        to="/faq"
                        sx={{ ...linkStyle, opacity: currentPath === "/faq" ? 1 : 0.5, transition: 'opacity .1s linear'}}
                    > FAQ
                    </MuiLink>
                </Stack>
            </Box>
            {isAuthorized ?
                <UserPanel userData={userData} isLoading={isLoading}/>
            :
                <>
                    <OutlinedButton label="Войти" handleClick={() => setOpenModal(true)} icon={<ArrowOutwardRoundedIcon />}/>
                    <AuthModal open={openModal} handleClose={() => setOpenModal(false)} isLogin={true}/>
                </>
            }
        </AppBar>
    );
}