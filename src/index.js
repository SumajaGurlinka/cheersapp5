import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import './styles/global-styles.css'
import { createTheme } from '@mui/material/styles';
import store from './store';
import './styles/app.scss'
import { Provider } from 'react-redux';
import reportWebVitals from './reportWebVitals';
export const theme = createTheme({
  palette: {
      text: {
          primary: '#2E2C32'
      }
  },
  typography: {
     
      h4: {
          color: '#080808!important',
          fontWeight: 800
      }
  }
});

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <Provider store={store}>

  <App />

</Provider>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
