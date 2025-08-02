import React from 'react';
import { createRoot } from 'react-dom/client';
import App from './App';

const mountPoint = document.querySelector('#root');

if (mountPoint) {
  createRoot(mountPoint).render(
    <React.StrictMode>
      <App />
    </React.StrictMode>
  );
}
