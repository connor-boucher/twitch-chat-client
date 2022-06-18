import { useLocation } from 'solid-app-router';
import { Component } from 'solid-js';
import { compact } from 'lodash';
import { Client } from 'tmi.js';

import { ChatOutput, Tabs } from '@components/index';

import type { Tab } from 'types';

const getChannels = (path: string) => compact(path.split('/'));

const createTab = (client: Client) => (channel: string): Tab => ({ name: channel, content: <ChatOutput channel={channel} client={client} /> });

const Chat: Component = () => {
    const location = useLocation();
    const channels = getChannels(location.pathname);
    
    const client = new Client({ channels });
    client.connect();

    const tabs = channels.map(createTab(client));

    return <div class='chat-frame'>
        <Tabs tabs={tabs} />
    </div>;
};

export default Chat;