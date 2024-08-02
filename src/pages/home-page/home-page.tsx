import React from 'react';
import { useAppSelector } from '../../services/store/store';
import Home from '../../components/common/home/home';
import Header from '../../components/common/header/header';

const HomePage = () => {
  const user = useAppSelector((state) => state.userSlice.user);
  console.log(user);
  return (
    <>
      <Header />
      <Home />
    </>
  );
};

export default HomePage;
