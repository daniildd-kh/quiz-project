import {
  AppBar,
  Badge,
  Box,
  Dialog,
  DialogContent,
  DialogTitle,
  IconButton,
  InputAdornment,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  Menu,
  MenuItem,
  TextField,
  Toolbar,
  Typography,
} from "@mui/material";
import React, { useState } from "react";
import LogoDevIcon from "@mui/icons-material/LogoDev";
import NotificationsIcon from "@mui/icons-material/Notifications";
import AddIcon from "@mui/icons-material/Add";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import { appHeaderMenuSx, appHeaderMenuTextSx } from "./sx-styles";
import SearchIcon from "@mui/icons-material/Search";
import { NavLink } from "react-router-dom";
import { useAppSelector } from "../../../services/store/store";

interface HeaderUIProps {
  onMenuClick: (
    event: React.MouseEvent<HTMLButtonElement>,
    type: string
  ) => void;
  onNotificationsClick: () => void;
  onMenuClose: () => void;
  menuType: null | string;
  anchorMenuEl: null | HTMLElement;
  notificationsOpen: boolean;
}

const HeaderUI: React.FC<HeaderUIProps> = ({
  onMenuClick,
  onNotificationsClick,
  onMenuClose,
  menuType,
  anchorMenuEl,
  notificationsOpen,
}) => {
  const userName = useAppSelector((state) => state.userSlice.user?.name);
  return (
    <AppBar position="static" sx={{ mb: "30px" }}>
      <Toolbar
        sx={{
          display: "flex",
          justifyContent: "space-between",
          color: "#F2F5FA",
        }}
      >
        <Box sx={appHeaderMenuSx}>
          <LogoDevIcon fontSize="large" />
          <NavLink to="/">
            <Typography noWrap sx={appHeaderMenuTextSx}>
              Главная
            </Typography>
          </NavLink>
          <NavLink to="your-decks">
            <Typography noWrap sx={appHeaderMenuTextSx}>
              Ваша библиотека
            </Typography>
          </NavLink>
        </Box>
        <TextField
          sx={{ width: "30%" }}
          color="secondary"
          id="search"
          label="Поиск по карточкам"
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <SearchIcon sx={{ color: "#F2F5FA" }} />
              </InputAdornment>
            ),
          }}
          size="small"
          variant="standard"
          focused
        />
        <Box sx={appHeaderMenuSx}>
          <IconButton color="inherit" onClick={(e) => onMenuClick(e, "add")}>
            <AddIcon />
          </IconButton>
          <Menu
            open={menuType === "add"}
            anchorEl={anchorMenuEl}
            onClose={onMenuClose}
            id="add-menu"
          >
            <MenuItem onClick={() => {}}>Учебный модуль</MenuItem>
            <MenuItem onClick={() => {}}>Папка</MenuItem>
            <MenuItem onClick={() => {}}>Курс</MenuItem>
          </Menu>

          <IconButton color="inherit" onClick={onNotificationsClick}>
            <Badge badgeContent={1} color="error">
              <NotificationsIcon />
            </Badge>
          </IconButton>
          <Dialog open={notificationsOpen} onClose={onMenuClose}>
            <DialogTitle>Ваши уведомления</DialogTitle>
            <DialogContent>
              <List>
                <ListItem>
                  <ListItemText>Уведомление</ListItemText>
                  <ListItemButton onClick={() => {}} />
                </ListItem>
              </List>
            </DialogContent>
          </Dialog>
          <IconButton
            color="inherit"
            onClick={(e) => onMenuClick(e, "profile")}
          >
            <AccountCircleIcon />
          </IconButton>
          <Menu
            open={menuType === "profile"}
            anchorEl={anchorMenuEl}
            onClose={onMenuClose}
            id="profile-menu"
          >
            {userName && (
                <Typography sx={{display: 'flex', alignItems: "center", gap: '5px'}}><AccountCircleIcon />{userName}</Typography>
            )}
            <NavLink to="/login">
              <MenuItem>Профиль</MenuItem>
            </NavLink>
            <MenuItem onClick={() => {}}>Настройки</MenuItem>
            <MenuItem onClick={() => {}}>Выйти</MenuItem>
          </Menu>
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default HeaderUI;
