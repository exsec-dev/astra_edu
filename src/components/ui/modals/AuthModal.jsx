import React, { useState, useEffect, useContext } from 'react';
import { addAchievement } from '../AchievementSnackbar';
import { UserContext } from '../../../context';
import { useQueryClient } from 'react-query';
import { Box, Dialog, DialogActions, DialogContent, IconButton, Typography, } from '@mui/material';
import { useSnackbar } from 'notistack';
import { useMutation } from 'react-query';
import ClearRoundedIcon from '@mui/icons-material/ClearRounded';
import { Requests } from '../../../Requests';
import { FilledButton } from '../form/FilledButton';
import { FormTextField } from '../form/FormTextField';
import { Form, Formik } from 'formik';
import { Logo } from '../../../icons/Logo';
import * as Yup from 'yup';

const formStyle = {
    backgroundColor: 'var(--main-color)',
    padding: '40px 10px 30px',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    borderRadius: '20px',
    border: '1px solid rgba(255, 255, 255, 5%)',
};

const textLinkStyle = {
    color: '#ffffff50',
    fontSize: '14px',
    display: 'flex',
    gap: '5px',
    fontWeight: '250',
    cursor: 'pointer',
    paddingBottom: '2px'
};

export default function AuthModal({open, isLogin=false, handleClose}) {
    const { setIsAuthorized } = useContext(UserContext);
    const queryClient = useQueryClient();
    const [isModalLogin, setIsModalLogin] = useState(isLogin);
    const { enqueueSnackbar } = useSnackbar();

    useEffect(() => {
        setIsModalLogin(isLogin);
    }, [open, isLogin]);

    const loginUser = useMutation(Requests.userLogin, {
        onSuccess: (data) => {
            localStorage.setItem('token', data?.data?.token);
            setIsAuthorized(true);
            enqueueSnackbar('Авторизация успешна', { variant: 'success' });
            handleClose();
        },
        onError: (error) => {
            console.error(error);
            const mes = error?.response?.data?.message;
            enqueueSnackbar(mes ? mes : 'Авторизация не пройдена', { variant: 'error' });
        }
    });

    const registerUser = useMutation(Requests.userRegister, {
        onSuccess: (data) => {
            localStorage.setItem('token', data?.data?.token);
            setIsAuthorized(true);
            enqueueSnackbar('Регистрация успешна', { variant: 'success' });
            addAchievement({name: 'quick_start', enqueueSnackbar, queryClient, timeout: 3000});
            handleClose();
        },
        onError: (error) => {
            console.error(error);
            const mes = error?.response?.data?.message;
            enqueueSnackbar(mes ? mes : 'Регистрация не пройдена', { variant: 'error' });
        }
    });

    const INITIAL_FORM_STATE = {
        login: "",
        password: "",
        password2: "",
    };

    const FORM_VALIDATION = new Yup.ObjectSchema({
        login: isModalLogin ?
            Yup.string().required("Введите логин")
            :
            Yup.string()
            .min(5, 'Логин должен быть не менее 5 символов')
            .max(20, 'Логин должен быть не более 20 символов')
            .matches(/^[a-zA-Z0-9_]+$/, {
                message: 'Разрешены только латиница, цифры и _',
                excludeEmptyString: true
            })
            .required("Введите логин"),
        password: isModalLogin ?
            Yup.string().required("Введите пароль")
            :
            Yup.string()
            .min(5, 'Пароль должен быть не менее 5 символов')
            .max(20, 'Пароль должен быть не более 20 символов')
            .required("Введите пароль"),
        password2: !isModalLogin && Yup.string()
            .oneOf([Yup.ref('password'), null], 'Пароли должны совпадать')
            .required('Повторите пароль'),
    });

    const handleSubmit = (values) => {
        const data = {username: values?.login, password: values?.password};
        if (isModalLogin) {
            return loginUser.mutate(data);
        } else {
            return registerUser.mutate(data);
        }
    };

    return (
        <Dialog open={open} onBackdropClick={handleClose} sx={{ '& .MuiPaper-root': { backgroundColor: 'transparent', }}}>
            <Box sx={formStyle}>
                <IconButton sx={{position: 'absolute', right: '10px', top: '10px', color: '#ffffff50'}} onClick={handleClose}>
                    <ClearRoundedIcon />
                </IconButton>
                <Logo scale='1.1'/>
                <Formik
                    initialValues={{...INITIAL_FORM_STATE}}
                    validationSchema={FORM_VALIDATION}
                    onSubmit={handleSubmit}
                    validateOnChange={false}
                    validateOnBlur={false}
                >
                    {({ isSubmitting, submitForm }) => (
                        <Form>
                            <DialogContent>
                                <Box sx={{display: 'flex', flexDirection: 'column', gap: '15px'}}>
                                    <FormTextField label="Логин" name="login" />
                                    <FormTextField label="Пароль" name="password" />
                                    {!isModalLogin && <FormTextField label="Повторите пароль" name="password2" />}
                                </Box>
                            </DialogContent>
                            <DialogActions sx={{display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: '10px'}}>
                                <FilledButton 
                                    label={isModalLogin ? "Войти" : "Создать аккаунт"}
                                    handleClick={submitForm}
                                    fontSize="13px"
                                    padding="10px 70px"
                                    height="37px"
                                />
                                {
                                    isModalLogin ?
                                        <Typography
                                            onClick={() => setIsModalLogin(false)}
                                            sx={textLinkStyle}
                                        >
                                            Нет аккаунта?
                                            <span style={{textDecoration: 'underline', ...textLinkStyle}}>
                                                Зарегистрироваться
                                            </span>
                                        </Typography>
                                    :
                                        <Typography
                                            onClick={() => setIsModalLogin(true)}
                                            sx={textLinkStyle}
                                        >
                                            Уже есть аккаунт?
                                            <span style={{textDecoration: 'underline', ...textLinkStyle}}>
                                                Войти
                                            </span>
                                        </Typography>
                                }
                            </DialogActions>
                        </Form>
                    )}
                </Formik>
            </Box>
        </Dialog>
    );
}