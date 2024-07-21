import {
  Box,
  Button,
  FormControl,
  Grid,
  TextField,
  Typography,
} from "@mui/material";
import React, { useState } from "react";
import {
  getAuth,
  createUserWithEmailAndPassword,
  updateProfile,
} from "firebase/auth";
import { useAppDispatch } from "../../../../services/store/store";
import { AuthorizationButton, FormInput, FormInputLabel } from "../styles";
import { useNavigate } from "react-router-dom";
import { fetchCreateUserWithEmailAndPassword } from "../../../../services/store/actions";

const RegisterForm = () => {
  const dispatch = useAppDispatch();
  const [formData, setFormData] = useState({
    id: "",
    name: "",
    email: "",
    password: "",
    number: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleRepeatedPassword = (repeatedPassword: string) => {
    if (repeatedPassword !== formData.password) {
      return;
    }
  };

  const handleFormSubmit = async (event: React.SyntheticEvent) => {
    event.preventDefault();

    dispatch(fetchCreateUserWithEmailAndPassword(formData));
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
        Регистрация
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
              <FormInputLabel shrink htmlFor="name">
                Имя
              </FormInputLabel>
              <FormInput
                required
                placeholder="Введите имя"
                id="name"
                name="name"
                type="name"
                value={formData.name}
                onChange={handleChange}
              />
            </FormControl>
          </Grid>
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
          <Grid item xs={10}>
            <AuthorizationButton
              fullWidth
              type="submit"
              variant="contained"
              color="primary"
            >
              Зарегистрироваться
            </AuthorizationButton>
          </Grid>
        </Grid>
      </Box>
    </Box>
  );
};

export default RegisterForm;
