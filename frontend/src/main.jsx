import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import 'flowbite';
import { BrowserRouter } from 'react-router-dom';
// import { AppContextProvider } from './redux/Authprovider.jsx';
import store from "./redux/store";
import {Provider} from 'react-redux'
createRoot(document.getElementById('root')).render(
  // <BrowserRouter>
  // <AppContextProvider>
  //   <App />

  // </AppContextProvider>
  // </BrowserRouter>,

  <BrowserRouter>
  <Provider store={store}>
    <App />

  </Provider>
  </BrowserRouter>,
)
