import { Box, Grid, Typography } from '@mui/material';
import { styled } from '@mui/system';
import React from 'react';
import HomeSearchingImage from '../../../assets/images/home-searching.png';
import BlobFirstIcon from '../../../assets/svg/blob-first';
import BlobElement from './blob-element';
import BlobSecondIcon from '../../../assets/svg/blob-second';
import BlobThirdIcon from '../../../assets/svg/blob-third';
import BlobFourthIcon from '../../../assets/svg/blob-fourth';
import Footer from '../footer/footer';

const HomeBigTitle = styled(Typography)({
  fontSize: '90px',
  fontWeight: '700',
  lineHeight: '1.2',
  letterSpacing: '4px',
});

const HomeMediumTitle = styled(Typography)({
  fontSize: '64px',
  fontWeight: '700',
  lineHeight: '1.2',
  letterSpacing: '4px',
});

const Rectangle = styled(Box)({
  backgroundColor: '#56ACF6',
  width: '100%',
  height: '10px',
  position: 'absolute',
  zIndex: 0,
  top: '35%',
  left: '0',
});

const Home = () => {
  return (
    <>
      <Grid container mb='200px'>
        <Grid
          item
          xs={12}
          container
          sx={{ padding: '180px 150px 0px 180px', position: 'relative' }}
          bgcolor="rgb(254, 243, 195)"
          width="100%"
        >
          <Grid item xs={6} display="flex" flexDirection="column">
            <Typography fontSize="30px" fontWeight="300" letterSpacing="2.5px">
              Запомните что угодно с помощью формата флеш карточек
            </Typography>
            <HomeBigTitle>Легко освоить</HomeBigTitle>
          </Grid>
          <Grid item xs={6} zIndex={1}>
            <Box
              component="img"
              src={HomeSearchingImage}
              alt="Картинка поиска"
              sx={{
                width: 650,
                height: 600,
              }}
            />
          </Grid>
          <Box
            sx={{
              width: '100%',
              height: '80px',
              bgcolor: 'rgb(65, 140, 143)',
              position: 'absolute',
              bottom: 0,
              zIndex: 0,
              left: 0,
            }}
          />
        </Grid>
        <Grid
          item
          xs={12}
          container
          sx={{ padding: '180px 150px 0px 180px', position: 'relative' }}
          bgcolor="rgb(255, 255, 255)"
          width="100%"
        >
          <Grid item xs={12}>
            <HomeMediumTitle>Быстро и просто</HomeMediumTitle>
          </Grid>
          <Grid item xs={12} mt="100px">
            <Box display="flex" position="relative" overflow="auto">
              <Box display="flex" justifyContent='space-between' width='100%'>
                <BlobElement SvgElement={BlobFirstIcon} title="1" subTitle={'Создайте модуль'}/>
                <BlobElement SvgElement={BlobSecondIcon} title="2" subTitle={'Добавьте карточки'}/>
                <BlobElement SvgElement={BlobThirdIcon} title="3" subTitle={'Практикуетесь каждый день'}/>
                <BlobElement SvgElement={BlobFourthIcon} title="4" subTitle={'Вы чудо!'}/>
              </Box>
              <Rectangle />
            </Box>
          </Grid>
        </Grid>
      </Grid>
      <Footer/>
    </>
  );
};

export default Home;
