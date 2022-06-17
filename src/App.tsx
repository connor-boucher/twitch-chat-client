import { Routes, Route } from 'solid-app-router';
import { Component, lazy } from 'solid-js';

const Home = lazy(() => import('@pages/Home'));
const Chat = lazy(() => import('@pages/Chat'));

const App: Component = () => {
    return (<>
        <Routes>
            <Route path="/" element={<Home />} />
            <Route path="*" element={<Chat />} />
        </Routes>
    </>);
};

export { App };
