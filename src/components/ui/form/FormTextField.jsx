import React, { useState } from 'react';
import { TextField, Box, Typography, InputAdornment, IconButton } from '@mui/material';
import { VisibilityOutlined, VisibilityOffOutlined, EditRounded, ContentCopyRounded, } from '@mui/icons-material';
import { useField } from 'formik';

export const FormTextField = ({ name, label, onChange, disabled=false, isEdit=false, ...otherProps }) => {
    const [field, meta] = useField(name);
    const [showPassword, setShowPassword] = useState(false);

    const config = {
        ...field,
        fullWidth: true,
        variant: 'outlined',
        helperText: "",
        sx: {
            pointerEvents: disabled ? 'none' : 'all',
            width: '25rem',
            '& input::-ms-reveal': {
                display: 'none',
            },
            '&:hover': {
                borderWidth: "1.5px !important",
            },
            '& .MuiInputBase-root': {
                borderRadius: "0.75rem",
                backgroundColor: "var(--panel-color)",
                color: "#ffffff75",
                height: '2.5rem',
                '& .MuiInputBase-input': {
                    padding: '0.5rem 1.25rem',
                    fontSize: '0.875rem',
                    fontWeight: '400'
                }
            },
            '& .MuiOutlinedInput-root': {
                '& fieldset': {
                    border: "1.5px #ffffff15 solid",
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
            ...otherProps
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

    const icons = {
        "id": (
            <IconButton
                onClick={() => navigator.clipboard.writeText(field?.value)}
                edge="end"
                sx={{
                    color: '#EFEFF150',
                    pointerEvents: 'all',
                    marginRight: '-0.3rem !important',
                }}
            >
                <ContentCopyRounded sx={{fontSize: '1.25rem'}}/>
            </IconButton>
        ),
        "login": isEdit ? (
            <IconButton
                edge="end"
                sx={{
                    color: '#EFEFF150',
                    marginRight: '0 !important',
                    cursor: 'auto',
                    '& .MuiTouchRipple-root': {
                        display: 'none !important'
                    },
                    '&:hover': {
                        backgroundColor: 'transparent'
                    }
                }}
            >
                <EditRounded sx={{fontSize: '1.25rem'}}/>
            </IconButton>
        ) : null,
        "password": (
            <IconButton
                onMouseDown={() => setShowPassword(true)}
                onMouseUp={() => setShowPassword(false)}
                edge="end"
                sx={{
                    color: '#EFEFF150',
                    marginRight: '0 !important',
                    '& .MuiTouchRipple-root': {
                        display: 'none !important'
                    },
                    '&:hover': {
                        backgroundColor: 'transparent'
                    }
                }}
            >
                {showPassword ? <VisibilityOutlined sx={{fontSize: '1.25rem'}}/> : <VisibilityOffOutlined sx={{fontSize: '1.25rem'}}/>}
            </IconButton>
        ),
    }

    return (
        <Box>
            <Typography sx={{ color: "rgba(255, 255, 255, 50%)", fontSize: "0.875rem", fontFamily: 'inherit', fontWeight: "550", marginLeft: "0.5rem", marginBottom: "0.125rem" }}>{label}</Typography>
            <TextField
                size="small"
                {...config}
                placeholder={name === "login" ? "User123" : "Password"}
                type={["login", "id"].includes(name) || showPassword ? "text" : "password"}
                onChange={(e) => {
                    field.onChange(e);
                    onChange && onChange(e);
                }}
                InputProps={{
                    endAdornment: (
                        <InputAdornment position="end">
                            {icons[name]}
                        </InputAdornment>
                    )
                }}
            />
        </Box>
    );
};