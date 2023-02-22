import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import * as serviceWorker from './serviceWorker';
import '../src/index.css';
import axios from 'axios';
import { BrowserRouter } from 'react-router-dom';
axios.defaults.baseURL = process.env.REACT_APP_BE_URL;
axios.defaults.headers.common.Authorization = `Bearer ${sessionStorage.getItem(
  'token'
)}`;

ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
