import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
// import * as Sentry from '@sentry/react';
// import { BrowserTracing } from '@sentry/tracing';
import App from './App';
import reportWebVitals from './reportWebVitals';
import './i18n';

const root = ReactDOM.createRoot(document.getElementById('root'));

// Sentry.init({
//   dsn: 'https://examplePublicKey@o0.ingest.sentry.io/0',
//   integrations: [new BrowserTracing()],

//   // We recommend adjusting this value in production, or using tracesSampler
//   // for finer control
//   tracesSampleRate: 1.0,
// });

// if (process.env.NODE_ENV === 'development') {
//   // eslint-disable-next-line global-require
//   const { worker } = require('./mocks/browser');
//   worker.start();
// }

/** Run all ENV */
const { worker } = require('./mocks/browser');

worker.start();

root.render(<App />);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
