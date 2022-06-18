import { useLocation } from 'solid-app-router';
import { Component, createSignal } from 'solid-js';
import { compact } from 'lodash';
import { Client } from 'tmi.js';

import { ChatOutput } from '@components/ChatOutput';
import { Tabs } from '@components/Tabs';

import type { Message, Tab } from 'types';

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

    const tabs = channels.map(channel => (
        { name: channel, content: <ChatOutput channel={channel} messages={messages} /> }
    )) as Tab[];

    return <div class='chat-frame'>
        <Tabs tabs={tabs} />
    </div>;
};

export default Chat;