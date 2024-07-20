import { styled } from "@mui/system";
import { Input, InputLabel, Button } from "@mui/material";

export const FormInput = styled(Input)({
  border: "1px solid",
  padding: "5px",
  borderRadius: "15px",
  "&::before": {
    borderBottom: "none",
    content: '""',
  },
  "&::after": {
    borderBottom: "none",
    content: '""',
  },
  "&:hover:not(.Mui-disabled):before": {
    borderBottom: "none",
  },
  "&:hover:not(.Mui-disabled):after": {
    borderBottom: "none",
  },
  "&:focus:not(.Mui-disabled):before": {
    borderBottom: "none",
  },
  "&:focus:not(.Mui-disabled):after": {
    borderBottom: "none",
  },
});

export const FormInputLabel = styled(InputLabel)({
  textTransform: "uppercase",
  fontWeight: "700",
});

export const AuthorizationButton = styled(Button)({
  color: "#fff",
  marginTop: "0px",
  fontWeight: 400,
  borderRadius: "20px",
  textTransform: "none",
  padding: "10px",
  background:
    "rgb(5,0,36) linear-gradient(90deg, rgba(5,0,36,1) 0%, rgba(9,9,121,1) 0%, rgba(0,212,255,1) 100%)",
});
