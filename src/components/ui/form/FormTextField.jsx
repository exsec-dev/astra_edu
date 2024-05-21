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
            width: '400px',
            '& input::-ms-reveal': {
                display: 'none',
            },
            '&:hover': {
                borderWidth: "1.5px !important",
            },
            '& .MuiInputBase-root': {
                borderRadius: "12px",
                backgroundColor: "var(--panel-color)",
                color: "#ffffff75",
                height: '40px',
                '& .MuiInputBase-input': {
                    padding: '8.5px 20px',
                    fontSize: '14px',
                    fontWeight: '400'
                }
            },
            '& .MuiOutlinedInput-root': {
                '& fieldset': {
                    border: "1.5px #ffffff15 solid",
                    borderRadius: "11px",
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
                marginLeft: "10px"
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
                    marginRight: '-5px !important',
                }}
            >
                <ContentCopyRounded sx={{fontSize: '20px'}}/>
            </IconButton>
        ),
        "login": isEdit ? (
            <IconButton
                edge="end"
                sx={{
                    color: '#EFEFF150',
                    marginRight: '0px !important',
                    cursor: 'auto',
                    '& .MuiTouchRipple-root': {
                        display: 'none !important'
                    },
                    '&:hover': {
                        backgroundColor: 'transparent'
                    }
                }}
            >
                <EditRounded sx={{fontSize: '20px'}}/>
            </IconButton>
        ) : null,
        "password": (
            <IconButton
                onMouseDown={() => setShowPassword(true)}
                onMouseUp={() => setShowPassword(false)}
                edge="end"
                sx={{
                    color: '#EFEFF150',
                    marginRight: '0px !important',
                    '& .MuiTouchRipple-root': {
                        display: 'none !important'
                    },
                    '&:hover': {
                        backgroundColor: 'transparent'
                    }
                }}
            >
                {showPassword ? <VisibilityOutlined sx={{fontSize: '20px'}}/> : <VisibilityOffOutlined sx={{fontSize: '20px'}}/>}
            </IconButton>
        ),
    }

    return (
        <Box>
            <Typography sx={{ color: "rgba(255, 255, 255, 50%)", fontSize: "14px", fontFamily: 'inherit', fontWeight: "550", marginLeft: "8px", marginBottom: "2px" }}>{label}</Typography>
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