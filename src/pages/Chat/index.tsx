import { useLocation } from 'solid-app-router';
import { Component } from 'solid-js';
import { compact } from 'lodash';

const getChannels = (path: string) => compact(path.split('/'));

const Chat: Component = () => {
    const location = useLocation();
    const channels = getChannels(location.pathname);
    console.log(channels);

    return <>
        <h1>Channels: {channels.join(', ')}</h1>
    </>;
};

export default Chat;