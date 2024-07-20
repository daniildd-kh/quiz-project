import ReactDOM from 'react-dom/client'
import App from './app/App.tsx';
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';
import './assets/styles/index.css'
import 'normalize.css';
import { ThemeProvider } from '@emotion/react';
import theme from './assets/styles/theme.ts';
import { RouterProvider, createBrowserRouter, defer } from 'react-router-dom';
import { Provider } from 'react-redux';
import store from './services/store/store.ts';
import {routes} from './routes.tsx'
import './firebase.ts'
ReactDOM.createRoot(document.getElementById('root')!).render(
  <Provider store={store}>
    <ThemeProvider theme={theme}>
      <RouterProvider router={routes} />
    </ThemeProvider>
  </Provider>
)
