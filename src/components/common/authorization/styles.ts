import { Button, Card, CardContent, Typography } from '@mui/material';
import { styled } from '@mui/system';

export const CardTitle = styled(Typography)({
  fontWeight: 700,
  letterSpacing: '0em',
  color: '#FFF',
});

export const CardText = styled(Typography)({
  color: '#fff',
  fontSize: '14px',
  paddingLeft: '100px',
  paddingRight: '100px',
});

export const CardButton = styled(Button)({
  color: '#fff',
  fontWeight: 400,
  borderRadius: '10px',
  border: ['1px', 'solid'],
  textTransform: 'none',
});

export const CardAuthorization = styled(Card)({
  height: '500px',
  width: 'max(80%, 900px)',
  display: 'flex',
  flexDirection: 'row',
  borderRadius: '10px',
  backgroundColor: '#fff',
  boxShadow: '0px 0px 3px #000',
});

export const CardContentStyled = styled(CardContent)({
  padding: '10px',
  width: '50%',
  display: 'flex',
  flexDirection: 'column',
});

export const CardIntroduction = styled(Card)({
  width: '50%',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  textAlign: 'center',
  gap: '20px',
  background:
    'rgb(5,0,36) linear-gradient(90deg, rgba(5,0,36,1) 0%, rgba(9,9,121,1) 0%, rgba(0,212,255,1) 100%)',
});
