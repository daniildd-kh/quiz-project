import { Box, Grid, Switch, Typography } from '@mui/material';
import React, { useState } from 'react';
import { Item } from './styles';

interface ProfileTabSettingsProps {
  title: string;
  value: string | null | undefined;
  handleValue?: () => void;
  optionalComponent?: React.ReactNode;
  // checkedIcon?: React.ReactNode;
  // uncheckedIcon?: React.ReactNode;
  switchColor?: 'default' | 'primary' | 'secondary';
}

const ProfileTabItemSettings = ({
  title,
  value,
  handleValue,
  optionalComponent,
  // checkedIcon = <CircleIcon />,
  // uncheckedIcon = <CircleIcon />,
  switchColor = 'secondary',
}: ProfileTabSettingsProps) => {
  const [checked, setChecked] = useState(false);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setChecked(event.target.checked);
    if (handleValue) {
      handleValue();
    }
  };

  const label = { inputProps: { 'aria-label': 'Переключатель' } };

  return (
    <Item>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <Typography component="h4" fontSize="16px">
            {title}
          </Typography>
        </Grid>
        <Grid item xs={12}>
          <Box display="flex" flexDirection="row" alignItems="center">
            <Typography sx={{ fontSize: '18px', mr: 'auto' }}>
              {value}
            </Typography>
            <Switch
              {...label}
              checked={checked}
              onChange={handleChange}
              color={switchColor}
            />
          </Box>
        </Grid>
        {checked && optionalComponent && (
          <Grid item xs={12}>
            {optionalComponent}
          </Grid>
        )}
      </Grid>
    </Item>
  );
};

export default ProfileTabItemSettings;
