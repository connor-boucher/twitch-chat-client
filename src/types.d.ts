import { JSX } from 'solid-js';
import { ChatUserstate } from 'tmi.js';

interface Message {
    channel: string;
    userstate: ChatUserstate;
    message: string;
    self: boolean;
}

interface Tab {
    name: string;
    content: JSX.Element;
}