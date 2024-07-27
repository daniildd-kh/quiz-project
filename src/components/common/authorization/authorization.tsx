import { useState } from 'react';
import { Box, CardActions } from '@mui/material';
import { motion, AnimatePresence } from 'framer-motion';
import LoginForm from '../authorization-forms/login-form/login-form';
import RegisterForm from '../authorization-forms/register-form/register-form';
import {
  CardAuthorization,
  CardButton,
  CardContentStyled,
  CardIntroduction,
  CardText,
  CardTitle,
} from './styles';

const MotionCardAuthorization = motion(CardAuthorization);

const fadeVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1 },
};

const Authorization = () => {
  const [authorizationState, setAuthorizationState] = useState(false);

  return (
    <Box
      display="flex"
      alignItems="center"
      height="100vh"
      justifyContent="center"
    >
      <AnimatePresence mode="wait">
        <MotionCardAuthorization
          key={authorizationState ? 'register' : 'login'}
          initial="hidden"
          animate="visible"
          exit="hidden"
          variants={fadeVariants}
          transition={{ duration: 0.3 }}
        >
          <CardContentStyled>
            {authorizationState ? <RegisterForm /> : <LoginForm />}
          </CardContentStyled>
          <CardIntroduction>
            {authorizationState ? (
              <>
                <CardTitle variant="h5">Регистрация пользователя</CardTitle>
                <CardText>Уже есть аккаунт? Вы можете войти</CardText>
                <CardActions>
                  <CardButton
                    onClick={() => {
                      setAuthorizationState(false);
                    }}
                  >
                    Войти
                  </CardButton>
                </CardActions>
              </>
            ) : (
              <>
                <CardTitle variant="h5">Авторизация пользователя</CardTitle>
                <CardText>Нет аккаунта? Вы можете зарегистрироваться</CardText>
                <CardActions>
                  <CardButton
                    onClick={() => {
                      setAuthorizationState(true);
                    }}
                  >
                    Зарегистрироваться
                  </CardButton>
                </CardActions>
              </>
            )}
          </CardIntroduction>
        </MotionCardAuthorization>
      </AnimatePresence>
    </Box>
  );
};

export default Authorization;
