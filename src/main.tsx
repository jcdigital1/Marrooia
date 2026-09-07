import {StrictMode} from 'react';
import {createRoot} from 'react-dom/client';
import App from './App.tsx';
import './index.css';

// Immediate browser image preload to eliminate any avatar loading delay
const imgPreload = new Image();
imgPreload.src = '/logo.webp';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
);
