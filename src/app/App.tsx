import Header from '../components/common/header/header';
import { Container } from '@mui/system';
import { useEffect } from 'react';
import { Outlet } from 'react-router-dom';
import { useAppDispatch } from '../services/store/store';
import { fetchGetDecks } from '../services/store/actions';

function App() {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(fetchGetDecks());
  }, [dispatch]);

  return (
    <>
      <Header />
      <Container maxWidth="lg">
        <Outlet />
      </Container>
    </>
  );
}

export default App;
