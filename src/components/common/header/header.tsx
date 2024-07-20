import React, { useState } from 'react';
import HeaderUI from '../../ui/header/header';

const Header = () => {

const [anchorMenuEl, setAnchorMenuEl] =
  React.useState<null | HTMLElement>(null);

const [menuType, setMenuType] = React.useState<null | string>(null);
const handleMenuClick = (event: React.MouseEvent<HTMLButtonElement>, type: string) => {
  setAnchorMenuEl(event.currentTarget);
  setMenuType(type)
};

const [notificationsOpen, setNotificationsOpen] = useState(false);

const handleNotificationsClick = () =>{
  setNotificationsOpen(true);
}

const handleMenuClose = () => {
  setAnchorMenuEl(null);
  setMenuType(null);
  setNotificationsOpen(false);
};


return (
  <HeaderUI
    anchorMenuEl={anchorMenuEl}
    menuType={menuType}
    notificationsOpen={notificationsOpen}
    onMenuClick={handleMenuClick}
    onNotificationsClick={handleNotificationsClick}
    onMenuClose={handleMenuClose}
  />
);
};

export default Header;