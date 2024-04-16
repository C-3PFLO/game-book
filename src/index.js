// infrastructure
import React from 'react';
import ReactDOM from 'react-dom/client';

// view components
import { Story } from './view/Story';

// setup root element
const rootElement = document.createElement('div');
document.body.appendChild(rootElement);
const reactRoot = ReactDOM.createRoot(rootElement);

// render
reactRoot.render(
    <React.StrictMode>
        <Story></Story>
    </React.StrictMode>
);
