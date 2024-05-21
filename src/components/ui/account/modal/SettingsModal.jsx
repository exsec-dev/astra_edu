import React, { useState, useContext } from 'react';
import { UserContext } from '../../../../context';
import { addAchievement } from '../../AchievementSnackbar';
import { Box, Dialog, DialogActions, DialogContent, Typography, Button } from '@mui/material';
import { useMutation, useQuery, useQueryClient } from 'react-query';
import { Formik, Form } from 'formik';
import * as Yup from 'yup';
import { FormTextField } from '../../form/FormTextField';
import { useSnackbar } from 'notistack';
import ClearRoundedIcon from '@mui/icons-material/ClearRounded';
import { Requests } from '../../../../Requests';
import { OutlinedButton } from '../../form/OutlinedButton';
import { FilledGreyButton } from '../../form/FilledGreyButton';
import { convertToImage } from '../../../../utlis/utils';
import { EditRounded } from '@mui/icons-material';

const formStyle = {
    backgroundColor: 'var(--main-color)',
    padding: '20px 30px 35px',
    display: 'flex',
    flexDirection: 'column',
    color: '#fff',
    gap: '30px',
    borderRadius: '20px',
    border: '1px solid rgba(255, 255, 255, 5%)',
};

export default function SettingsModal({open, userData, handleClose}) {
    const { setIsAuthorized } = useContext(UserContext);
    const { enqueueSnackbar } = useSnackbar();
    const queryClient = useQueryClient();
    const [accountData, setAccountData] = useState();

    useQuery(['accountdata'], () => Requests.getAccountData(), {
        enabled: open,
        refetchOnWindowFocus: false,
        onSuccess: (data) => {
            setAccountData(data?.data);
        },
        onError: (e) => {
            enqueueSnackbar('Ошибка получения данных: ' + e, { variant: 'error' });
        }
    });

    const INITIAL_FORM_STATE = {
        id: accountData?.id || 0,
        login: accountData?.username || userData?.username,
        password: "",
    };

    const FORM_VALIDATION = new Yup.ObjectSchema({
        login: Yup.string()
            .min(5, 'Логин должен быть не менее 5 символов')
            .max(20, 'Логин должен быть не более 20 символов')
            .matches(/^[a-zA-Z0-9_]+$/, {
                message: 'Разрешены только латиница, цифры и _',
                excludeEmptyString: true
            }).required("Введите логин"),
        password: Yup.string()
            .min(5, 'Пароль должен быть не менее 5 символов')
            .max(20, 'Пароль должен быть не более 20 символов'),
    });

    const changeAccountData = useMutation(Requests.setAccountData, {
        onSuccess: (data) => {
            const res = data?.data;
            enqueueSnackbar(res?.message, { variant: 'success' });
            localStorage.setItem('token', res?.token);
            queryClient.invalidateQueries(['userdata']);
            queryClient.invalidateQueries(['accountdata']);
            queryClient.invalidateQueries(['leaderboard']);
        },
        onError: (error) => {
            console.error(error);
            enqueueSnackbar(error?.response?.data?.message, { variant: 'error' });
        }
    });

    const uploadPhoto = useMutation(Requests.setUserAvatar, {
        onSuccess: (data) => {
            enqueueSnackbar("Аватар успешно обновлен", { variant: 'success' });
            queryClient.invalidateQueries(['userdata']);
            queryClient.invalidateQueries(['leaderboard']);
            if (!JSON.parse(userData?.achievements)?.includes("art")) {
                addAchievement({name: "art", enqueueSnackbar, queryClient, timeout: 3000});
            }
        },
        onError: (error) => {
            console.error(error);
            enqueueSnackbar(error?.response?.data?.message, { variant: 'error' });
        }
    });

    const handleSubmit = (values) => {
        const { password, login } = values;
        return changeAccountData.mutate({username: accountData?.username === login ? "" : login, password});
    };

    const handleUpload = (event) => {
        const file = event.target.files[0];
        if (["image/jpeg", "image/png"].includes(file?.type)) {
            const reader = new FileReader();
            reader.onload = () => {
                const inputImage = new Image();
                inputImage.onload = () => {
                    const outputImage = document.createElement('canvas');
                    const min = Math.min(inputImage.naturalWidth, inputImage.naturalHeight);
                    outputImage.width = 180;
                    outputImage.height = 180;

                    const ctx = outputImage.getContext('2d');
                    const startX = (inputImage.naturalWidth - min) / 2;
                    const startY = (inputImage.naturalHeight - min) / 2;
                    ctx.drawImage(inputImage, startX, startY, min, min, 0, 0, 180, 180);
                    return uploadPhoto.mutate({avatar: outputImage.toDataURL()});
                };
                inputImage.src = reader.result;
            };
            reader.readAsDataURL(file);
        } else {
            enqueueSnackbar("Допустимые расширения файла: .jpeg, .png", { variant: 'error' });
        }
    };

    return (
        <Dialog
            open={open}
            onBackdropClick={handleClose}
            sx={{ 
                '& .MuiPaper-root': {
                    backgroundColor: 'transparent',
                    maxWidth: 'fit-content',
                }
            }}
        >
            <Box sx={formStyle}>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', }}>
                    <Typography fontWeight={700} fontSize='22px'>Настройки</Typography>
                    <ClearRoundedIcon
                        onClick={handleClose}
                        sx={{
                            fill: '#ffffff50',
                            width: '30px',
                            height: '30px',
                            position: 'absolute',
                            right: '25px',
                            cursor: 'pointer',
                            '&:hover': {
                                fill: '#ffffffbb',
                            }
                        }}
                    />
                </Box>
                <Box sx={{
                    gap: '35px',
                    display: 'flex',
                    flexDirection: 'row',
                    pl: '15px',
                }}>
                    <Box sx={{
                        gap: '7px',
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                    }}>
                        <Box position='relative' borderRadius='50%' width={90} height={90}>
                            <img src={convertToImage(userData?.avatar)} alt='Аватар' width={90} height={90} style={{ borderRadius: '50%' }}/>
                            <input
                                accept="image/*"
                                id="button-file"
                                hidden
                                type="file"
                                onChange={handleUpload}
                            />
                            <label htmlFor="button-file">
                                <Button
                                    variant="raised"
                                    component="span"
                                    sx={{
                                        position: 'absolute', display: 'flex',
                                        justifyContent: 'center', alignItems: 'center',
                                        transition: 'opacity linear .15s', borderRadius: '50%',
                                        width: '90px', height: '90px',
                                        cursor: 'pointer', border: '1.5px solid #fff',
                                        top: '0', opacity: '0',
                                        '&:hover': {
                                            opacity: '1', backgroundColor: 'rgba(0, 0, 0, 75%)',
                                        }
                                    }}
                                >
                                    <EditRounded/>
                                </Button>
                            </label>
                        </Box>
                        <Typography fontWeight={600} fontSize='14px' sx={{ opacity: '0.5' }}>
                            Аватар
                        </Typography>
                    </Box>
                    <Formik
                        initialValues={{...INITIAL_FORM_STATE}}
                        validationSchema={FORM_VALIDATION}
                        enableReinitialize={true}
                        onSubmit={(values, { resetForm }) => {
                            handleSubmit(values);
                            resetForm();
                        }}
                        validateOnChange={false}
                        validateOnBlur={false}
                    >
                        {({ isSubmitting, submitForm, dirty, }) => (
                            <Form>
                                <DialogContent sx={{ padding: '0' }}>
                                    <Box sx={{display: 'flex', flexDirection: 'column', gap: '15px'}}>
                                        <FormTextField label="ID" name="id" disabled={true} width='115px'/>
                                        <Box sx={{display: 'flex', flexDirection: 'row', gap: '25px'}}>
                                            <FormTextField label="Логин" name="login" isEdit={true} width='225px'/>
                                            <FormTextField label="Новый пароль" name="password" width='225px'/>
                                        </Box>
                                    </Box>
                                </DialogContent>
                                <DialogActions sx={{
                                    display: 'flex',
                                    flexDirection: 'row',
                                    gap: '25px',
                                    padding: '0',
                                    mt: '30px'
                                }}>
                                    <FilledGreyButton 
                                        label="Сохранить изменения"
                                        handleClick={submitForm}
                                        padding="10px 0"
                                        height="40px"
                                        width="50%"
                                        disabled={!dirty}
                                    />
                                    <OutlinedButton 
                                        label="Выйти из аккаунта"
                                        handleClick={() => { handleClose(); setIsAuthorized(false); localStorage.removeItem('token'); queryClient.removeQueries(); window.location.replace('/');}}
                                        fontSize="14px"
                                        fontWeight={650}
                                        padding="10px 0"
                                        height="40px"
                                        width="50%"
                                        borderWidth="1.5px"
                                        marginLeft="0 !important"
                                        isRed={true}
                                    />
                                </DialogActions>
                            </Form>
                        )}
                    </Formik>
                </Box>
            </Box>
        </Dialog>
    );
}