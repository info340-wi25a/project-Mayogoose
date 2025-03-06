import React from 'react';
import ReactDOM from 'react-dom/client';

// Load custom css after bootstrap so that it can override bootstrap styles 
import 'bootstrap/dist/css/bootstrap.min.css';
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