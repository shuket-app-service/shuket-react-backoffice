import React from 'react';
import { Form, Formik } from 'formik';
import * as yup from 'yup';
import { Link, useNavigate } from 'react-router-dom';
import { useIntl } from 'react-intl';
import IntlMessages from '@crema/helpers/IntlMessages';
import Box from '@mui/material/Box';
import AppTextField from '@crema/components/AppFormComponents/AppTextField';
import Checkbox from '@mui/material/Checkbox';
import Button from '@mui/material/Button';
import AppInfoView from '@crema/components/AppInfoView';
import { Fonts } from '@crema/constants/AppEnums';
import { useDispatch } from 'react-redux';
import { Login } from '../../store/auth/thunk';
import AuthWrapper from '../../auth/AuthWrapper';

const validationSchema = yup.object({
  email: yup
    .string()
    // .email(<IntlMessages id='validation.emailFormat' />)
    .required(<IntlMessages id='validation.emailRequired' />),
  password: yup
    .string()
    .required(<IntlMessages id='validation.passwordRequired' />),
});

const SigninShuket = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch()

  const onGoToForgetPassword = () => {
    navigate('/forget-password', { tab: 'firebase' });
  };
  const logInWithEmailAndPasswordThunk = (data) =>{
    dispatch(Login(data))
  }

  const { messages } = useIntl();

  return (
    <AuthWrapper>
      <Box sx={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
        <Box sx={{ flex: 1, display: 'flex', flexDirection: 'column', mb: 5 }}>
          <Formik
            validateOnChange={true}
            initialValues={{
              email: 'duyhuu.dev',
              password: 'IT1234!@#$',
            }}
            validationSchema={validationSchema}
            onSubmit={(data, { setSubmitting }) => {
              setSubmitting(true);
              logInWithEmailAndPasswordThunk(data);
              setSubmitting(false);
            }}
          >
            {({ isSubmitting }) => (
              <Form style={{ textAlign: 'left' }} noValidate autoComplete='off'>
                <Box sx={{ mb: { xs: 5, xl: 8 } }}>
                  <AppTextField
                    placeholder={messages['common.email']}
                    name='email'
                    label={<IntlMessages id='common.email' />}
                    variant='outlined'
                    sx={{
                      width: '100%',
                      '& .MuiInputBase-input': {
                        fontSize: 14,
                      },
                    }}
                  />
                </Box>

                <Box sx={{ mb: { xs: 3, xl: 4 } }}>
                  <AppTextField
                    type='password'
                    placeholder={messages['common.password']}
                    label={<IntlMessages id='common.password' />}
                    name='password'
                    variant='outlined'
                    sx={{
                      width: '100%',
                      '& .MuiInputBase-input': {
                        fontSize: 14,
                      },
                    }}
                  />
                </Box>

                <Box
                  sx={{
                    mb: { xs: 3, xl: 4 },
                  }}
                >
                  <Box
                    sx={{
                      display: 'flex',
                      alignItems: 'center',
                    }}
                  >
                    <Checkbox sx={{ ml: -3 }} id='rememberMe' />
                    <Box
                      aria-labelledby='rememberMe'
                      component='span'
                      sx={{
                        color: 'grey.700',
                      }}
                    >
                      <IntlMessages id='common.rememberMe' />
                    </Box>
                  </Box>
                  <Box
                    component='span'
                    sx={{
                      color: (theme) => theme.palette.primary.main,
                      fontWeight: Fonts.SEMI_BOLD,
                      cursor: 'pointer',
                      display: 'block',
                      textAlign: 'right',
                    }}
                    onClick={onGoToForgetPassword}
                  >
                    <IntlMessages id='common.forgetPassword' />
                  </Box>
                </Box>

                <div>
                  <Button
                    variant='contained'
                    color='primary'
                    type='submit'
                    disabled={isSubmitting}
                    sx={{
                      minWidth: 160,
                      fontWeight: Fonts.REGULAR,
                      fontSize: 16,
                      textTransform: 'capitalize',
                      padding: '4px 16px 8px',
                    }}
                  >
                    <IntlMessages id='common.login' />
                  </Button>
                </div>
              </Form>
            )}
          </Formik>
        </Box>

        <Box
          sx={{
            color: 'grey.700',
            mb: { xs: 5, md: 7 },
          }}
        >
          <span style={{ marginRight: 4 }}>
            <IntlMessages id='common.dontHaveAccount' />
          </span>
          <Box
            component='span'
            sx={{
              fontWeight: Fonts.SEMI_BOLD,
              '& a': {
                color: (theme) => theme.palette.primary.main,
                textDecoration: 'none',
              },
            }}
          >
            <Link to='/signup'>
              <IntlMessages id='common.signup' />
            </Link>
          </Box>
        </Box>

        <AppInfoView />
      </Box>
    </AuthWrapper>
  );
};

export default SigninShuket;
