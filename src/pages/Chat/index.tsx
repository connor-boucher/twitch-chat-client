import { useLocation } from 'solid-app-router';
import { Accessor, Component, createSignal, Setter } from 'solid-js';
import { compact } from 'lodash';
import { ChatUserstate, Client } from 'tmi.js';

import { ChatOutput, Tabs } from '@components/index';

import type { Message, Tab } from 'types';

const getChannels = (path: string) => compact(path.split('/'));

const handleMessage = (setter: Setter<Message[]>) => (channel: string, userstate: ChatUserstate, message: string, self: boolean) => {
    setter((prev: Message[]) => [...prev, { channel, userstate, message, self }]);
};

const createTab = (messages: Accessor<Message[]>) => (channel: string): Tab => ({ name: channel, content: <ChatOutput channel={channel} messages={messages} /> });

const Chat: Component = () => {
    const location = useLocation();
    const channels = getChannels(location.pathname);
    const [messages, setMessages] = createSignal([] as Message[]);
    
    const client = new Client({ channels });

    client.on('message', handleMessage(setMessages));
    client.connect();

    const tabs = channels.map(createTab(messages));

    return <div class='chat-frame'>
        <Tabs tabs={tabs} />
    </div>;
};

export default Chat;