import React from 'react';
import { useAppSelector } from '../../services/store/store';

const HomePage = () => {
  const user = useAppSelector((state) => state.userSlice.user);
  console.log(user);
  return <h1>welcome</h1>;
};

export default HomePage;
