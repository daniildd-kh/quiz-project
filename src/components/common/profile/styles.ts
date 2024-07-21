import { Paper } from "@mui/material";
import { styled } from "@mui/system";

export const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: "#fff",
  padding: theme.spacing(1),
  color: theme.palette.text.secondary,
}));
