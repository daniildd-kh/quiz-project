import { Fab, Grid, Typography } from '@mui/material';
import { Box } from '@mui/system';
import EditIcon from '@mui/icons-material/Edit';
import { Item } from './styles.ts';

interface ProfileTabProps {
  title: string;
  value: string | null | undefined;
  handleValue?: () => void;
}

const ProfileTabItem = ({ title, value, handleValue }: ProfileTabProps) => {
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
            <Typography sx={{ opacity: 0.5, fontSize: '18px', mr: 'auto' }}>
              {value}
            </Typography>
            <Fab color="secondary" aria-label="edit" size="small">
              <EditIcon onClick={() => handleValue} />
            </Fab>
          </Box>
        </Grid>
      </Grid>
    </Item>
  );
};

export default ProfileTabItem;
