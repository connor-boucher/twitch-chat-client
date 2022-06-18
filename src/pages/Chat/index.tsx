import { useLocation } from 'solid-app-router';
import { Component } from 'solid-js';
import { compact } from 'lodash';

import { ChatOutput, Tabs } from '@components/index';

import type { Tab } from 'types';

const getChannels = (path: string) => compact(path.split('/'));

const createTab = (channel: string): Tab => ({ name: channel, content: <ChatOutput channel={channel} /> });

const Chat: Component = () => {
    const location = useLocation();
    const channels = getChannels(location.pathname);

    const tabs = channels.map(createTab);

    return <div class='chat-frame'>
        <Tabs tabs={tabs} />
    </div>;
};

export default Chat;