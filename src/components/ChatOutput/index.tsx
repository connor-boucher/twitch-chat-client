import { Component, createSignal, For, Setter, Show } from 'solid-js';
import { ChatUserstate, Client } from 'tmi.js';

import type { Message } from 'types';

interface ChatOutputProps {
    channel: string;
    client: Client;
}

const handleMessage = (setter: Setter<Message[]>) => (channel: string, userstate: ChatUserstate, message: string, self: boolean) => {
    setter((prev: Message[]) => [...prev, { channel, userstate, message, self }]);
};

const ChatOutput: Component<ChatOutputProps> = ({ channel, client }) => {
    const [messages, setMessages] = createSignal([] as Message[]);

    client.on('message', handleMessage(setMessages));

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