import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import authRouter from './routes/auth.js';

ReactDOM.render(
  <React.StrictMode>
    app.use('/api/auth', authRouter);
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);