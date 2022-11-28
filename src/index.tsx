import React from 'react';
import { createRoot } from 'react-dom/client';
import { Provider } from 'react-redux';
import { store } from 'state';
import { Web3ContextProvider } from 'contexts/Web3Context'
import App from './App';
import reportWebVitals from './reportWebVitals';
import './assets/font/IceSticks-12ge.ttf';
import './index.css';

const container = document.getElementById('root')!;
const root = createRoot(container);
// opacity: 0.6;
// position: absolute;
// left: 0;
// top: 0;
// width: 100%;
// height: auto;
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <Web3ContextProvider>
        <div>
        <img style={{opacity: 0.35,position:'absolute',width:'100%',height:'auto',zIndex:'-1',left:0,top:0,objectFit:'cover'}} src='images/background1.jpg' alt='' />
        <App />
        </div>
      </Web3ContextProvider>
    </Provider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
