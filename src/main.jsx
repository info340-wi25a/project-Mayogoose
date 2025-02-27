import React from 'react';
import ReactDOM from 'react-dom/client';

import './index.css';

import { BrowserRouter } from 'react-router'
import App from './components/pages/App.jsx'

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    // tell the app & its children what current urls are
    <BrowserRouter>
        <App />
    </BrowserRouter>
);