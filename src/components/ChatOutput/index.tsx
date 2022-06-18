import { takeRight } from 'lodash';
import { Component, createSignal, For, Setter } from 'solid-js';
import { ChatUserstate, Client } from 'tmi.js';

import type { Message } from 'types';

interface ChatOutputProps {
    channel: string;
}

const handleMessage = (setter: Setter<Message[]>, maxHist = 250) => (channel: string, userstate: ChatUserstate, message: string, self: boolean) => {
    setter((prev: Message[]) => [...takeRight(prev, maxHist - 1), { channel, userstate, message, self }]);
};

const ChatOutput: Component<ChatOutputProps> = ({ channel }) => {
    const [messages, setMessages] = createSignal([] as Message[]);

    const client = new Client({ channels: [channel] });
    client.on('message', handleMessage(setMessages));
    client.connect();

    return <div class='chat-output-frame'>
        <h1>Channel: {channel}</h1>
        
        <For each={messages()}>
            {(message) => <h3>{message.message}</h3>}
        </For>
    </div>;
};

export { ChatOutput };