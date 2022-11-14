import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';
import React from 'react';
import { render } from 'react-dom';

import App from './App';

render((
  <React.StrictMode>
    <App />
  </React.StrictMode>), document.getElementById('root'));
