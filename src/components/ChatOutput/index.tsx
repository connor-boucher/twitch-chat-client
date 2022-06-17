import { Accessor, Component, For, Show } from 'solid-js';

import type { Message } from 'types';

interface ChatOutputProps {
    channel: string;
    messages: Accessor<Message[]>;
}

const ChatOutput: Component<ChatOutputProps> = ({ channel, messages }) => {
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