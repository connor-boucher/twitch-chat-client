/* @refresh reload */
import { render } from 'solid-js/web';

import { Router } from 'solid-app-router';
import { App } from './App';

const code = () => (
    <Router>
        <App />
    </Router>
);

const target = document.getElementById('root') as HTMLElement;

render(code, target);