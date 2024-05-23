import React from 'react';
import { TextField, Box, Typography } from '@mui/material';
import { useField } from 'formik';

export const FormTextFieldMultiline = ({ name, label, onChange, disabled=false }) => {
    const [field, meta] = useField(name);

    const config = {
        ...field,
        fullWidth: true,
        variant: 'outlined',
        helperText: "",
        sx: {
            pointerEvents: disabled ? 'none' : 'all',
            width: '100%',
            mt: '0.06rem',
            '&:hover': {
                borderWidth: "0.125rem !important",
            },
            '& .MuiInputBase-input': {
                fontWeight: '500 !important',
            },
            '& .MuiInputBase-root': {
                borderRadius: "0.75rem",
                backgroundColor: "transparent",
                mr: '0.06rem',
                color: "#ffffff75",
                '& .MuiInputBase-input': {
                    fontSize: '0.875rem',
                    fontWeight: '400'
                }
            },
            '& .MuiOutlinedInput-root': {
                '& fieldset': {
                    border: "0.125rem #ffffff15 solid",
                    borderRadius: "0.688rem",
                },
                '&:hover fieldset': {
                    borderColor: "#ffffff15",
                },
                '&.Mui-focused fieldset': {
                    borderColor: "#ffffff15"
                },
            },
            '& .MuiFormHelperText-root': {
                fontWeight: '400',
                marginLeft: "0.625rem"
            },
        }
    };

    if (meta && meta.touched && meta.error) {
        config.error = true;
        config.helperText = meta.error;
        config.sx['& .MuiOutlinedInput-root'] = {
            '&:hover fieldset': {
                borderColor: "#d32f2f",
            },
            '&.Mui-focused fieldset': {
                borderColor: "#d32f2f",
            },
        };
    }

    return (
        <Box>
            <Typography sx={{ color: "rgba(255, 255, 255, 50%)", fontSize: "0.875rem", fontFamily: 'inherit', fontWeight: "550" }}>{label}</Typography>
            <TextField
                size="small"
                {...config}
                multiline
                minRows={5}
                maxRows={12}
                placeholder='Ваше сообщение'
                type={"text"}
                onChange={(e) => {
                    field.onChange(e);
                    onChange && onChange(e);
                }}
            />
        </Box>
    );
};