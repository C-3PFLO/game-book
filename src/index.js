import React from 'react';
import ReactDOM from 'react-dom/client';

const rootElement = document.createElement('div');
document.body.appendChild(rootElement);

const reactRoot = ReactDOM.createRoot(rootElement);
reactRoot.render(
    <React.StrictMode>
        Hello world!
    </React.StrictMode>
);
