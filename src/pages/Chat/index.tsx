import { useLocation } from 'solid-app-router';
import { Component, For } from 'solid-js';
import { compact } from 'lodash';
import { ChatOutput } from '../../components/ChatOutput';
import { Client } from 'tmi.js';

const getChannels = (path: string) => compact(path.split('/'));

const Chat: Component = () => {
    const location = useLocation();
    const channels = getChannels(location.pathname);

    const client = new Client({
        channels,
    });
    client.connect();

    return <div class='chat-frame'>
        <For each={channels}>
            {(channel) => <ChatOutput channel={channel} client={client} />}
        </For>
    </div>;
};

export default Chat;