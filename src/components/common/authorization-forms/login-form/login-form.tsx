import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import React, { useState } from "react";
import { useAppDispatch, useAppSelector } from "../../../../services/store/store";
import { Box, Grid, FormControl, Typography } from "@mui/material";
import { FormInput, FormInputLabel, AuthorizationButton } from "../styles"; 
import { redirect, useNavigate } from "react-router-dom";
import { fetchSignInWithEmailAndPassword } from "../../../../services/store/actions";

const LoginForm = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const errorMessage = useAppSelector(state => state.userSlice.error);

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleFormSubmit = async (event: React.SyntheticEvent) => {
    event.preventDefault();
    try {
      dispatch(fetchSignInWithEmailAndPassword(formData));
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <Box
      sx={{
        marginTop: "30px",
        display: "flex",
        flexDirection: "column",
        gap: "40px",
      }}
    >
      <Typography component="h1" variant="h5">
        Авторизация
      </Typography>
      <Box component="form" onSubmit={handleFormSubmit}>
        <Grid
          container
          direction="row"
          justifyContent="center"
          alignItems="center"
          spacing={3}
        >
          <Grid item xs={10}>
            <FormControl variant="standard" fullWidth>
              <FormInputLabel shrink htmlFor="email">
                Email
              </FormInputLabel>
              <FormInput
                required
                placeholder="Введите Email"
                id="email"
                name="email"
                type="email"
                value={formData.email}
                onChange={handleChange}
              />
            </FormControl>
          </Grid>
          <Grid item xs={10}>
            <FormControl variant="standard" fullWidth>
              <FormInputLabel shrink htmlFor="password">
                Пароль
              </FormInputLabel>
              <FormInput
                required
                placeholder="Введите пароль"
                id="password"
                name="password"
                type="password"
                value={formData.password}
                onChange={handleChange}
              />
            </FormControl>
          </Grid>
          {errorMessage && <Grid item xs={10}><Typography color='red'>{errorMessage}</Typography></Grid>}
          <Grid item xs={10}>
            <AuthorizationButton
              fullWidth
              type="submit"
              variant="contained"
              color="primary"
            >
              Войти
            </AuthorizationButton>
          </Grid>
          <Grid item xs={10} sx={{ alignSelf: 'flex-start' }}>
            <Typography>Забыли пароль?</Typography>
          </Grid>
        </Grid>
      </Box>
    </Box>
  );
};

export default LoginForm;
