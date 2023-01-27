import React from 'react';
import ReactDOM from 'react-dom/client';
import { HeadProvider } from 'react-head';

import App from './App';
import './index.scss';

const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
  <HeadProvider>
    <App />
  </HeadProvider>
);
