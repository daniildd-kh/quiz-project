import {
  Avatar,
  Badge,
  Box,
  Button,
  Divider,
  Grid,
  Stack,
  styled,
  Tab,
  Typography,
} from '@mui/material';
import React, { useState } from 'react';
import catImage from '../../../assets/images/cat.png';
import { getAuth } from 'firebase/auth';
import dayjs from 'dayjs';
import SendIcon from '@mui/icons-material/Send';
import FileUploadIcon from '@mui/icons-material/FileUpload';
import MailIcon from '@mui/icons-material/Mail';
import TabPanel from '@mui/lab/TabPanel';
import { TabContext, TabList } from '@mui/lab';
import ProfileTabItem from './profile-tab-item';
import PersonIcon from '@mui/icons-material/Person';
import SettingsIcon from '@mui/icons-material/Settings';
import ProfileTabItemSettings from './profile-tab-item-settings';
import TimePicker from '../time-picker/time-picker';

// const VisuallyHiddenInput = styled("input")({
//   clip: "rect(0 0 0 0)",
//   clipPath: "inset(50%)",
//   height: 1,
//   overflow: "hidden",
//   position: "absolute",
//   bottom: 0,
//   left: 0,
//   whiteSpace: "nowrap",
//   width: 1,
// });

const StyledTab = styled(Tab)({
  fontSize: '14px',
  textTransform: 'none',
});

const Profile = () => {
  const auth = getAuth();
  const user = auth.currentUser;
  const [currentTab, setCurrentTab] = useState('profile');

  const handleTabsChange = (event: React.SyntheticEvent, newValue: string) => {
    setCurrentTab(newValue);
  };

  let currentUser = null;
  if (user !== null) {
    currentUser = user;
  }
  return (
    <>
      {/* <Typography variant='h4' component='h1'>Профиль</Typography> */}
      <Grid container spacing={6}>
        <Grid item xs={4}>
          <Box>
            <Grid item xs={12} sx={{ mb: '40px' }}>
              <Avatar
                alt="Аватар в профиле"
                src={catImage}
                sx={{ width: 256, height: 256 }}
              />
            </Grid>
            <Grid item xs={12}>
              <Typography fontSize={'16px'} component="h3">
                Дата создания профиля:
              </Typography>
              <Divider />
              <Typography fontSize={'16px'} sx={{ opacity: 0.5 }}>
                {currentUser?.metadata.creationTime
                  ? dayjs(currentUser?.metadata.creationTime).format(
                      'DD.MM.YYYY',
                    )
                  : 'Неизвестно'}
              </Typography>
              <Typography fontSize={'16px'} component="h3" sx={{ mt: '20px' }}>
                Дата последего входа:
              </Typography>
              <Divider />
              <Typography fontSize={'16px'} sx={{ opacity: 0.5 }}>
                {currentUser?.metadata.creationTime
                  ? dayjs(currentUser?.metadata.lastSignInTime).format(
                      'DD.MM.YYYY',
                    ) +
                    ' в ' +
                    dayjs(currentUser?.metadata.lastSignInTime).format('HH:mm')
                  : 'Неизвестно'}
              </Typography>
            </Grid>
          </Box>
        </Grid>
        <Grid item container xs={8}>
          <Box width="100%" display="flex" flexDirection="column" gap="40px">
            <Box
              display="flex"
              flexDirection="row"
              gap="40px"
              alignItems="center"
            >
              <Typography variant="h5" component="h3" sx={{ opacity: 0.6 }}>
                Ваш профиль
              </Typography>
              <Badge badgeContent={4} color="primary">
                <MailIcon color="action" />
              </Badge>
            </Box>
            <Box>
              <Stack direction="row" spacing={3}>
                <Button variant="text" startIcon={<SendIcon />}>
                  К списку модулей
                </Button>
                <Button
                  component="label"
                  role={undefined}
                  variant="text"
                  tabIndex={-1}
                  startIcon={<FileUploadIcon />}
                >
                  Изменить аватар
                  {/* <VisuallyHiddenInput type="file" /> */}
                </Button>
              </Stack>
            </Box>
            <Box>
              <TabContext value={currentTab}>
                <Box sx={{ width: '100%' }}>
                  <TabList
                    onChange={handleTabsChange}
                    textColor="secondary"
                    indicatorColor="secondary"
                    aria-label="Меню профиля и настроек"
                  >
                    <StyledTab
                      value="profile"
                      label="Профиль"
                      icon={<PersonIcon />}
                      iconPosition="start"
                    />
                    <StyledTab
                      value="settings"
                      label="Настройки"
                      icon={<SettingsIcon />}
                      iconPosition="start"
                    />
                  </TabList>

                  <TabPanel value="profile">
                    <Stack spacing={2}>
                      <ProfileTabItem
                        title="Имя пользователя"
                        value={currentUser?.displayName}
                      />
                      <ProfileTabItem
                        title="Номер телефона"
                        value={
                          currentUser?.phoneNumber
                            ? currentUser.phoneNumber
                            : '+ 7 (000) 000-00-00'
                        }
                      />
                      <ProfileTabItem
                        title="Электронная почта"
                        value={currentUser?.email}
                      />
                      <ProfileTabItem
                        title="Пароль"
                        value={'••••••••••••••••••••••••'}
                      />
                    </Stack>
                  </TabPanel>
                  <TabPanel value="settings">
                    <Stack spacing={2}>
                      <ProfileTabItemSettings title="Оформление" value="Тема" />
                      <ProfileTabItemSettings
                        title="Уведомления"
                        value="Напоминания о повторении"
                        optionalComponent={<TimePicker />}
                      />
                      <ProfileTabItemSettings
                        title="Уведомления"
                        value="Новости и рекомендации"
                      />
                    </Stack>
                    <Box display="flex" justifyContent="flex-end">
                      <Button
                        variant="contained"
                        color="error"
                        sx={{ mt: '20px' }}
                      >
                        Удалить профиль
                      </Button>
                    </Box>
                  </TabPanel>
                </Box>
              </TabContext>
            </Box>
          </Box>
        </Grid>
      </Grid>
    </>
  );
};

export default Profile;
