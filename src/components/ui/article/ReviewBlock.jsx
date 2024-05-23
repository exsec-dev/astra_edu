import React, { useState } from 'react';
import { Typography, Box, DialogContent, DialogActions } from '@mui/material';
import * as Yup from 'yup';
import { Requests } from '../../../Requests';
import { useQuery, useMutation, useQueryClient } from 'react-query';
import { FormTextFieldMultiline } from '../form/FormTextFieldMultiline';
import { FilledGreyButton } from '../form/FilledGreyButton';
import { Formik, Form } from 'formik';

export default function ReviewBlock() {
  const [canSend, setCanSend] = useState(false);
  const queryClient = useQueryClient();

  useQuery(['review'], () => Requests.getReview(), {
    refetchOnWindowFocus: false,
    onSuccess: (data) => {
      setCanSend(true);
    },
    onError: (e) => {
      console.error(e);
      setCanSend(false);
    }
  });

  const sendReview = useMutation(Requests.setReview, {
    onSuccess: () => {
      setCanSend(false);
      queryClient.invalidateQueries(['review']);
    },
    onError: (error) => {
      console.error(error);
      setCanSend(false);
    }
  });

  const handleSubmit = (values) => {
    return sendReview.mutate(values?.review || "");
  };

  return (
    <Box
      bgcolor='#2B2E3B' border='rgba(255, 255, 255, 5%) 2px solid' borderRadius='0.625rem'
      display='flex' padding='0.94rem 1.56rem' my='0.94rem' flexDirection='column'
    >
      {canSend ?
        <>
          <Typography fontSize='1rem' fontWeight={700} width='100%' color='rgba(255, 255, 255, 50%)'>
            Форма обратной связи
          </Typography>
          <Formik
            initialValues={{review: ""}}
            validationSchema={new Yup.ObjectSchema({
              review: Yup.string().min(20, 'Пожалуйста, введите более 20 символов').max(400, 'Пожалуйста, введите менее 400 символов').required("Обязательно для заполнения")
            })}
            onSubmit={handleSubmit}
            validateOnChange={false}
            validateOnBlur={false}
          >
              {({ isSubmitting, submitForm }) => (
                <Form>
                  <DialogContent sx={{ padding: 0, mt: '1rem' }}>
                    <FormTextFieldMultiline label="" name="review" />
                  </DialogContent>
                  <DialogActions sx={{display: 'flex', flexDirection: 'column', alignItems: 'flex-end', px: 0, mt: 1}}>
                    <FilledGreyButton 
                      label={"Отправить"}
                      handleClick={submitForm}
                      fontSize="0.8rem"
                      padding="0.625rem 3.125rem"
                      height="2.3rem"
                      bgcolor="#303442"
                      borderColor="#ffffff15"
                      borderWidth="2px"
                      {...{'&:hover': { bgcolor: '#3a3f50' }}}
                    />
                  </DialogActions>
                </Form>
              )}
          </Formik>
        </>
        :
        <Typography fontSize='1rem' fontWeight={700} width='100%' color='rgba(255, 255, 255, 50%)'>
          Спасибо за ваш отзыв!
        </Typography>
      }
    </Box>
  );
}
