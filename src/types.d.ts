import { ChatUserstate } from 'tmi.js';

interface Message {
    channel: string;
    userstate: ChatUserstate;
    message: string;
    self: boolean;
}