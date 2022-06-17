import { useLocation } from 'solid-app-router';
import { Component, createSignal, For } from 'solid-js';
import { compact } from 'lodash';
import { Client } from 'tmi.js';

import { ChatOutput } from '@components/ChatOutput';

import type { Message } from 'types';

const getChannels = (path: string) => compact(path.split('/'));

const Chat: Component = () => {
    const location = useLocation();
    const channels = getChannels(location.pathname);
    const [messages, setMessages] = createSignal([] as Message[]);
    
    const client = new Client({
        channels,
    });
    client.connect();

    client.on('message', (channel, userstate, message, self) => {
        setMessages(messages => [...messages, { channel, userstate, message, self }]);
    });

    return <div class='chat-frame'>
        <For each={channels}>
            {(channel) => <ChatOutput channel={channel} messages={messages} />}
        </For>
    </div>;
};

export default Chat;