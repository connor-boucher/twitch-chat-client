import { Component, createSignal, For, Show } from 'solid-js';
import { Client } from 'tmi.js';

import type { Message } from 'types';

interface ChatOutputProps {
    channel: string;
    client: Client;
}

const ChatOutput: Component<ChatOutputProps> = ({ channel, client }) => {
    const [messages, setMessages] = createSignal([] as Message[]);

    client.on('message', (channel, userstate, message, self) => {
        setMessages(messages => [...messages, { channel, userstate, message, self }]);
    });

    return <div class='chat-output-frame'>
        <h1>Channel: {channel}</h1>
        
        <For each={messages()}>
            {(message) =>
                <Show when={message.channel === channel}>
                    <h3>{message.message}</h3>
                </Show>
            }
        </For>
    </div>;
};

export { ChatOutput };